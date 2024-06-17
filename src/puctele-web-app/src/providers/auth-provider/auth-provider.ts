'use client';

import type { AuthProvider } from '@refinedev/core';
import Cookies from 'js-cookie';
import axios from 'axios';
import 'dotenv/config'

const apiUrl = process.env.API_URL;

export const authProvider : AuthProvider = {
  login: async ({ email, username, password, remember }) => {
    const response = await axios
      .post(`${apiUrl}/login`, {
        email,
        password,
      })
      .finally();

    if (response.data.status) {
      Cookies.set('token', response.data.data.token, {
        expires: 5,
        path: '/',
      });
      return {
        success: true,
        redirectTo: '/',
      };
    } else {
      return {
        success: false,
        error: {
          name: 'LoginError',
          message: 'Invalid username or password',
        },
      };
    }
  },
  logout: async () => {
    Cookies.remove('token', { path: '/' });
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  check: async () => {
    const token = Cookies.get('token');
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: '/login',
    };
  },
  getPermissions: async () => {
    const token = Cookies.get('token');
    if (token) {
      const parsedUser = JSON.parse(token);
      return parsedUser.roles;
    }
    return null;
  },
  getIdentity: async () => {
    const token = Cookies.get('token');
    if (token) {
      const parsedUser = JSON.parse(token);
      return parsedUser;
    }
    return null;
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
};
