import axios from "axios";
import { BASE_URL } from "../constants/config";

export const getAllTaskList = async () =>
  await axios.get(`${BASE_URL}/api/task/`).then((res: any) => res.data);

export const addTask = async (data: any) =>
  await axios
    .post(`${BASE_URL}/api/task/add_task`, data)
    .then((res: any) => res.data);

export const deleteTask = async (task_id: number) =>
  await axios
    .delete(`${BASE_URL}/api/task/delete_task/${task_id}`)
    .then((res: any) => res.data);

export const updateTask = async (task_id: number, data: any) => {
  await axios
    .put(`${BASE_URL}/api/task/update_task/${task_id}`, data)
    .then((res: any) => res.data);
};

export const updateTaskStatus = async (taskStatus: boolean) => {
  await axios
    .get(`${BASE_URL}/api/task/task_status/${taskStatus}`)
    .then((res: any) => res.data);
};
