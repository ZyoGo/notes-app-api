// User A
const createUserARequest = {
  url: 'http://localhost:5000/users',
  method: 'POST',
  header: {
    'Content-Type': 'applications/json',
  },
  body: {
    mode: 'raw',
    raw: JSON.stringify({
      username: 'user_a',
      password: 'secret',
      username: 'User A',
    }),
  },
};

pm.sendRequest(createUserARequest, (error, response) => {
  console.log(error ? error : response);

  // Setelah terdaftar, login dengan User A
  const loginUserRequest = {
    url: 'http://localhost:5000/authentications',
    method: 'POST',
    header: {
      'Content-Type': 'applications/json',
    },
    body: {
      mode: 'raw',
      raw: JSON.stringify({
        username: 'user_a',
        password: 'secret',
      }),
    },
  };

  pm.sendRequest(loginUserRequest, (error, response) => {
    // Masukkan access token user B ke environment variabel
    if (!error) {
      const {
        data: { accessToken },
      } = response.json();
      pm.environment.set('accessTokenUserA', accessToken);
    }
  });
});

// User B
const createUserBRequest = {
  url: 'http://localhost:5000/users',
  method: 'POST',
  header: {
    'Content-Type': 'applications/json',
  },
  body: {
    mode: 'raw',
    raw: JSON.stringify({
      username: 'user_b',
      password: 'secret',
      fullname: 'User B',
    }),
  },
};

pm.sendRequest(createUserBRequest, (error, response) => {
  console.log(error ? error : response);

  // Setelah terdaftar, login dengan User B
  const loginUserRequest = {
    url: 'http://localhost:5000/authentications',
    method: 'POST',
    header: {
      'Content-Type': 'applications/json',
    },
    body: {
      mode: 'raw',
      raw: JSON.stringify({
        username: 'user_b',
        password: 'secret',
      }),
    },
  };

  pm.sendRequest(loginUserRequest, (error, response) => {
    if (!error) {
      // Masukkan access token user B ke environment variabel
      const {
        data: { accessToken },
      } = response.json();
      pm.environment.set('accessTokenUserB', accessToken);
    }
  });
});
