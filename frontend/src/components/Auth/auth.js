import API from "services/API";

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
    // console.log(data.token);
    API.setToken(data.token);
    localStorage.setItem("life-tracker-jwt", data.token);
  }
};

export default auth;
