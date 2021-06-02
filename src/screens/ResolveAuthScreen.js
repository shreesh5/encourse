// eslint-disable-next-line no-unused-vars
import React, {useEffect} from 'react';
import {useAuthContext} from '../context/AuthContext';

// Screen for resolving authentication
// by trying to sign in locally.
const ResolveAuthScreen = () => {
  const {tryLocalSignin} = useAuthContext();

  useEffect(() => {
    tryLocalSignin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default ResolveAuthScreen;
