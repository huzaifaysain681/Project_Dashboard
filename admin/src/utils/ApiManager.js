import axios from "axios";
import { BASE_URL as baseURL } from "./config";

const headers = () => {
  var user = localStorage.getItem("user");
  user = JSON.parse(user);
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + user.token,
  };
};
const jwt = "";
export const loginFunction = async (body) => {
  try {
    var response = await axios.post(baseURL + "user/login", body);
    response = response.data;
    return response;
  } catch (error) {
    if (error?.response?.status == 401 || error?.response?.status == 403)
      return { message: "Invalid email or password!" };
    return error?.response?.data;
  }
};
export const getUserAsync = async (body) => {
  try {
    var response = await axios.get(baseURL + "user/detail", {
      headers: headers(),
    });
    response = response.data;
    return response;
  } catch (error) {
    if (error?.response?.status == 401 || error?.response?.status == 403) {
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
      return { message: "You are not authorize as Admin!" };
    }
    return error?.response?.data;
  }
};
export const postApi = async (url, body) => {
  try {
    var res = await axios.post(baseURL + url, body, { headers: headers() });
    return res.data;
  } catch (error) {
    var e =
      error?.response?.data?.message || error?.response?.data?.error || null;
    return { success: false, message: e };
  }
};
export const putApi = async (url, body) => {
  try {
    var res = await axios.put(baseURL + url, body, { headers: headers() });
    return res.data;
  } catch (error) {
    var e =
      error?.response?.data?.message || error?.response?.data?.error || null;
    return { success: false, message: e };
  }
};
export const patchApi = async (url, body) => {
  try {
    var res = await axios.patch(baseURL + url, body, { headers: headers() });
    return res.data;
  } catch (error) {
    var e =
      error?.response?.data?.message || error?.response?.data?.error || null;
    return { success: false, message: e };
  }
};
export const getApi = async (url, params) => {
  try {
    var res = await axios.get(baseURL + url, {
      params: params,
      headers: headers(),
    });
    return res.data;
  } catch (error) {
    var e =
      error?.response?.data?.message || error?.response?.data?.error || null;
    return { success: false, message: e };
  }
};
