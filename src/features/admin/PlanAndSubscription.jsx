import React, { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Button, Modal, Select } from 'antd';
import PlanAndSubscriptionTable from '../../components/admin/PlanAndSubscriptionTable';
import AddPlanForm from '../../components/admin/AddPlanForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPlansList } from '../../redux/slices/adminSlice';
import Loader from '../../components/customLoader/Loader';
import { API_BASE_URL } from '../../utils/ENVImport';

const PlanAndSubscription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const plansList = useSelector((state) => state.admin.plansList);
  const [modalOpen, setModalOpen] = useState(false);
  const [warningModal, setWaringModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activePlansCount, setActivePlansCount] = useState(0);

  const getPlansHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/users/get-stripe-plans`,
        {
          method: 'GET',
          headers: {
            Token: `${token}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      const data = await response.json();
      console.log('🚀 ~ getPlansHandler ~ data:', data);
      dispatch(setPlansList(data));
      const activePlans = data.filter((plan) => plan.is_active).length;
      setActivePlansCount(activePlans);
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

  const numberOfActivePlans = plansList?.length;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-2 items-center">
          <Button
            data-cy="add-plan"
            // disabled={numberOfActivePlans >= 3}
            onClick={() => {
              if (activePlansCount >= 3) {
                setWaringModal(true);
              } else {
                setModalOpen(true);
              }
            }}
            className={`rounded-lg h-12 w-15 bg-blue-600 text-white`}
          >
            Add Plan
          </Button>
        </div>
      </div>
      {modalOpen && (
        <Modal
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          okButtonProps={{ style: { backgroundColor: '#4285F4' } }}
          footer={null}
          destroyOnClose
          width={656}
          className="font-poppins bg-[#fafafc] mt-10 mb-4 rounded-xl"
          style={{ backgroundColor: '#fafafc' }}
          centered
        >
          <AddPlanForm
            setShowModal={setModalOpen}
            getPlansHandler={getPlansHandler}
            // getStripePlansHandler={getStripePlansHandler}
          />
        </Modal>
      )}
      {warningModal && (
        <Modal
          open={warningModal}
          onCancel={() => setWaringModal(false)}
          okButtonProps={{ style: { backgroundColor: '#4285F4' } }}
          footer={null}
          destroyOnClose
          width={656}
          className="font-poppins bg-[#fafafc] mt-10 mb-4 rounded-xl"
          style={{ backgroundColor: '#fafafc' }}
          centered
        >
          <h1 className="text-[20px] text-red-600">
            Please inactive oneoff plan to add new one.
          </h1>
        </Modal>
      )}
      <PlanAndSubscriptionTable
        getStripePlansHandler={() => {}}
        data={plansList}
        getPlansHandler={getPlansHandler}
      />
    </div>
  );
};

export default PlanAndSubscription;
