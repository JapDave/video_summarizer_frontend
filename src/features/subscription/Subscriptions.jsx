import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/footer";
import PlansCard from "../../components/subscription/SubscriptionPlans";
import { plansDummy } from "../../constants/plansDummy";

const Subscription = () => {
  const getPlansHandler = () => {};
  const handleUpdate = () => {};

  return (
    <React.Fragment>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div
          className={`flex-1 flex flex-wrap gap-x-2 gap-y-4 border-box justify-center items-center`}
        >
          {plansDummy &&
            plansDummy.map((data, index) => {
              return (
                <PlansCard
                  onUpdate={handleUpdate}
                  getPlans={getPlansHandler}
                  key={data.id}
                  data={data}
                  index={index}
                  length={plansDummy?.length}
                />
              );
            })}
        </div>
        <div className="footer-div">
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Subscription;
