import axios from "./axios";

export const getAllTask = () => axios.get('/task')

export const getOneTask = (id) => axios.get(`/task/${id}`)

export const createTaskRequest = (task) => axios.post('/task', task)

export const deleteTask = (id) => axios.delete(`/task/${id}`)

export const updateTask = (task) => axios.put(`/task/${task._id}`, task)