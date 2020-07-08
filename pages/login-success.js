import React, { useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';

const RedirectText = styled.div`
  color: #ffffff;
  font-size: 16px;
  padding: 24px;
  margin: 0 auto;
  width: fit-content;
`;

const LoginSuccess = ({ t, r }) => {
  const cookies = new Cookies();
  const router = useRouter();

  useEffect(() => {
    if (t) {
      cookies.set('token', t, {
        path: '/',
        expires: new Date(Date.now() + 7776e6),
        secure: false,
        httpOnly: false,
        sameSite: 'none',
      });
    }

    if (r) {
      router.push(r);
    } else {
      router.push('/');
    }
  }, [t, r]);

  return (
    <>
      <Head>
        <script
          crossorigin
          src="https://unpkg.com/universal-cookie@3/umd/universalCookie.min.js"
        ></script>
      </Head>
      <RedirectText>redirecting soon...</RedirectText>
    </>
  );
};

LoginSuccess.getInitialProps = async ({ query: { t, r } }) => {
  return { t, r };
};

export default LoginSuccess;
