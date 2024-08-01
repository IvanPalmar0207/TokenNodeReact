import axios from "./axios";

export const getAllTask = () => axios.get('/task')

export const getOneTaskRequest = (id) => axios.get(`/task/${id}`)

export const createTaskRequest = (task) => axios.post('/task', task)

export const deleteTask = (id) => axios.delete(`/task/${id}`)

export const updateTaskRequest = (id, task) => axios.put(`/task/${id}`, task)