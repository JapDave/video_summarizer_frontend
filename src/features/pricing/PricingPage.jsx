import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/footer';
import SubscriptionPlans from '../../components/subscription/SubscriptionPlans';
import { API_BASE_URL } from '../../utils/ENVImport';
import Loader from '../../components/customLoader/Loader';

const PricingPage = () => {
  const [loading, setLoading] = useState(false);
  const [planData, setPlanData] = useState(null);

  const getPlansHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/payments/plans`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      const data = await response.json();
      setPlanData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlansHandler();
  }, []);
  const handleUpdate = () => {};

  return (
    <React.Fragment>
      <div className="flex flex-col min-h-screen">
        {loading && <Loader />}
        <div className="flex justify-center items-center flex-col h-full mt-[5%]">
          <h1 className="header__title">Pricing</h1>
          <div
            className={`flex-1 flex mb-[5%] flex-wrap gap-x-2 gap-y-4 border-box justify-center items-center`}
          >
            {planData?.plans ? (
              planData.plans.map((data, index) => {
                return (
                  <SubscriptionPlans
                    onUpdate={handleUpdate}
                    getPlans={getPlansHandler}
                    key={data.id}
                    data={data}
                    index={index}
                    length={planData?.plans?.length}
                  />
                );
              })
            ) : (
              <p>No plan found</p>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PricingPage;
