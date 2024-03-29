import React, { useContext, useEffect, useState } from "react";
import Context from "../context/auth";
import { customIntance } from "../services/http";

const Category = () => {
  const { logout } = useContext(Context);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    await customIntance
      .get("/auth/me")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container d-flex flex-column justify-content-center">
      {JSON.stringify(userData)}
      <button className="btn btn-danger" onClick={logout}>
        Çıkış
      </button>
    </div>
  );
};

export default Category;
