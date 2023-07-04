import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../features/userSlice";




const Logout = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();




  useEffect(() => {
    const fetchData = async () => {
      try {
       const data = dispatch(fetchPosts());
      console.log(data)
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };
  
    fetchData();
  }, []);

  console.log("Valor do usuário:", user);

    return (
      <div>
            <Layout user={user}/>
            


            </div>
    );
  };
export default Logout;

