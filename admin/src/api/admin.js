import axios from 'axios';

const API = axios.create({ baseURL: '/api/admin' });

export const loginAdmin = (data) => API.post('/login', data);
export const fetchUsers = () => API.get('/users');
export const banUser = (userId) => API.post(`/users/${userId}/ban`);
// Add more API functions as needed

export default API; 