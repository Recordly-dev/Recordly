import React, { useEffect, useState } from "react";
import axios from "axios";

const GoogleOauth = () => {
  const onClickGoogleLogin = () => {
    axios.get("http://localhost:8080/api/auth/google/callback");
  };
  return (
    <div>
      <a href="http://localhost:8080/api/auth/google">
        <button onClick={onClickGoogleLogin}>123</button>
      </a>
    </div>
  );
};

export default GoogleOauth;
