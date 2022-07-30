import React from "react";

import Header from "components/Header";
import GoogleOauth from "containers/GoogleOauth";
import Footer from "components/Footer";

const LoginPage = () => {
  return (
    <div>
      <Header />
      <GoogleOauth />
      <Footer />
    </div>
  );
};

export default LoginPage;
