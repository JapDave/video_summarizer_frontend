import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Modal } from "antd";
import blackTickIcon from "../../assets/svg/black-tick-icon.svg";
import haveCouponImg from "../../assets/svg/haveCoupon.svg";

const SubscriptionPlans = ({ data, getPlans, onUpdate, index, length }) => {
  console.log("🚀 ~ data:", data);
  // *************************************************************
  // NOTE: Define Variables
  // *************************************************************
  const controller = new AbortController();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setIsCouponLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [btnText, setBtnText] = useState("Upgrade");
  const [hovered, setHovered] = useState(false);
  const [couponData, setCouponData] = useState(null);
  const [haveCoupon, setHaveCoupon] = useState(false);

  // *************************************************************
  // NOTE: API Configuration
  // *************************************************************

  // *************************************************************
  // NOTE: Helper Methods
  // *************************************************************
  const handleClick = async () => {
    // if (length - 1 === index && type === 'tally') {
    //   router.push('/contact');
    //   return;
    // }
    // if (
    //   data?.current_plan ||
    //   ((type === 'sam' || type === 'tally') &&
    //     btnText === 'Downgrade' &&
    //     !(data as Plan).is_stripe_plan)
    // ) {
    //   cancelSubscriptionHandler();
    //   return;
    // }
    // if (
    //   (type === 'sam' && !currentSamPlan) ||
    //   (type === 'tally' && !currentTallyPlan) ||
    //   (type === 'sam' && !currentSamPlan.is_stripe_plan) ||
    //   (type === 'tally' && !currentTallyPlan.is_stripe_plan)
    // ) {
    //   setShowModal(true);
    // } else {
    //   console.log('🚀 ~ handleClick ~ data?.price_id:', data?.price_id);
    //   await upgradePlan(data?.price_id);
    // }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const buttonText = useCallback(() => {
    // if (length - 1 === index && type === 'tally') {
    //   setBtnText('Quote');
    //   return;
    // }
    // if (
    //   (type === 'sam' && !currentSamPlan) ||
    //   (type === 'tally' && !currentTallyPlan)
    // ) {
    //   setBtnText(
    //     length - 1 === index && type === 'tally' ? 'Quote' : 'Select Plan'
    //   );
    // } else if (data?.current_plan) {
    //   setBtnText(
    //     (type === 'sam' && (data as Plan).is_stripe_plan) ||
    //       (type === 'tally' && (data as TallyPlan).is_stripe_plan)
    //       ? 'Current Plan'
    //       : 'Current Plan'
    //   );
    // } else if (
    //   data?.amount >
    //   (type === 'sam' ? currentSamPlan.amount : currentTallyPlan.amount)
    // ) {
    //   setBtnText('Upgrade');
    // } else if (
    //   data?.amount <=
    //   (type === 'sam' ? currentSamPlan.amount : currentTallyPlan.amount)
    // ) {
    //   setBtnText('Downgrade');
    // }
    //   }, [currentSamPlan, currentTallyPlan, data, index, length, type]);
  }, []);

  const couponInputChange = (e) => {
    setCoupon(e.target.value);
  };

  // coupon retrieve
  const verifyCouponHandler = async () => {
    // try {
    //   setIsCouponLoading(true);
    //   const response = await retrieveCoupon(
    //     {
    //       coupon_id: coupon,
    //       price_id: data?.price_id,
    //       product: type.toUpperCase(),
    //     },
    //     api_url,
    //     router,
    //     dispatch
    //   );
    //   const res = response?.json();
    //   if (response?.ok) {
    //     const response = await res;
    //     if ('is_valid' in response && response.is_valid) {
    //       setCouponData(response);
    //     } else {
    //       toast.error('Coupon expired or is invalid');
    //     }
    //   } else {
    //     setCouponData(null);
    //     const responseData: FailedResponse = await res;
    //     toast.error(responseData.detail);
    //   }
    //   setIsCouponLoading(false);
    // } catch (error) {
    //   setIsCouponLoading(false);
    //   toast.error('Error in retrieve coupon');
    // }
  };

  const cancelSubscriptionHandler = async () => {
    // try {
    //   setIsLoading(true);
    //   let response;
    //   if (type === 'sam') {
    //     response = await cancelSamSubscription(null, api_url, router, dispatch);
    //   } else {
    //     response = await cancelTallySubscription(
    //       null,
    //       api_url,
    //       router,
    //       dispatch
    //     );
    //   }
    //   if (response?.ok) {
    //     if (type === 'sam') {
    //       dispatch(setSamBillingHistory(null));
    //     } else {
    //       dispatch(setTallyBillingHistory(null));
    //     }
    //     getPlans(controller.signal);
    //     onUpdate();
    //     setIsLoading(false);
    //     setShowModal(false);
    //   } else {
    //     setIsLoading(false);
    //     const res = response?.json();
    //     const responseData: FailedResponse = await res;
    //     toast.error(responseData.detail);
    //   }
    // } catch (error) {
    //   toast.error('Error in cancel subscription');
    //   setIsLoading(false);
    // }
  };

  //   const createSubscriptionHandler = async (payloadData: {
  //     payment_method: string;
  //   }) => {
  //     try {
  //       setIsLoading(true);
  //       let response;
  //       if (type === 'sam') {
  //         response = await createSamSubscription(
  //           {
  //             price_id: data?.price_id,
  //             payment_method: payloadData.payment_method,
  //             coupon_id: coupon,
  //           },
  //           api_url,
  //           router,
  //           dispatch
  //         );
  //       } else {
  //         response = await createTallySubscription(
  //           {
  //             price_id: data?.price_id,
  //             payment_method: payloadData.payment_method,
  //             coupon_id: coupon,
  //           },
  //           api_url,
  //           router,
  //           dispatch
  //         );
  //       }

  //       if (response?.ok) {
  //         setShowModal(false);
  //         getPlans(controller.signal);
  //         onUpdate();
  //         toast.success('Subscription created successfully');
  //         if (type === 'sam') {
  //           dispatch(setProductType({ productType: 1 }));
  //         } else if (type === 'tally') {
  //           dispatch(setProductType({ productType: 2 }));
  //         }
  //         setIsLoading(false);
  //         router.push('/dashboard');
  //       } else {
  //         const res = response?.json();
  //         const responseData: FailedResponse = await res;
  //         toast.error(responseData.detail);
  //       }
  //     } catch (error) {
  //       toast.error('Error in create subscription');
  //       setIsLoading(false);
  //     }
  //   };

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
  //         toast.success('Subscription updated successfully');
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
  //   useEffect(() => {
  //     buttonText();
  //   }, [buttonText, type]);

  // *************************************************************
  // NOTE: Render Method
  // *************************************************************
  return (
    <div
      className={`bg-[#FFFFFF] w-96 ${
        hovered ? "gradient-border" : ""
      } smallPc:px-4 smallPc:py-4 border border-[#ECECEC] flex gap-y-7 flex-col justify-start rounded-md px-4 py-4 text-[#000]`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
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
          {`${data.name} features:`}
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
              Watermarking: {data.watermarking ? "Enabled" : "Disabled"}
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
          className={`${
            data.current_plan
              ? "text-[#ffffff] bg-gradient-to-b from-[#1104F3] to-[#0EDEF9] opacity-75"
              : hovered
              ? "text-[#ffffff] bg-[#051b8d]"
              : "text-[#ffffff] bg-[#051b8d]"
          } smallPc:h-10 rounded-md h-10 font-400 text-[16px] font-poppins flex justify-center items-center`}
          onClick={handleClick}
        >
          <span>Select Plan</span>
        </button>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
