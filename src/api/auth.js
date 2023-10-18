import instance from ".";

const token = localStorage.getItem("notesToken");

export const authApi = async (route, values) => {
  try {
    const response = await instance.post(`${route}`, values);

    localStorage.setItem("notesToken", response.data.Token);
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
    const res = await instance.get(`${route}`, {
      headers: { Authorization: `Token ${token}` },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
