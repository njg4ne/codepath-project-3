import API from "../../services/API";

const auth = async (
  creds,
  service,
  onError = undefined,
  setUser = undefined
) => {
  const { data, error } = await service(creds);
  if (error) {
    if (onError) {
      onError(error);
    }
  }
  if (data?.user && data?.token) {
    const user = data.user;
    if (setUser) {
      setUser(user);
    }
    API.setToken(data.token);
  }
};

export default auth;
