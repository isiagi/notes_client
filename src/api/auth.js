import instance from ".";
import { fetchToken } from "./fetchToken";

export const authApi = async (route, values) => {
  try {
    const response = await instance.post(`${route}`, values);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (route, values) => {
  try {
    await instance.patch(`${route}`, values);
  } catch (error) {
    console.log(error);
  }
};

export const logoutApi = async (route) => {
  try {
    const token = await fetchToken();
    const res = await instance.get(`${route}`, {
      headers: { Authorization: `Token ${token}` },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
