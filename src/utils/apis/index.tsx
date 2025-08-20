import axios, { AxiosError } from "axios";
import type { AuthProps, Credit } from "../../types";
import type { Products } from "../..//types";
import { getItem, removeItem, setItem } from "../storages";
import { jwtDecode } from "jwt-decode";

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
            "http://localhost:5001/auth/refresh-token"
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
