import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/footer';
import SubscriptionPlans from '../../components/subscription/SubscriptionPlans';
import { plansDummy } from '../../constants/plansDummy';
import { API_BASE_URL } from '../../utils/ENVImport';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserPlansList } from '../../redux/slices/adminSlice';
import Loader from '../../components/customLoader/Loader';

const Subscription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const usersPlansList = useSelector((state) => state.admin.usersPlansList);
  const [loading, setLoading] = useState(false);

  const getPlansHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/payments/plans`, {
        method: 'GET',
        headers: {
          Token: `${token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });
      const data = await response.json();
      dispatch(setUserPlansList(data));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      getPlansHandler();
    }
  }, [token, navigate]);
  const handleUpdate = () => {};

  return (
    <React.Fragment>
      <div className="flex flex-col min-h-screen">
        {loading && <Loader />}
        <div className="mb-[5%]">
          <Navbar />
        </div>
        <div
          className={`flex-1 flex mb-[5%] flex-wrap gap-x-2 gap-y-4 border-box justify-center items-center`}
        >
          {usersPlansList &&
            usersPlansList?.map((data, index) => {
              return (
                <SubscriptionPlans
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
