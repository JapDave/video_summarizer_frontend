import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/footer";
import ProfileSection from "../../components/profileSection/ProfileSection";

const Profile = () => {
  return (
    <React.Fragment>
      <Navbar />
      <ProfileSection />
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
