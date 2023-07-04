import React from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../features/userSlice";

function Settings() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  // console.log("Valor do usuário:", user);

  return (
    <Layout user={user} className="bg-neutral-100">
     
      <div>{/* <span>{user}</span> */}</div>
    </Layout>
  );
}

export default Settings;
