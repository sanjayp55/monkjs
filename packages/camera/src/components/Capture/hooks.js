import monk from '@monkvision/corejs';
import { useError } from '@monkvision/toolkit';
import axios from 'axios';
import { Buffer } from 'buffer';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

import { compressAccurately } from 'image-conversion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import Actions from '../../actions';
import Constants from '../../const';
import log from '../../utils/log';

const handleCompress = async (picture, enableCompression, Span) => {
  if (Platform.OS !== 'web') { return undefined; }

  let compressionTracing;
  if (Span) { compressionTracing = new Span('image-compression', 'func'); }
  const res = await axios.get(picture.uri, { responseType: 'blob' });

  // no need to compress images under 3mb
  if (res.data.size / 1024 < 3000 || !enableCompression) {
    URL.revokeObjectURL(picture.uri);
    log([`An image has been taken, with size: ${(res.data.size / 1024 / 1024).toFixed(2)}Mo, and resolution: ${picture.width}x${picture.height}`]);
    return res.data;
  }

  const compressed = await compressAccurately(res.data, 3000);
  URL.revokeObjectURL(picture.uri);
  log([`An image has been taken, with size: ${(res.data.size / 1024 / 1024).toFixed(2)}Mo, optimized to ${(compressed.size / 1024 / 1024).toFixed(2)}Mo, and resolution: ${picture.width}x${picture.height}`]);
  compressionTracing?.finish();
  return compressed || res.data;
};

const COVERAGE_360_WHITELIST = [
  // T-ROCK
  'GHbWVnMB', 'GvCtVnoD', 'IVcF1dOP', 'LE9h1xh0',
  'PLh198NC', 'UHZkpCuK', 'XyeyZlaU', 'vLcBGkeh',
  'Pzgw0WGe', 'EqLDVYj3', 'jqJOb6Ov', 'j3E2UHFc',
  'AoO-nOoM', 'B5s1CWT-',
  // AUDI A7
  'vxRr9chD', // Front Bumper Side Left
  'cDe2q69X', // Front Fender Left
  'R_f4g8MN', // Doors Left
  'vedHBC2n', // Front Roof Left
  'McR3TJK0', // Rear Lateral Left
  '7bTC-nGS', // Rear Fender Left
  'hhCBI9oZ', // Rear
  'e_QIW30o', // Rear Fender Right
  'fDo5M0Fp', // Rear Lateral Right
  'fDKWkHHp', // Doors Right
  '5CFsFvj7', // Front Fender Right
  'g30kyiVH', // Front Bumper Side Right
  'I0cOpT1e', // Front
];

/**
 * @param current
 * @return {string}
 */
export function useTitle({ current }) {
  return useMemo(() => {
    if (!current.metadata) { return ''; }
    const { label, id } = current.metadata;

    if (Constants.PRODUCTION) { return label; }

    return `${label} - ${id}`;
  }, [current]);
}

/**
 * @param camera
 * @param isFocused
 * @return {function({ quality: number=, base64: boolean=, exif: boolean= }): Promise<picture>}
 */
export function useTakePictureAsync({ camera, isFocused }) {
  useEffect(() => {
    if (isFocused) {
      camera?.current?.resumePreview();
    } else {
      camera?.current?.pausePreview();
    }

    return () => camera?.current?.pausePreview();
  }, [camera.current, isFocused]);

  return useCallback(async (options = {
    quality: 1,
    base64: true,
    exif: true,
    skipProcessing: true,
  }) => {
    const funcName = Platform.OS === 'web' ? 'takePicture' : 'takePictureAsync';
    const takePicture = camera?.current[funcName];
    const takePictureOptions = Platform.OS === 'web' ? undefined : options;

    if (takePictureOptions) {
      return takePicture(takePictureOptions);
    }

    return takePicture();
  }, [camera, isFocused]);
}

/**
 * @param current
 * @param settings
 * @param sights
 * @param uploads
 * @param Sentry
 * @return {(function(pictureOrBlob:*, isBlob:boolean=): Promise<void>)|void}
 */
