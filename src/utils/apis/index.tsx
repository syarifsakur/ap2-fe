import axios, { AxiosError } from "axios";
import type { AuthProps, Credit } from "../../types";
import type { Products } from "../..//types";
import { getItem, removeItem, setItem } from "../storages";
import { jwtDecode } from "jwt-decode";
import type { Service } from "../../types/service";
import type { Part } from "../../types/part";

const API_JWT = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

API_JWT.interceptors.request.use(
  async (req) => {
    const profile = getItem("profile");
    if (profile?.token) {
      const currentDate = new Date();
      const isExpired =
        profile?.expire && profile.expire * 1000 < currentDate.getTime();

      if (isExpired) {
        try {
          const response = await axios.get(
            "http://localhost:3000/auth/refresh-token"
          );

          const newToken = response.data.token;
          const decoded = jwtDecode(newToken);
          setItem({
            key: "profile",
            value: {
              token: newToken,
              data: response?.data?.dataForClient,
              expire: decoded?.exp,
            },
          });
          req.headers.Authorization = `Bearer ${response?.data?.token}`;
        } catch (error) {
          const err = error as AxiosError;
          if (err?.response?.status == 401) {
            removeItem("profile");
            window.location.href = "/auth/login";
          } else {
            console.log(err);
          }
        }
      } else {
        req.headers.Authorization = `Bearer ${profile?.token}`;
      }
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api auth
export const login = (data: AuthProps) => API_JWT.post("/auth/login", data);
export const logout = () => API_JWT.delete("/auth/logout");

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
  return await API_JWT.delete(`/unit/delete/${id}`);
};

// api credit
export const createCredit = async (data: Credit) => {
  return await API_JWT.post("/credit/create", data);
};
export const fetchCredit = async () => {
  return await API_JWT.get("/credit");
};
export const deleteCredit = async (id: string) => {
  return await API_JWT.delete(`/credit/delete/${id}`);
};

// api Part
export const createPart = async (data: Part) => {
  return await API_JWT.post("/part/create");
};
export const fetchPart = async (page = 1, limit = 5) => {
  return await API_JWT.get(`/part?page=${page}&limit=${limit}`);
};

// api service
export const createService = async (data: Service) => {
  return await API_JWT.post("/service/create");
};
