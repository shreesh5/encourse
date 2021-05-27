import React, {useEffect, useContext} from 'react';
import {useAuthContext} from '../context/AuthContext';

const ResolveAuthScreen = () => {
  const {tryLocalSignin} = useAuthContext();

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return null;
};

export default ResolveAuthScreen;
