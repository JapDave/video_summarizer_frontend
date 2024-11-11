import React from "react";
import "./ProfileSection.scss";
import { UserLogo } from "../../assets/images/Images";

const ProfileSection = () => {
  return (
    <React.Fragment>
      <div className="profileCardContainer">
        <div className="profileCard">
          <img src={UserLogo} />
          <h3>John Nick</h3>
          <h4>johnnick@gmail.com</h4>
          <button>Limited</button>
          <p>Manage My Subscription</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileSection;
