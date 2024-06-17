'use client';
import { DataProvider } from '@refinedev/core';
import Cookies from 'js-cookie';
import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('token');
    if (token && config?.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const apiUrl = process.env.API_URL || 'https://pmv-si-2024-1-pe5-t2-telemarketing-g12.onrender.com';

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination }) => {
    const { current, pageSize } = pagination ?? {};
    const response = await axiosInstance.get(`${apiUrl}/${resource}/`, {
      params: { page: current, limit: pageSize },
    });

    const { rows, count } = response.data.data;

    return {
      data: rows,
      total: count,
    };
  },

  getOne: async ({ resource, id }) => {
    const response = await axiosInstance.get(`${apiUrl}/${resource}/${id}`);
    const { data } = response.data;

    return {
      data,
    };
  },

  getMany: async ({ resource, ids }) => {
    const response = await axiosInstance.get(`${apiUrl}/${resource}/?id=${JSON.stringify(ids)}`);
    const { rows, count } = response.data.data;

    return {
      data: rows,
    };
  },

  create: async ({ resource, variables }) => {
    let response;
    if (resource == 'user') {
      response = await axiosInstance.post(`${apiUrl}/signup`, variables);
    } else {
      response = await axiosInstance.post(`${apiUrl}/${resource}`, variables);
    }
    const { data } = response?.data;

    return {
      data,
    };
  },
  update: async ({ resource, id, variables }) => {
    const response = await axiosInstance.patch(`${apiUrl}/${resource}/${id}`, variables);
    const { data } = response.data;

    return {
      data,
    };
  },
  deleteOne: async ({ resource, id, variables }) => {
    const response = await axiosInstance.delete(`${apiUrl}/${resource}/${id}`, { data: variables });
    const { data } = response.data;

    return {
      data,
    };
  },

  getApiUrl: () => apiUrl,
};
