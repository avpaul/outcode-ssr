import React from 'react';
import styled from 'styled-components';
import LoginButton from '../components/loginButton/button';
import login from '../src/api/user';
// import { tokenUpdateService } from '../src/services/userService';

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
    width: 150%;
    height: 100%;
    margin-left: -25%;
  }
`;

const Login = ({ history }) => {
  const userLogin = ({ email, password }) => {
    if (!email || !password) return null;
    login({ email, password })
      .then(({ token }) => {
        tokenUpdateService.set(token);
        history.push('/');
      })
      .catch(error => {
        if (error.error) {
        }
      });
  };

  return (
    <Container>
      <img
        src="https://image.freepik.com/free-vector/programmers-concept-with-flat-design_23-2147841208.jpg"
        alt=""
      />

      <LoginButton onSubmit={userLogin} />
    </Container>
  );
};

export default Login;
