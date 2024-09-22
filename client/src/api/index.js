import axios from 'axios';
import queryString from 'query-string';

const axiosInstance = axios.create({ baseURL: 'http://localhost:5001/api' });

export const getPetTypes = () => axiosInstance.get('/petTypes');

export const createPet = data => axiosInstance.post('/pets', data);

export const getPets = filter =>
  axiosInstance.get(`/pets?${queryString.stringify(filter)}`);

export const getPetById = id => axiosInstance.get(`/pets/${id}`);

export const updatePetById = (id, data) =>
  axiosInstance.patch(`/pets/${id}`, data);

export const deletePetById = id => axiosInstance.delete(`/pets/${id}`);
