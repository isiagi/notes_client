import instance from ".";

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
