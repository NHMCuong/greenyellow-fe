import axios from "axios";
import { BASE_URL } from "../constants/config";
import { Category } from "../type/category";

export const getCategory = async () =>
  await axios.get(`${BASE_URL}/api/category/`).then((res: any) => res.data);

export const addCategory = async (category: Category) =>
  await axios.post(`${BASE_URL}/api/category/add-category`, category);
