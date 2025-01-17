import { useError } from '@monkvision/toolkit';
import React from 'react';
import { Platform } from 'react-native';
import { Button } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';

import monk from '@monkvision/corejs';
import discoveries from 'config/discoveries';
import useAuth from 'hooks/useAuth';
import Sentry from '../../../config/sentry';

const useProxy = Platform.select({
  native: true,
  default: false,
});

const returnTo = makeRedirectUri({
  useProxy,
});

export default function SignOut(props) {
  const params = `?client_id=${monk.config.authConfig.clientId}&returnTo=${returnTo}`;
  const { signOut } = useAuth();
  const { errorHandler, Constants } = useError(Sentry);

  const handleOpenWithWebBrowser = () => {
    WebBrowser.openAuthSessionAsync(`${discoveries.endSessionEndpoint}${params}`).catch((err) => errorHandler(err, Constants.type.APP, { returnTo }));
    signOut();
  };

  return (
    <Button onPress={handleOpenWithWebBrowser} {...props}>
      Sign out
    </Button>
  );
}
