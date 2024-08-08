import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';
import { errorStatusEnum } from '../helpers/enums/errorStatusEnum';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Atualize para usar import.meta.env em vez de process.env
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de requisição
http.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers
      ? (config.headers.Authorization = `Bearer ${token}`)
      : (config.headers =
          config.headers || `Bearer ${token}` || 'application/json');
  }
  return config;
});

// Interceptor de resposta
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    let errStatus: number | null = null;

    if (error.response) {
      errStatus = error.response.status;
    }

    if (errStatus) {
      if (errStatus === errorStatusEnum.UNAUTHORIZED) {
        window.localStorage.clear();
        window.location.href = '/auth';
        toast.error('Não autorizado! Faça login para continuar');
      }

      if (errStatus === errorStatusEnum.INTERNAL_SERVER_ERROR) {
        toast.error('Um erro aconteceu, peça ajuda para o suporte.');
      }
    }

    return Promise.reject(error);
  }
);

export default http;
