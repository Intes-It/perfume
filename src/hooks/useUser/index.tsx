import { api } from '@utils/apiRoute';
import { GET, POST } from '@utils/fetch';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useSWR, { mutate } from 'swr';
const useUser = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const user = useSWR('use-user', getProfile, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: true,
  });

  //fetch data
  async function getProfile() {
    const res = await GET(api.getProfile);
    console.log(res);
    return res.data;
  }

  async function login(data: any) {
    const res = await POST(api.login, data);
    return res;
  }

  // check auth
  const authenticate = (data: any) => {
    setIsAuthenticating(true);
    login(data)
      .then(() => mutate('use-user'))
      .catch(() => console.log('error'))
      .finally(() => setIsAuthenticating(false));
  };

  return {
    user: user.data,
    isAuthenticated: Boolean(user.data),
    authenticate,
  };
};

export default useUser;
