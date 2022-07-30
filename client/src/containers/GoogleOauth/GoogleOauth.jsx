import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const GoogleOauth = () => {
  const navigate = useNavigate();
  const onClickGoogleLogin = () => {
    let path = "localhost:8080/api/auth/google/callback";
    navigate(path);
  };
  return (
    <div>
      <button onClick={onClickGoogleLogin}>123</button>
    </div>
  );
};

export default GoogleOauth;
