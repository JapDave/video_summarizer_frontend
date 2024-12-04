import { useCallback, useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import ToastContainer from '../customToaster/ToastContainer';
import blackTickIcon from '../../assets/svg/black-tick-icon.svg';
import PaymentForm from '../admin/PaymentForm';
import { useNavigate } from 'react-router-dom';
import {
  cancelSubscription,
  createSubscription,
  upgradeSubscription,
} from '../../api/auth';

const SubscriptionPlans = ({ data, getPlans, onUpdate, index, length }) => {
  console.log('🚀 ~ data:', data);
  // *************************************************************
  // NOTE: Define Variables
  // *************************************************************
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [btnText, setBtnText] = useState('Select Plan');
  const [hovered, setHovered] = useState(false);
  const toastRef = useRef();

  const currentPlan = useSelector((state) => state.admin.currentPlan);

  // *************************************************************
  // NOTE: API Configuration
  // *************************************************************

  // *************************************************************
  // NOTE: Helper Methods
  // *************************************************************
  const handleClick = async () => {
    if (length - 1 === index) {
      navigate('/contactus');
      return;
    }
    if (
      data?.current_plan ||
      (btnText === 'Downgrade' && !data.is_stripe_plan)
    ) {
      cancelSubscriptionHandler();
      return;
    }
    if (currentPlan || !currentPlan?.is_stripe_plan) {
      setShowModal(true);
    } else {
      console.log('🚀 ~ handleClick ~ data?.price_id:', data?.price_id);
      await upgradePlan(data?.price_id);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const buttonText = useCallback(() => {
    if (length - 1 === index) {
      setBtnText('Quote');
      return;
    }
    if (currentPlan) {
      setBtnText(length - 1 === index ? 'Quote' : 'Select Plan');
    } else if (data?.current_plan) {
      setBtnText(data.is_stripe_plan ? 'Current Plan' : 'Current Plan');
    } else if (data?.amount > currentPlan?.amount) {
      setBtnText('Upgrade');
    } else if (data?.amount <= currentPlan?.amount) {
      setBtnText('Downgrade');
    }
  }, [currentPlan, data, index, length]);

  // const cancelSubscriptionHandler = async () => {
  //   try {
  //     setIsLoading(true);
  //     let response;
  //     if (type === 'sam') {
  //       response = await cancelSamSubscription(null, api_url, router, dispatch);
  //     } else {
  //       response = await cancelTallySubscription(
  //         null,
  //         api_url,
  //         router,
  //         dispatch
  //       );
  //     }
  //     if (response?.ok) {
  //       if (type === 'sam') {
  //         dispatch(setSamBillingHistory(null));
  //       } else {
  //         dispatch(setTallyBillingHistory(null));
  //       }
  //       getPlans(controller.signal);
  //       onUpdate();
  //       setIsLoading(false);
  //       setShowModal(false);
  //     } else {
  //       setIsLoading(false);
  //       const res = response?.json();
  //       const responseData: FailedResponse = await res;
  //       toast.error(responseData.detail);
  //     }
  //   } catch (error) {
  //     toast.error('Error in cancel subscription');
  //     setIsLoading(false);
  //   }
  // };

  // const createSubscriptionHandler = async (payloadData: {
  //   payment_method: string;
  // }) => {
  //   try {
  //     setIsLoading(true);
  //     let response;
  //     if (type === 'sam') {
  //       response = await createSamSubscription(
  //         {
  //           price_id: data?.price_id,
  //           payment_method: payloadData.payment_method,
  //           coupon_id: coupon,
  //         },
  //         api_url,
  //         router,
  //         dispatch
  //       );
  //     } else {
  //       response = await createTallySubscription(
  //         {
  //           price_id: data?.price_id,
  //           payment_method: payloadData.payment_method,
  //           coupon_id: coupon,
  //         },
  //         api_url,
  //         router,
  //         dispatch
  //       );
  //     }

  //     if (response?.ok) {
  //       setShowModal(false);
  //       getPlans(controller.signal);
  //       onUpdate();
  //       toastRef.current.addToast('Subscription created successfully');
  //       if (type === 'sam') {
  //         dispatch(setProductType({ productType: 1 }));
  //       } else if (type === 'tally') {
  //         dispatch(setProductType({ productType: 2 }));
  //       }
  //       setIsLoading(false);
  //       router.push('/dashboard');
  //     } else {
  //       const res = response?.json();
  //       const responseData: FailedResponse = await res;
  //       toast.error(responseData.detail);
  //     }
  //   } catch (error) {
  //     toast.error('Error in create subscription');
  //     setIsLoading(false);
  //   }
  // };

  const createSubscriptionHandler = async (payloadData) => {
    console.log('🚀 ~ createSubscriptionHandler ~ payloadData:', payloadData);
    try {
      setIsLoading(true);

      const response = await createSubscription({
        price_id: data?.price_id,
        payment_method: payloadData?.id,
      });

      if (response) {
        setShowModal(false);
        getPlans();
        onUpdate();
        toastRef.current.addToast('Subscription created successfully');
      } else {
        toastRef.current.addToast('Failed to create subscription');
      }
    } catch (error) {
      console.error('Error in create subscription:', error);
      toastRef.current.addToast('Error in create subscription');
    } finally {
      setIsLoading(false);
    }
  };

  const upgradePlan = async (priceId) => {
    try {
      setIsLoading(true);

      const payload = {
        price_id: priceId,
      };

      const response = await upgradeSubscription(JSON.stringify(payload));
      if (response) {
        const responseData = await response.json();
        getPlans();
        onUpdate();
        toastRef.current.addToast('Subscription updated successfully');
      } else {
        const errorData = await response.json();
        toastRef.current.addToast('Error updating subscription');
      }
    } catch (error) {
      console.error('Error in subscription update:', error);
      toastRef.current.addToast('Error in subscription update');
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSubscriptionHandler = async () => {
    try {
      setIsLoading(true);
      const response = await cancelSubscription();
      if (response) {
        getPlans();
        onUpdate();
        toastRef.current.addToast('Subscription canceled successfully');
        setShowModal(false);
      } else {
        toastRef.current.addToast('Failed to cancel subscription');
      }
    } catch (error) {
      console.error('Error in cancel subscription:', error);
      toastRef.current.addToast('Error in cancel subscription');
    } finally {
      setIsLoading(false);
    }
  };

  //   const upgradePlan = async (priceId: string) => {
  //     try {
  //       let response;
  //       setIsLoading(true);
  //       if (type === 'sam') {
  //         response = await updateSamSubscription(
  //           { price_id: priceId },
  //           api_url,
  //           router,
  //           dispatch
  //         );
  //       } else {
  //         response = await updateTallySubscription(
  //           { price_id: priceId },
  //           api_url,
  //           router,
  //           dispatch
  //         );
  //       }

  //       if (response && response.ok) {
  //         getPlans(controller.signal);
  //         onUpdate();
  //         toastRef.current.addToast('Subscription updated successfully');
  //       } else {
  //         const res = response?.json();
  //         const responseData: FailedResponse = await res;
  //         toast.error(responseData.detail);
  //       }
  //     } catch (error) {
  //       toast.error('Error in subscription update');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  // *************************************************************
  // NOTE: Life Cycle Hooks
  // *************************************************************
  useEffect(() => {
    buttonText();
  }, [buttonText]);

  // *************************************************************
  // NOTE: Render Method
  // *************************************************************
  return (
    <div
      className={`bg-[#FFFFFF] w-96 ${
        hovered ? 'gradient-border' : ''
      } smallPc:px-4 smallPc:py-4 border border-[#ECECEC] flex gap-y-7 flex-col justify-start rounded-md px-4 py-4 text-[#000]`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      <ToastContainer ref={toastRef} />
      <div className="flex flex-col items-start gap-y-2 gap-x-2 smallPc:gap-y-1">
        <label className="text-[24px] font-800 font-poppins">{data.name}</label>
        <label className="text-xxs font-400 font-poppins capitalize">
          <b>Priority</b>: {data.priority}
        </label>
      </div>

      <label className="font-500 flex items-center gap-x-2">
        <div className="flex items-center text-[24.7px] font-poppins gap-x-2 w-full">
          <span className="font-700 smallPc:text-[16px]">${data.amount}</span>
          <p className="font-400 smallPc:text-[16px]">/ {data.interval}</p>
        </div>
      </label>

      <div>
        <label className="text-[12px] font-poppins font-900">
          {`${data.name} Features:`}
        </label>
        <ul className="smallPc:gap-y-2 mt-3 font-400 flex flex-col gap-y-4 text-[#6E6E78]">
          <li className="flex items-center justify-start gap-x-2">
            <img src={blackTickIcon} alt="tick-icon" className="h-4 w-4" />
            <span className="smallPc:text-xs text-sm">
              Video Length: {data.video_length} minutes
            </span>
          </li>
          <li className="flex items-center justify-start gap-x-2">
            <img src={blackTickIcon} alt="tick-icon" className="h-4 w-4" />
            <span className="smallPc:text-xs text-sm">
              Face Detection Level: {data.face_detection}
            </span>
          </li>
          <li className="flex items-center justify-start gap-x-2">
            <img src={blackTickIcon} alt="tick-icon" className="h-4 w-4" />
            <span className="smallPc:text-xs text-sm">
              Transitions: {data.transitions} sec
            </span>
          </li>
          <li className="flex items-center justify-start gap-x-2">
            <img src={blackTickIcon} alt="tick-icon" className="h-4 w-4" />
            <span className="smallPc:text-xs text-sm">
              Watermarking: {data.watermarking ? 'Enabled' : 'Disabled'}
            </span>
          </li>
          <li className="flex items-center justify-start gap-x-2">
            <img src={blackTickIcon} alt="tick-icon" className="h-4 w-4" />
            <span className="smallPc:text-xs text-sm">
              Chunk Size: {data.chunk_size} sec
            </span>
          </li>
          <li className="flex items-center justify-start gap-x-2">
            <img src={blackTickIcon} alt="tick-icon" className="h-4 w-4" />
            <span className="smallPc:text-xs text-sm">
              AI-Model: {data.ai_model}
            </span>
          </li>
          <li className="flex items-center justify-start gap-x-2">
            <img src={blackTickIcon} alt="tick-icon" className="h-4 w-4" />
            <span className="smallPc:text-xs text-sm">
              Output Resolution: {data.output_resolution}
            </span>
          </li>
          <li className="flex items-center justify-start gap-x-2">
            <img src={blackTickIcon} alt="tick-icon" className="h-4 w-4" />
            <span className="smallPc:text-xs text-sm">
              Video Summarization Level: {data.video_summarization}
            </span>
          </li>
          <li className="flex items-center justify-start gap-x-2">
            <img src={blackTickIcon} alt="tick-icon" className="h-4 w-4" />
            <span className="smallPc:text-xs text-sm">
              File Retention Policy: {data.storage_space} Days
            </span>
          </li>
          <li className="flex items-center justify-start gap-x-2">
            <img src={blackTickIcon} alt="tick-icon" className="h-4 w-4" />
            <span className="smallPc:text-xs text-sm">
              Storage Space: {data.storage_space} GB
            </span>
          </li>
          <li className="flex items-center justify-start gap-x-2">
            <img src={blackTickIcon} alt="tick-icon" className="h-4 w-4" />
            <span className="smallPc:text-xs text-sm">
              Notifications: {data.notification_system}
            </span>
          </li>
        </ul>
      </div>

      <div className="flex flex-1 gap-y-3 justify-end flex-col w-full">
        <button
          disabled={isLoading || (data.amount === 0 && btnText !== 'Downgrade')}
          className={`${
            data.current_plan
              ? hovered
                ? 'text-white-800 opacity-75 bg-gradient-to-b from-[#1104F3] to-[#0EDEF9]'
                : 'text-white-800 opacity-75 bg-gradient-to-b from-[#1104F3] to-[#0EDEF9] '
              : length - 1 === index
              ? 'bg-transparent border border-[#1090F7]'
              : hovered
              ? 'text-white-800 bg-[#1090F7]'
              : 'text-white-800 bg-[#1090F7]'
          }  smallPc:h-10 rounded-md text-[10px]  h-10 font-400 font-poppins  flex justify-center items-center`}
          onClick={handleClick}
        >
          <span className="mr-1">
            {isLoading && currentPlan ? 'Processing...' : btnText}
          </span>
          {/* {isLoading && currentPlan && <Spinner />} */}
        </button>
      </div>
      {showModal && (
        <Modal
          visible={showModal}
          onCancel={closeModal}
          okButtonProps={{ style: { backgroundColor: 'white' } }}
          footer={null}
          destroyOnClose
          width={656}
          className="font-poppins bg-[#fafafc] rounded-md"
          centered
        >
          <div>
            <PaymentForm onPaymentSubmit={createSubscriptionHandler} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SubscriptionPlans;
