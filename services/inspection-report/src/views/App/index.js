import { useAuth0 } from '@auth0/auth0-react';
import monk from '@monkvision/corejs';

import useLoading from 'hooks/useLoading';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Auth from 'views/Auth';

import Home from 'views/Home';
import Inspections from 'views/Inspections';
import Loading from 'views/Loading';
import { ResponsiveAppBar } from '../../components';

export const ROUTE_PATHS = {
  home: '/',
  inspections: '/inspections',
};

export default function App() {
  const { search } = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  const { isAuthenticated, isLoading: authenticating, getAccessTokenSilently } = useAuth0();
  const [isGettingToken, setIsGettingToken] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  const loading = useLoading(authenticating && isGettingToken);

  const handleToken = useCallback(async (token) => {
    setIsGettingToken(true);

    try {
      if (token !== undefined) {
        monk.config.accessToken = token;
      } else {
        monk.config.accessToken = await getAccessTokenSilently();
      }

      setHasToken(true);
      setIsGettingToken(false);
    } catch (e) {
      setIsGettingToken(false);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    console.log(queryParams);
    handleToken(queryParams.get('access_token'));
  }, [handleToken, queryParams]);

  useEffect(() => {
    if (isAuthenticated) { handleToken(); }
  }, [isAuthenticated, handleToken]);

  if (loading) {
    return <Loading />;
  }

  if (hasToken) {
    return (
      <div>
        <ResponsiveAppBar />
        <Routes>
          <Route exact path={ROUTE_PATHS.home} element={<Home />} />
          <Route exact path={ROUTE_PATHS.inspections} element={<Inspections />} />
        </Routes>
      </div>
    );
  }

  return <Auth />;
}