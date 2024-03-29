import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Context = createContext();

export const ContextProvider = (props) => {
  const [user, setUser] = useState(() => {
    if (localStorage.getItem("user")) {
      try {
        return JSON.parse(localStorage.getItem("user"));
      } catch (error) {
        return null;
      }
    }
    return null;
  });

  const navigate = useNavigate();

  const login = async (payload) => {
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        ...payload,
        expiresInMins: 5,
      });

      let data = res.data;

      localStorage.setItem(
        "user",
        JSON.stringify({ ...data, expiresIn: moment().add(5, "minutes") })
      );

      localStorage.setItem("access_token", data.token);
      localStorage.setItem("expires", moment().add(5, "minutes").toDate());

      setUser(data);

      navigate("/category");
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <Context.Provider value={{ user, logout, login }}>
      {props.children}
    </Context.Provider>
  );
};

export default Context;
