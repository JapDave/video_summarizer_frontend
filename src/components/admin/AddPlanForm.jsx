import React, { useState } from "react";
import { Input, Radio, Checkbox, Select } from "antd";

const { Option } = Select;

const AddPlanForm = ({ setShowModal }) => {
  const [planTitle, setPlanTitle] = useState("freePlans");
  const [price, setPrice] = useState(0);
  const [isFree, setIsFree] = useState();
  const [videoLength, setVideoLength] = useState(0);
  const [faceDetection, setFaceDetection] = useState(3);
  const [transitions, setTransitions] = useState(0);
  const [watermarking, setWatermarking] = useState(false);
  const [chunkSize, setChunkSize] = useState(0);
  const [model, setModel] = useState("lowest");
  const [outputResolution, setOutputResolution] = useState("480p");
  const [videoSummarization, setVideoSummarization] = useState(0);
  const [fileRetentionPolicy, setFileRetentionPolicy] = useState(0);
  const [storageSpace, setStorageSpace] = useState(0);
  const [priority, setPriority] = useState("low");
  const [notificationSystem, setNotificationSystem] = useState();

  return (
    <div className="container py-[16px] px-[13px] max-w-[656px]">
      <form role="form" className="flex flex-col gap-y-4 desktop:gap-y-2">
        <label
          className="text-[24px] font-[400] desktop:text-xl"
          style={{ lineHeight: "32.4px" }}
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
          <div className="flex flex-col gap-y-2 w-1/2">
            <label className="font-poppins font-[700] text-[#313131] text-base">
              Video Length (in Minutes)
            </label>
            <Input
              type="number"
              min={0}
              className="placeholder:text-[#aab7c4] font-poppins border-[#E6E6E6] border-1 h-[50px] pl-6 bg-transparent"
              placeholder="Enter Video Length"
              onChange={(e) => setVideoLength(+e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2 w-1/2">
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
          <Input
            type="number"
            min={0}
            className="placeholder:text-[#aab7c4] font-poppins border-[#E6E6E6] border-1 h-[50px] pl-6 bg-transparent"
            placeholder="Enter Transition Duration"
            onChange={(e) => setTransitions(+e.target.value)}
          />
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
            <Input
              type="number"
              min={0}
              className="placeholder:text-[#aab7c4] font-poppins border-[#E6E6E6] border-1 h-[50px] pl-6 bg-transparent"
              placeholder="Enter Chunk Size"
              onChange={(e) => setChunkSize(+e.target.value)}
            />
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
              <Option value="lowest">Lowest</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
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
          <div className="flex flex-col gap-y-2 w-1/2">
            <label className="font-poppins font-[700] text-[#313131] text-base">
              Video Summarization
            </label>
            <Input
              type="number"
              min={0}
              className="placeholder:text-[#aab7c4] font-poppins border-[#E6E6E6] border-1 h-[50px] pl-6 bg-transparent"
              placeholder="Enter Video Summarization"
              onChange={(e) => setVideoSummarization(+e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2 w-1/2">
            <label className="font-poppins font-[700] text-[#313131] text-base">
              File Retention Policy (in Days)
            </label>
            <Input
              type="number"
              min={0}
              className="placeholder:text-[#aab7c4] font-poppins border-[#E6E6E6] border-1 h-[50px] pl-6 bg-transparent"
              placeholder="Enter Retention Policy"
              onChange={(e) => setFileRetentionPolicy(+e.target.value)}
            />
          </div>
        </div>

        {/* Storage Space and Priority */}
        <div className="flex w-full gap-x-2">
          <div className="flex flex-col gap-y-2 w-1/2">
            <label className="font-poppins font-[700] text-[#313131] text-base">
              Storage Space
            </label>
            <Input
              type="number"
              min={0}
              className="placeholder:text-[#aab7c4] font-poppins border-[#E6E6E6] border-1 h-[50px] pl-6 bg-transparent"
              placeholder="Enter Storage Space"
              onChange={(e) => setStorageSpace(+e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-2 w-1/2">
            <label className="font-poppins font-[700] text-[#313131] text-base">
              Priority for Processing
            </label>
            <Select
              value={priority}
              onChange={(value) => setPriority(value)}
              className="w-full"
            >
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </div>
        </div>

        {/* Notification System */}
        <div className="flex flex-col gap-y-2 w-1/2">
          <label className="font-poppins font-[700] text-[#313131] text-base">
            Notification System
          </label>
          <Input
            className="placeholder:text-[#aab7c4] font-poppins border-[#E6E6E6] border-1 h-[50px] pl-6 bg-transparent"
            placeholder="Enter Notification System"
            onChange={(e) => setNotificationSystem(+e.target.value)}
          />
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