export function useSetPictureAsync({ current, sights, uploads, Sentry }) {
  const { errorHandler, Constants: ErrorConstants } = useError(Sentry);

  return useCallback(async (picture) => {
    try {
      const uri = picture.localUri || picture.uri;

      const actions = [{ resize: { width: 133 } }];
      const saveFormat = Platform.OS === 'web' ? SaveFormat.WEBP : SaveFormat.JPEG;
      const saveOptions = { compress: 1, format: saveFormat };
      const imageResult = await manipulateAsync(uri, actions, saveOptions);

      const payload = {
        id: current.id,
        picture: { uri: imageResult.uri },
      };

      sights.dispatch({ type: Actions.sights.SET_PICTURE, payload });
      uploads.dispatch({ type: Actions.uploads.UPDATE_UPLOAD, payload });
    } catch (err) {
      errorHandler(err, ErrorConstants.type.CAMERA, { picture });
      log([`Error in \`<Capture />\` \`setPictureAsync()\`: ${err}`], 'error');
    }
  }, [current.id, sights, uploads]);
}

/**
 * @param sights
 * @return {((function(): void))[]}
 */
export function useNavigationBetweenSights({ sights }) {
  const goPrevSight = useCallback(() => {
    sights.dispatch({ type: Actions.sights.PREVIOUS_SIGHT });
  }, [sights]);

  const goNextSight = useCallback(() => {
    sights.dispatch({ type: Actions.sights.NEXT_SIGHT });
  }, [sights]);

  return [goPrevSight, goNextSight];
}

/**
 * @return {function(*=): Promise<*>}
 */
export function useCreateDamageDetectionAsync() {
  return useCallback(async (
    tasks = { damage_detection: { status: 'NOT_STARTED' } },
  ) => {
    const result = await monk.entity.inspection.upsertOne({ data: { tasks } });
    return result.data;
  }, []);
}

/**
 * @param inspectionId
 * @param sights
 * @param uploads
 * @param task
 * @param mapTasksToSights
 * @param onFinish
 * @param onPictureUploaded
 * @param enableCompression
 * @param Sentry
 * @return {(function({ inspectionId, sights, uploads }): Promise<result|error>)|*}
 */
