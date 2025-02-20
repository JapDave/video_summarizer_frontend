import React, { useRef, useState } from 'react';
import { Input, Radio, Checkbox, Select } from 'antd';
import { authAPI } from '../../api';
import ToastContainer from '../customToaster/ToastContainer';
import { useForm } from 'react-hook-form';
import Loader from '../customLoader/Loader';

const { Option } = Select;

const AddPlanForm = ({ setShowModal, getPlansHandler }) => {
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [planTitle, setPlanTitle] = useState('freePlans');
  const [price, setPrice] = useState(0);
  const [isFree, setIsFree] = useState(false);
  const [limitedLength, setLimitedLength] = useState(true);
  const [summarizerLimited, setSummarizerLimited] = useState(true);
  const [storageLimited, setStorageLimited] = useState(true);
  const [videoLength, setVideoLength] = useState(0);
  const [faceDetection, setFaceDetection] = useState(3);
  const [transitions, setTransitions] = useState('0');
  const [watermarking, setWatermarking] = useState(true);
  const [chunkSize, setChunkSize] = useState('0');
  const [model, setModel] = useState('0');
  const [outputResolution, setOutputResolution] = useState('480p');
  const [videoSummarization, setVideoSummarization] = useState(0);
  const [fileRetentionPolicy, setFileRetentionPolicy] = useState('0');
  const [storageSpace, setStorageSpace] = useState(0);
  const [priority, setPriority] = useState('0');
  const [notificationSystem, setNotificationSystem] = useState('0');
  const [planResponse, setPlanResponse] = useState(null);
  console.log('🚀 ~ AddPlanForm ~ planResponse:', planResponse);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addPlanHandler = async () => {
    setIsLoading(true);
    try {
      const response = await authAPI.addPlan({
        name: planTitle,
        length_limited: limitedLength,
        video_length: videoLength,
        face_detection: faceDetection,
        transitions: +transitions,
        watermarking: watermarking,
        chunk_size: +chunkSize,
        ai_model: +model,
        output_resolutions: outputResolution,
        notification_type: +notificationSystem,
        priority: +priority,
        file_retention: +fileRetentionPolicy,
        video_summarizer: videoSummarization,
        summarizer_limited: summarizerLimited,
        storage_limited: storageLimited,
        storage_space: storageSpace,
        sub_title: 'test',
        is_active: true,
        amount: isFree ? 0 : price,
        is_stripe_plan: isFree ? false : true,
      });
      if (response) {
        setPlanResponse(response);
        toastRef.current.addToast('Plan added successfully!', 3000);
        setShowModal(false);
        setIsLoading(false);
        if (getPlansHandler) {
          await getPlansHandler();
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      toastRef.current.addToast('Error in plan addition failed.', 3000);
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
        onSubmit={handleSubmit(addPlanHandler)}
        role="form"
        className="flex flex-col gap-y-4 desktop:gap-y-2"
      >
        <label
          className="text-[24px] font-[400] desktop:text-xl"
          style={{ lineHeight: '32.4px' }}
        >
          Add Plan
        </label>

        {/* Plan Title Select */}
        <div className="flex flex-col gap-y-2 w-full">
          <label className="font-poppins font-[700] text-[#313131] text-base">
            Plan For
          </label>
          <Select
            value={planTitle}
            onChange={(value) => setPlanTitle(value)}
            className="w-full"
          >
            <Option value="freePlans">Free Plans</Option>
            <Option value="proPlans">Pro Plans</Option>
            <Option value="pro+Plans">Pro+ Plans</Option>
          </Select>
        </div>

        {/* Price */}
        <div className="flex flex-col w-full gap-x-2">
          {!isFree && (
            <div className="flex flex-col gap-y-2 w-full">
              <label className="font-poppins font-[700] text-[#313131] text-base">
                Price
              </label>
              <Input
                type="number"
                min={0}
                className="placeholder:text-[#aab7c4] font-poppins border-[#E6E6E6] border-1 h-[50px] pl-6 bg-transparent"
                placeholder="Enter Plan Price"
                onChange={(e) => setPrice(+e.target.value)}
              />
            </div>
          )}
          <div className="w-full flex flex-col gap-y-2 mt-2">
            <Checkbox
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
            >
              Free plan
            </Checkbox>
          </div>
        </div>
        {/* Video Length and Face Detection */}
        <div className="flex w-full gap-x-2">
          <div className="flex flex-col gap-y-2 w-full">
            <label className="font-poppins font-[700] text-[#313131] text-base">
              Video Length (in Minutes)
            </label>
            <div className="mt-2 w-full">
              <Checkbox
                checked={limitedLength}
                onChange={(e) => setLimitedLength(e.target.checked)}
              >
                Limited Length
              </Checkbox>
            </div>
            <Input
              type="number"
              min={0}
              disabled={!limitedLength}
              className="placeholder:text-[#aab7c4] font-poppins border-[#E6E6E6] border-1 h-[50px] pl-6 bg-transparent"
              placeholder="Enter Video Length"
              onChange={(e) => setVideoLength(+e.target.value)}
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
              className="placeholder:text-[#aab7c4] font-poppins border-[#E6E6E6] border-1 h-[50px] pl-6 bg-transparent"
              placeholder="Enter Face Detection Level"
              onChange={(e) => setFaceDetection(+e.target.value)}
            />
          </div>
        </div>

        {/* Transitions */}
        <div className="w-full flex flex-col gap-y-2">
          <label className="font-poppins font-[700] text-[#313131] text-base">
            Transitions (in Seconds)
          </label>
          <Select
            value={transitions}
            onChange={(value) => setTransitions(value)}
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
            checked={watermarking}
            onChange={(e) => setWatermarking(e.target.checked)}
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
              value={chunkSize}
              onChange={(value) => setChunkSize(value)}
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
              value={model}
              onChange={(value) => setModel(value)}
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
            value={outputResolution}
            onChange={(value) => setOutputResolution(value)}
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
                checked={summarizerLimited}
                onChange={(e) => setSummarizerLimited(e.target.checked)}
              >
                Limited Summarization
              </Checkbox>
            </div>
            <Input
              type="number"
              min={0}
              disabled={!summarizerLimited}
              className="placeholder:text-[#aab7c4] font-poppins border-[#E6E6E6] border-1 h-[50px] pl-6 bg-transparent"
              placeholder="Enter Video Summarization"
              onChange={(e) => setVideoSummarization(+e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <label className="font-poppins font-[700] text-[#313131] text-base">
            File Retention Policy (in Days)
          </label>
          <Select
            value={fileRetentionPolicy}
            onChange={(value) => setFileRetentionPolicy(value)}
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
                checked={storageLimited}
                onChange={(e) => setStorageLimited(e.target.checked)}
              >
                Limited Storage
              </Checkbox>
            </div>
            <Input
              type="number"
              min={0}
              disabled={!storageLimited}
              className="placeholder:text-[#aab7c4] font-poppins border-[#E6E6E6] border-1 h-[50px] pl-6 bg-transparent"
              placeholder="Enter Storage Space"
              onChange={(e) => setStorageSpace(+e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <label className="font-poppins font-[700] text-[#313131] text-base">
            Priority for Processing
          </label>
          <Select
            value={priority}
            onChange={(value) => setPriority(value)}
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
            value={notificationSystem}
            onChange={(value) => setNotificationSystem(value)}
            className="w-full"
          >
            <Option value="0">1 hour warning before deletion</Option>
            <Option value="1">24-hour notice, extendable by 7 days</Option>
            <Option value="2">1-week, 3-days, 24-hour</Option>
          </Select>
        </div>

        <div className="flex gap-x-2 justify-end">
          <button
            onClick={() => setShowModal(false)}
            className="btn bg-white-800 py-3 px-10 desktop:text-[14px] cursor-pointer rounded-[5px] border-[#C9C9CA] border text-[#C9C9CA] font-500 text-base"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn bg-[#131313] py-3 desktop:text-[14px] px-10 cursor-pointer rounded-[5px] text-[#fff] font-500 text-base"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlanForm;
