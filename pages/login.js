import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import LoginButton from '../components/loginButton/button';
import login from '../src/api/user';

const Container = styled.div`
  position: relative;
  height: 620px;
  width: 400px;
  margin: 16px auto;
  border-radius: 4px;
  background-color: #17223b;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  img {
    margin-left: -14%;
  }
`;

const Login = () => {
  const router = useRouter();

  const userLogin = ({ email, password }) => {
    if (!email || !password) return null;
    login({ email, password })
      .then(({ token }) => {
        tokenUpdateService.set(token);
        router.push('/');
      })
      .catch(error => {
        if (error.error) {
        }
      });
  };

  return (
    <Container>
      <img src="/android-chrome-512x512.png" alt="" />
      <LoginButton onSubmit={userLogin} />
    </Container>
  );
};

export default Login;
