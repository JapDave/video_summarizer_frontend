import React from "react";
import Navbar from "../../components/navbar/Navbar";
import SearchSection from "../../components/searchSection/SearchSection";
import Footer from "../../components/footer/footer";

const HomePage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <SearchSection />
      <Footer />
    </React.Fragment>
  );
};

export default HomePage;
