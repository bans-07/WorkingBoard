import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data;
};

export { login };


// import { UserLogin } from "../interfaces/UserLogin";

// const login = async (userInfo: UserLogin) => {
//   // TODO: make a POST request to the login route
// }



// export { login };
