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
      className={`bg-white-800 w-96  ${
        hovered && "gradient-border"
      } smallPc:px-4 smallPc:py-4  border border-[#ECECEC] flex gap-y-7  flex-col justify-start rounded-md px-4 py-4 text-[#000]`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      <div className="flex flex-col items-start gap-y-2 gap-x-2 smallPc:gap-y-1">
        {/* {index === 0 ? (
          <StandardPlanIcon color={hovered ? '#313131' : '#F4F4FC'} />
        ) : index === 1 ? (
          <PremiumPlanIcon color={hovered ? '#313131' : '#F4F4FC'} />
        ) : (
          <PlatinumPlanIcon color={hovered ? '#313131' : '#F4F4FC'} />
        )} */}
        <label className={`text-[24px] font-800 font-poppins `}>
          {data?.name}
        </label>
        <label className={`text-xxs font-400 font-poppins `}>
          {data?.sub_title}
        </label>
      </div>

      <label className={`font-500 flex items-center gap-x-2 `}>
        <div className="flex items-center text-[24.7px] font-poppins gap-x-2 w-full">
          <span className="font-700 smallPc:text-[16px]">${data?.amount}</span>
          <p className="font-400 smallPc:text-[16px]">/ month</p>
        </div>
      </label>
      <div>
        <label className="text-[12px] font-poppins font-900">
          {`${data?.name} features:`}
        </label>
        <ul
          className={`smallPc:gap-y-2 mt-3 font-400 flex flex-col gap-y-4
             text-[#6E6E78]`}
        >
          {data &&
            data?.description &&
            Object.values(data?.description).map((item, index) => {
              return (
                item.trim() && (
                  <li
                    key={index}
                    className="flex items-center justify-start gap-x-2"
                  >
                    <img
                      src={blackTickIcon}
                      alt="right-icon"
                      className="h-4 w-4"
                    />
                    <span className="smallPc:text-xs text-sm">{item}</span>
                  </li>
                )
              );
            })}
        </ul>
      </div>

      <div className="flex flex-1 gap-y-3 justify-end flex-col w-full">
        {!haveCoupon && (
          <div
            onClick={() => {
              setHaveCoupon(true);
            }}
          >
            <img
              src={haveCouponImg}
              alt="coupon-img"
              width={100}
              height={100}
            />
          </div>
        )}
        {haveCoupon && (
          <div className="flex flex-col items-start">
            <input
              type="text"
              name="couponInput"
              onChange={couponInputChange}
              value={coupon}
              placeholder="Enter Coupon"
              className={` border-2 w-full h-10 rounded-lg pl-2 px-3 border-gray-600 placeholder:text-gray-500`}
            />
            <button
              onClick={() => {
                if (coupon.trim()) {
                  verifyCouponHandler();
                } else {
                  setHaveCoupon(false);
                }
              }}
              className={`text-[#1090F7] mt-[3px] font-400 text-xxxs font-poppins cursor-pointer underline ${
                coupon.trim() === "" && "pointer-events-none"
              }`}
            >
              Apply Coupon
            </button>
          </div>
        )}

        <button
          disabled={isLoading}
          className={`${
            data?.current_plan
              ? hovered
                ? "text-white-800 opacity-75 bg-gradient-to-b from-[#1104F3] to-[#0EDEF9]"
                : "text-white-800 opacity-75 bg-gradient-to-b from-[#1104F3] to-[#0EDEF9] "
              : length - 1 === index
              ? "bg-transparent border border-[#1090F7]"
              : hovered
              ? "text-white-800 bg-[#1090F7]"
              : "text-white-800 bg-[#1090F7]"
          }  smallPc:h-10 rounded-md text-[10px]  h-10 font-400 font-poppins  flex justify-center items-center`}
          onClick={() => {
            handleClick();
          }}
        >
          <span className="mr-1">{btnText}</span>
          {isLoading && <Spinner />}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          visible={showModal}
          onCancel={closeModal}
          okButtonProps={{ style: { backgroundColor: "white" } }}
          footer={null}
          destroyOnClose
          width={656}
          className="font-poppins bg-[#fafafc]"
          style={{ backgroundColor: "#fafafc" }}
          centered
        >
          {/* <div style={{ backgroundColor: "#fafafc" }}>
            <PaymentForm
              isLoading={isLoading}
              setShowModal={setShowModal}
              onPaymentSubmit={createSubscriptionHandler}
              flag={2}
            />
          </div> */}
        </Modal>
      )}
    </div>
  );
};

export default SubscriptionPlans;
