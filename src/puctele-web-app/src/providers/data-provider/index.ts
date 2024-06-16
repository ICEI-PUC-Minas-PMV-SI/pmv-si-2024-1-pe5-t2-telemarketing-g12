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
const API_URL = 'http://localhost:4000';

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination }) => {
    const { current, pageSize } = pagination ?? {};
    const response = await axiosInstance.get(`${API_URL}/${resource}/`,{
      params: { page: current, limit: pageSize },
    });
   
    const { rows, count } = response.data.data;

    return {
      data: rows,
      total: count
    };
  },

  getOne: async ({ resource, id }) => {
    const response = await axiosInstance.get(`${API_URL}/${resource}/${id}`);
    const { data } = response.data;

    return {
      data,
    };
  },

  getMany: async ({ resource, ids }) => {
    const response = await axiosInstance.get(`${API_URL}/${resource}/?id=${JSON.stringify(ids)}`);
    const { rows, count } = response.data.data;

    return {
      data: rows,
    };
  },

  create: async ({ resource, variables }) => {
    let response;
    if(resource == "user"){
      response = await axiosInstance.post(`${API_URL}/signup`, variables);
    }else{
      response = await axiosInstance.post(`${API_URL}/${resource}`, variables);
    }
    const { data } = response?.data;

    return {
      data,
    };
  },
  update: async ({ resource, id, variables }) => {
    const response = await axiosInstance.patch(`${API_URL}/${resource}/${id}`, variables);
    const { data } = response.data;

    return {
      data,
    };
  },
  deleteOne: async ({ resource, id, variables }) => {
    const response = await axiosInstance.delete(`${API_URL}/${resource}/${id}`, { data: variables });
    const { data } = response.data;

    return {
      data,
    };
  },

  getApiUrl: () => API_URL,
};
