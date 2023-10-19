import instance from ".";
import { fetchToken } from "./fetchToken";

export const getNotesApi = async () => {
  try {
    const token = await fetchToken();
    const response = await instance.get("/notes", {
      headers: { Authorization: `Token ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createNoteApi = async (values) => {
  try {
    const token = await fetchToken();
    const response = await instance.post("/notes/create", values, {
      headers: { Authorization: `Token ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getNoteByIdApi = async (id) => {
  try {
    const token = await fetchToken();
    const response = await instance.get(`/notes/${id}`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const editNoteApi = async (id, values) => {
  try {
    const token = await fetchToken();
    const response = await instance.patch(`/notes/${id}`, values, {
      headers: { Authorization: `Token ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteNoteApi = async (id) => {
  try {
    const token = await fetchToken();
    const response = await instance.delete(`/notes/${id}`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fileGenerationApi = async (urlExtension, responseType) => {
  try {
    const token = await fetchToken();
    const response = await instance.get(`/notes/generate_${urlExtension}`, {
      headers: { Authorization: `Token ${token}` },
      responseType, // Set responseType based on the file type
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const publishApi = async () => {
  try {
    const token = await fetchToken();
    const response = await instance.post(
      "/notes/publish_pdf",
      {},
      {
        headers: { Authorization: `Token ${token}` },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
