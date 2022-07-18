import React from "react";

import Header from "components/Header";
import GoogleOauth from "containers/GoogleOauth";
import Footer from "components/Footer";
import image from "assets/images/logo.png";

const LoginPage = () => {
  return (
    <div>
      <Header imageUrl={image} />
      <GoogleOauth />
      <Footer />
    </div>
  );
};

export default LoginPage;
