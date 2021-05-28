import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function HomePage() {
  const { email } = useAuth();
  const historyHome = useHistory();
  useEffect(() => {
    if (email === null) {
      historyHome.push("/login");
    }
  }, [email]);

  return <h1 className="text-center text-yellow-50 text-xl">Hello!</h1>;
}

export default HomePage;
