import React, { useContext } from "react";
import Context from "../context/auth";

const Home = () => {
  const { user } = useContext(Context);

  console.log({ user });

  return <div>Home</div>;
};

export default Home;