export function useStartUploadAsync({
  inspectionId,
  sights,
  uploads,
  task,
  mapTasksToSights = [],
  onFinish = () => {},
  onPictureUploaded = () => {},
  enableCompression,
  Sentry,
}) {
  const [queue, setQueue] = useState([]);
  const { Constants: SentryConstants, errorHandler, Span } = useError(Sentry);
  let isRunning = false;

  const addElement = useCallback((element) => setQueue((prevState) => [...prevState, element]), []);

  const runQuery = useCallback(async () => {
    const { ids } = sights.state;
    const { dispatch } = uploads;

    if (!isRunning && queue.length > 0) {
      isRunning = true;

      const queryParams = queue.shift();
      if (queryParams) {
        const { id, picture, multiPartKeys, json, file } = queryParams;
        let uploadTracing;
        if (Sentry) { uploadTracing = new Span('upload-tracing', SentryConstants.operation.HTTP); }

        try {
          const data = new FormData();
          data.append(multiPartKeys.json, json);

          data.append(multiPartKeys.image, file);

          const result = await monk.entity.image.addOne(inspectionId, data);
          onPictureUploaded({ result, picture, inspectionId });

          // call onFinish callback when capturing the last picture
          if (ids[ids.length - 1] === id) {
            onFinish();
            log([`Capture tour has been finished`]);
          }

          dispatch({
            type: Actions.uploads.UPDATE_UPLOAD,
            payload: { pictureId: result.id, id, status: 'fulfilled', error: null },
          });
        } catch (err) {
          errorHandler(err, SentryConstants.type.UPLOAD, { json, file });
          dispatch({
            type: Actions.uploads.UPDATE_UPLOAD,
            increment: true,
            payload: { id, status: 'rejected', error: err },
          });
        } finally {
          uploadTracing?.finish();
        }
      }
      isRunning = false;
    }
  }, [isRunning, queue, sights.state, uploads]);

  useEffect(() => {
    if (!isRunning && queue.length > 0) { (async () => { await runQuery(); })(); }
  }, [isRunning, queue]);

  return useCallback(async (picture, currentSight) => {
    const { dispatch } = uploads;
    if (!inspectionId) {
      throw Error(`Please provide a valid "inspectionId". Got ${inspectionId}.`);
    }

    // for some cases, we can pass the sight we want and override the current one
    const current = currentSight || sights.state.current;
    const { id, label } = currentSight?.metadata || current.metadata;

    const currentItem = mapTasksToSights.find((item) => item.id === id);
    const tasksToMap = currentItem ? (currentItem?.tasks || [currentItem?.task]) : [task];

    try {
      dispatch({
        type: Actions.uploads.UPDATE_UPLOAD,
        increment: true,
        payload: { id, status: 'pending', label },
      });

      const fileType = Platform.OS === 'web' ? 'webp' : 'jpg';
      const filename = `${id}-${inspectionId}.${fileType}`;
      const multiPartKeys = { image: 'image', json: 'json', filename, type: `image/${fileType}` };

      const json = JSON.stringify({
        acquisition: {
          strategy: 'upload_multipart_form_keys',
          file_key: multiPartKeys.image,
        },
        compliances: {
          image_quality_assessment: {},
          coverage_360: COVERAGE_360_WHITELIST.includes(id) ? {
            sight_id: id,
          } : undefined,
        },
        tasks: tasksToMap,
        additional_data: {
          ...current.metadata,
          overlay: undefined,
          createdAt: new Date(),
        },
      });

      let fileBits;

      if (Platform.OS === 'web') {
        const file = await handleCompress(picture, enableCompression, Sentry ? Span : null);

        fileBits = [file];
      } else {
        const buffer = Buffer.from(picture.uri, 'base64');
        fileBits = new Blob([buffer], { type: 'png' });
      }

      const file = await new File(
        fileBits,
        multiPartKeys.filename,
        { type: multiPartKeys.type },
      );

      addElement({ multiPartKeys, json, file, id, picture });
    } catch (err) {
      dispatch({
        type: Actions.uploads.UPDATE_UPLOAD,
        increment: true,
        payload: { id, status: 'rejected', error: err },
      });

      log([`Error in \`<Capture />\` \`startUploadAsync()\`: ${err}`], 'error');

      throw err;
    }
  }, [uploads, inspectionId, sights.state, mapTasksToSights, task, onFinish]);
}

/**
 * @param compliance
 * @param inspectionId
 * @param sightId
 * @param Sentry
 * @return {(function(pictureId: string, customSightId: string): Promise<result|error>)|*}
 */
export function useCheckComplianceAsync({
  compliance, inspectionId, sightId: currentSighId, Sentry,
}) {
  const { Span, Constants: SentryConstants } = useError(Sentry);

  return useCallback(async (imageId, customSightId) => {
    const { dispatch } = compliance;
    const sightId = customSightId || currentSighId;

    if (!imageId) {
      throw Error(`Please provide a valid "pictureId". Got ${imageId}.`);
    }

    let checkComplianceHttpTracing;
    if (Sentry) {
      checkComplianceHttpTracing = new Span('get-one-inspection', SentryConstants.operation.HTTP);
    }

    try {
      dispatch({
        type: Actions.compliance.UPDATE_COMPLIANCE,
        increment: true,
        payload: { id: sightId, status: 'pending', imageId },
      });

      const result = await monk.entity.image.getOne(inspectionId, imageId);

      const carCov = result.axiosResponse.data.compliances.coverage_360;
      const iqa = result.axiosResponse.data.compliances.image_quality_assessment;

      if ((!carCov || carCov.status === 'DONE') && (iqa.status === 'DONE')) {
        dispatch({
          type: Actions.compliance.UPDATE_COMPLIANCE,
          payload: { id: sightId, status: 'fulfilled', result: result.axiosResponse, imageId },
        });
      }

      return result;
    } catch (err) {
      dispatch({
        type: Actions.compliance.UPDATE_COMPLIANCE,
        increment: true,
        payload: { id: sightId, status: 'rejected', error: err, result: null, imageId },
      });

      log([`Error in \`<Capture />\` \`checkComplianceAsync()\`: ${err}`], 'error');
      return undefined;
    } finally {
      checkComplianceHttpTracing?.finish();
    }
  }, [compliance, inspectionId, currentSighId]);
}
