import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = "154269596390-b571vefv26ea6afao9ltbkrk7jlsafs5.apps.googleusercontent.com";


function Login() {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    // Send a POST request to your server with the ID token
    fetch('http://localhost:8000/api/v1/social/login/google-oauth2/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: res.tokenId }),
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from your backend
      console.log(data);
    });
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        responseType="id_token"
      />
    </div>
  );
}

export default Login;
