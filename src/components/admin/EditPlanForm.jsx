import React, { useEffect, useRef, useState } from 'react';
import { Input, Checkbox, Select, Switch } from 'antd';
import { authAPI } from '../../api';
import ToastContainer from '../customToaster/ToastContainer';
import { useForm } from 'react-hook-form';
import { editPlan } from '../../api/auth';
import Loader from '../customLoader/Loader';

const { Option } = Select;

const EditPlanForm = ({ setShowEditModal, planData, getPlansHandler }) => {
  console.log('🚀 ~ EditPlanForm ~ planData:', planData);
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: planData?.name,
    video_length: planData?.video_length,
    length_limited: planData?.length_limited || false,
    summarizer_limited: planData?.summarizer_limited || false,
    face_detection: planData?.face_detection,
    transitions: planData?.transitions,
    watermarking: planData?.watermarking,
    chunk_size: planData?.chunk_size,
    ai_model: planData?.ai_model,
    output_resolutions: planData?.output_resolutions,
    notification_type: planData?.notification_type,
    video_summarizer: planData?.video_summarizer || 0,
    priority: planData?.priority,
    file_retention: planData?.file_retention,
    storage_limited: planData?.storage_limited || false,
    storage_space: planData?.storage_space,
    sub_title: planData?.sub_title,
    is_active: planData?.is_active,
    price_id: planData?.price_id,
    is_stripe_plan: planData?.is_stripe_plan,
  });
  const [planResponse, setPlanResponse] = useState(null);
  console.log('🚀 ~ EditPlanForm ~ planResponse:', planResponse);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (planData) {
      setFormData(planData);
    }
  }, [planData]);

  const editPlanHandler = async () => {
    setIsLoading(true);
    try {
      const response = await editPlan(formData, planData?.id);
      if (response) {
        toastRef.current.addToast('Plan updated successfully!', 3000);
        setShowEditModal(false);
        setIsLoading(false);
        setPlanResponse(response);
        if (getPlansHandler) {
          await getPlansHandler();
        }
      }
    } catch (error) {
      console.error('Plan update failed:', error);
      toastRef.current.addToast('Error in plan update.', 3000);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-[16px] px-[13px] max-w-[656px]">
      <ToastContainer ref={toastRef} />
      {isLoading && <Loader />}
      <form
        onSubmit={handleSubmit(editPlanHandler)}
        role="form"
        className="flex flex-col gap-y-4 desktop:gap-y-2"
      >
        <label
          className="text-[24px] font-[400] desktop:text-xl"
          style={{ lineHeight: '32.4px' }}
        >
          Edit Plan
        </label>

        {/* Plan Title Select */}
        <div className="flex flex-col gap-y-2 w-full">
          <label className="font-poppins font-[700] text-[#313131] text-base">
            Plan For
          </label>
          <Select
            value={formData?.name || 'freePlans'}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                name: value,
              }))
            }
            className="w-full"
          >
            <Option value="freePlans">Free Plans</Option>
            <Option value="proPlans">Pro Plans</Option>
            <Option value="pro+Plans">Pro+ Plans</Option>
          </Select>
        </div>

        {/* Is Active */}
        <div className="w-full flex flex-col gap-y-2">
          <label className="font-poppins font-[700] text-[#313131] text-base">
            Active Status
          </label>
          <Switch
            style={{ width: '10%' }}
            checked={formData.is_active}
            onChange={(checked) =>
              setFormData((prev) => ({
                ...prev,
                is_active: checked,
              }))
            }
          />
        </div>

        {/* Price */}
        {/* <div className="flex flex-col w-full gap-x-2">
          <div className="flex flex-col gap-y-2 w-full">
            <label className="font-poppins font-[700] text-[#313131] text-base">
              Price
            </label>
            <Input
              type="number"
              min={0}
              value={formData?.amount}
              className="placeholder:text-[#aab7c4] font-poppins border-[#E6E6E6] border-1 h-[50px] pl-6 bg-transparent"
              placeholder="Enter Plan Price"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  amount: +e.target.value,
                }))
              }
            />
          </div>
        </div> */}
        {/* Video Length and Face Detection */}
        <div className="flex w-full gap-x-2">
          <div className="flex flex-col gap-y-2 w-full">
            <label className="font-poppins font-[700] text-[#313131] text-base">
              Video Length (in Minutes)
            </label>
            <div className="mt-2 w-full">
              <Checkbox
                checked={formData?.length_limited}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    length_limited: e.target.checked,
                  }))
                }
              >
                Limited Length
              </Checkbox>
            </div>
            <Input
              type="number"
              min={0}
              value={formData?.video_length}
              disabled={!formData?.length_limited}
              className="placeholder:text-[#aab7c4] font-poppins border-[#E6E6E6] border-1 h-[50px] pl-6 bg-transparent"
              placeholder="Enter Video Length"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  video_length: +e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="flex w-full gap-x-2">
          <div className="flex flex-col gap-y-2 w-full">
            <label className="font-poppins font-[700] text-[#313131] text-base">
              Face Detection (3-7)
            </label>
            <Input
              type="number"
              min={3}
              max={7}
              value={formData?.face_detection}
              className="placeholder:text-[#aab7c4] font-poppins border-[#E6E6E6] border-1 h-[50px] pl-6 bg-transparent"
              placeholder="Enter Face Detection Level"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  face_detection: +e.target.value,
                }))
              }
            />
          </div>
        </div>

        {/* Transitions */}
        <div className="w-full flex flex-col gap-y-2">
          <label className="font-poppins font-[700] text-[#313131] text-base">
            Transitions (in Seconds)
          </label>
          <Select
            value={formData?.transitions?.toString()}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                transitions: value,
              }))
            }
            className="w-full"
          >
            <Option value="0">1 sec fade in/out</Option>
            <Option value="1">Customizable fade (3 sec)</Option>
            <Option value="2">Advanced transitions, dynamic (1-5 sec)</Option>
          </Select>
        </div>

        {/* Watermarking */}
        <div className="w-full flex flex-col gap-y-2">
          <Checkbox
            checked={formData?.watermarking}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                watermarking: e.target.checked,
              }))
            }
          >
            Watermarking
          </Checkbox>
        </div>

        {/* Chunk Size and AI Models */}
        <div className="flex w-full gap-x-2">
          <div className="flex flex-col gap-y-2 w-1/2">
            <label className="font-poppins font-[700] text-[#313131] text-base">
              Chunk Size (in Seconds)
            </label>
            <Select
              value={formData?.chunk_size?.toString()}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  chunk_size: value,
                }))
              }
              className="w-full"
            >
              <Option value="0">Fixed 30-seconds</Option>
              <Option value="1">Configurable (between 30 to 40)</Option>
              <Option value="2">Dynamic chunking (between 20 to 50)</Option>
            </Select>
          </div>
          <div className="flex flex-col gap-y-2 w-1/2">
            <label className="font-poppins font-[700] text-[#313131] text-base">
              AI-Models
            </label>
            <Select
              value={formData?.ai_model?.toString()}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  ai_model: value,
                }))
              }
              className="w-full"
            >
              <Option value="0">Lowest Model</Option>
              <Option value="1">Medium Model</Option>
              <Option value="2">Highest Model</Option>
            </Select>
          </div>
        </div>

        {/* Output Resolution */}
        <div className="w-full flex flex-col gap-y-2">
          <label className="font-poppins font-[700] text-[#313131] text-base">
            Output Resolution
          </label>
          <Select
            value={formData?.output_resolutions?.toString()}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                output_resolutions: value,
              }))
            }
            className="w-full"
          >
            <Option value="480p">480p</Option>
            <Option value="720p">720p</Option>
            <Option value="1080p">1080p</Option>
          </Select>
        </div>

        {/* Video Summarization and File Retention Policy */}
        <div className="flex w-full gap-x-2">
          <div className="flex flex-col gap-y-2 w-full">
            <label className="font-poppins font-[700] text-[#313131] text-base">
              Video Summarization
            </label>
            <div className="mt-2 w-full">
              <Checkbox
                checked={formData?.summarizer_limited}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    summarizer_limited: e.target.checked,
                  }))
                }
              >
                Limited Summarization
              </Checkbox>
            </div>
            <Input
              type="number"
              min={0}
              value={formData?.video_summarizer}
              disabled={!formData?.summarizer_limited}
              className="placeholder:text-[#aab7c4] font-poppins border-[#E6E6E6] border-1 h-[50px] pl-6 bg-transparent"
              placeholder="Enter Video Summarization"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  video_summarizer: +e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <label className="font-poppins font-[700] text-[#313131] text-base">
            File Retention Policy (in Days)
          </label>
          <Select
            value={formData?.file_retention?.toString()}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                file_retention: value,
              }))
            }
            className="w-full"
          >
            <Option value="0">Files purged after 1 day</Option>
            <Option value="1">Files stored for 7 days</Option>
            <Option value="2">Files stored for 30-90 days</Option>
          </Select>
        </div>

        {/* Storage Space and Priority */}
        <div className="flex w-full gap-x-2">
          <div className="flex flex-col gap-y-2 w-full">
            <label className="font-poppins font-[700] text-[#313131] text-base">
              Storage Space
            </label>
            <div className="mt-2 w-full">
              <Checkbox
                checked={formData?.storage_limited}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    storage_limited: e.target.checked,
                  }))
                }
              >
                Limited Storage
              </Checkbox>
            </div>
            <Input
              type="number"
              min={0}
              value={formData?.storage_space}
              disabled={!formData?.storage_limited}
              className="placeholder:text-[#aab7c4] font-poppins border-[#E6E6E6] border-1 h-[50px] pl-6 bg-transparent"
              placeholder="Enter Storage Space"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  storage_space: +e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <label className="font-poppins font-[700] text-[#313131] text-base">
            Priority for Processing
          </label>
          <Select
            value={formData?.priority?.toString()}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                priority: value,
              }))
            }
            className="w-full"
          >
            <Option value="0">Low</Option>
            <Option value="1">Medium</Option>
            <Option value="2">High</Option>
          </Select>
        </div>

        {/* Notification System */}
        <div className="flex flex-col gap-y-2 w-full">
          <label className="font-poppins font-[700] text-[#313131] text-base">
            Notification System
          </label>
          <Select
            value={formData?.notification_type?.toString()}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                notification_type: value,
              }))
            }
            className="w-full"
          >
            <Option value="0">1 hour warning before deletion</Option>
            <Option value="1">24-hour notice, extendable by 7 days</Option>
            <Option value="2">1-week, 3-days, 24-hour</Option>
          </Select>
        </div>

        <div className="flex gap-x-2 justify-end">
          <button
            onClick={() => setShowEditModal(false)}
            className="btn bg-white-800 py-3 px-10 desktop:text-[14px] cursor-pointer rounded-[5px] border-[#C9C9CA] border text-[#C9C9CA] font-500 text-base"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn bg-[#131313] py-3 desktop:text-[14px] px-10 cursor-pointer rounded-[5px] text-[#fff] font-500 text-base"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPlanForm;
