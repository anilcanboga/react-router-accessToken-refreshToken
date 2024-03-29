import axios from "axios";
import moment from "moment";

const customIntance = axios.create({
  baseURL: "https://dummyjson.com",
});

// customIntance ile atılan isteklerin hemen öncesine girmek için request olan interceptors'e müdahele ediyoruz.
customIntance.interceptors.request.use(async (config) => {
  let expires = localStorage.getItem("expires");
  let token = localStorage.getItem("access_token");

  // Eğer şu anki tarihim expires değişkeni olan tarihten sonraysa, refresh token işlet, değilse config return ederek hayatına devam et.
  if (moment.duration(moment(expires).diff(moment())).asMinutes() < 3) {
    const response = await refreshToken(token);

    if (response) {
      config.headers.Authorization = `Bearer ${response}`;
      localStorage.setItem("access_token", response);
      localStorage.setItem("expires", moment().add(5, "minutes").toDate());
    } else {
      localStorage.clear();
      window.location.reload();
    }
  } else {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const refreshToken = async (token) => {
  return axios
    .post(
      "https://dummyjson.com/auth/refresh",
      {
        expiresInMins: 2,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      return res.data.token;
    })
    .catch((err) => {
      return null;
    });
};

export { customIntance };
