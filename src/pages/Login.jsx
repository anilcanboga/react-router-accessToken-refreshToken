import React, { useContext, useState } from "react";
import Context from "../context/auth";
import { Navigate } from "react-router-dom";

function Login() {
  const [loginPayload, setLoginPayload] = useState({
    username: "kminchelle",
    password: "0lelplR",
  });
  const [loading, setLoading] = useState(false);

  const { login, user } = useContext(Context);

  const _login = async () => {
    setLoading(true);
    await login(loginPayload);
    setLoading(false);
  };

  return user ? (
    <Navigate to="/category" />
  ) : (
    <div className="container d-flex flex-column gap-3 mt-5">
      <input
        placeholder="username"
        type="text"
        value={loginPayload.username}
        onChange={(event) =>
          setLoginPayload({ ...loginPayload, username: event.target.value })
        }
      />
      <input
        placeholder="password"
        type="password"
        value={loginPayload.password}
        onChange={(event) =>
          setLoginPayload({ ...loginPayload, password: event.target.value })
        }
      />
      <button
        className="btn btn-primary"
        disabled={loading}
        onClick={() => {
          _login();
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
