import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { subscriber as authSubscriber } from '../../services/userService';

const Authenticator = WrappedComponent => {
  const [token, setToken] = useState(authSubscriber.value);

  useEffect(() => {
    authSubscriber.subscribe(value => setToken(value));
  }, []);

  const WithToken = props => {
    if (!token) return <Redirect to="/login" />;
    return <WrappedComponent {...props} />;
  };

  return WithToken;
};

export default Authenticator;
