import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  // 1. call this func when the initial request fails or accessToken is expired, then it will refresh get a new token and we will retry the request
  const refresh = async () => {
    const response = await axios.get("/refresh", {
      // allow to sent cookie with the request
      // * this request going to to sent along our cookie that has the response token. it's a secure cookie that we never see inside of our javascript code, but axios can send it to backend endpoint that we need it to.
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
