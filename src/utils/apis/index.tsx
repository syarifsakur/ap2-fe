import axios from "axios";
import type { Credit } from "../../types";
import type { Products } from "../..//types";

const API_JWT = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

//api unit
export const fetchUnit = async () => {
  return await API_JWT.get("/unit");
};
export const fetchUnitById = async (id: string) => {
  return await API_JWT.get(`/unit/${id}`);
};
export const createUnit = async (data: Products) => {
  return await API_JWT.post("/unit/create", data);
};
export const updateUnit = async (uuid: string, data: Products) => {
  return await API_JWT.patch(`/unit/update/${uuid}`, data);
};
export const deleteUnit = async (id: string) => {
  return await API_JWT.delete(`/unit/delete/${id}`)
};

// api credit
export const createCredit = async (data: Credit) => {
  return await API_JWT.post("/credit/create", data);
};
export const fetchCredit = async () => {
  return await API_JWT.get("/credit");
};
