import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/footer";
import ContactUSForm from "../../components/contactUs/ContactUsForm";

const ContactUsPage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <ContactUSForm />
      <Footer />
    </React.Fragment>
  );
};

export default ContactUsPage;
