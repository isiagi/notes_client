export async function fetchToken() {
  const token = localStorage.getItem("notesToken");
  return token ? token : false;
}

export const authTokenStatus = async () => {
  const token = await fetchToken();

  return token ? true : false;
};
