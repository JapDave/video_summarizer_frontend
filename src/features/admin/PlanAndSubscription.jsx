import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Button, Modal, Select } from "antd";
import PlanAndSubscriptionTable from "../../components/admin/PlanAndSubscriptionTable";
import AddPlanForm from "../../components/admin/AddPlanForm";

const PlanAndSubscription = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const filterData = [
    {
      name: "Basic Plan",
      id: 1,
      currency: "USD",
      image: null,
      token_limit: 1000,
      interval: "month",
      is_active: true,
      created_at: "2023-01-15T10:00:00Z",
      price_id: "price_123",
      product_id: 101,
      description: {
        1: "Access to basic features",
        2: "Support via email",
        3: "10GB storage",
      },
      amount: 10,
      interval_count: 1,
      sub_title: "Monthly Basic Plan",
      is_stripe_plan: true,
    },
    {
      name: "Pro Plan",
      id: 2,
      currency: "USD",
      image: null,
      token_limit: 5000,
      interval: "month",
      is_active: true,
      created_at: "2023-02-20T12:30:00Z",
      price_id: "price_456",
      product_id: 102,
      description: {
        1: "All basic features",
        2: "Priority support",
        3: "50GB storage",
      },
      amount: 30,
      interval_count: 1,
      sub_title: "Monthly Pro Plan",
      is_stripe_plan: true,
    },
    {
      name: "Enterprise Plan",
      id: 3,
      currency: "USD",
      image: null,
      token_limit: 10000,
      interval: "year",
      is_active: false,
      created_at: "2023-03-10T15:45:00Z",
      price_id: "price_789",
      product_id: 103,
      description: {
        1: "All pro features",
        2: "Dedicated account manager",
        3: "1TB storage",
      },
      amount: 300,
      interval_count: 1,
      sub_title: "Yearly Enterprise Plan",
      is_stripe_plan: true,
    },
    {
      name: "Starter Plan",
      id: 4,
      currency: "EUR",
      image: "https://example.com/starter-plan.png",
      token_limit: 500,
      interval: "month",
      is_active: true,
      created_at: "2023-04-05T08:00:00Z",
      price_id: "price_101",
      product_id: 104,
      description: {
        1: "Access to essential features",
        2: "Community support",
        3: "5GB storage",
      },
      amount: 5,
      interval_count: 1,
      sub_title: "Monthly Starter Plan",
      is_stripe_plan: false,
    },
    {
      name: "Premium Plan",
      id: 5,
      currency: "GBP",
      image: null,
      token_limit: 20000,
      interval: "year",
      is_active: true,
      created_at: "2023-05-10T18:30:00Z",
      price_id: "price_202",
      product_id: 105,
      description: {
        1: "Unlimited access",
        2: "24/7 premium support",
        3: "Unlimited storage",
      },
      amount: 500,
      interval_count: 1,
      sub_title: "Yearly Premium Plan",
      is_stripe_plan: true,
    },
  ];

  const numberOfActivePlans = 3;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-2 items-center">
          <Button
            data-cy="add-plan"
            disabled={numberOfActivePlans >= 6}
            onClick={() => setModalOpen(true)}
            className={`rounded-lg h-12 w-15 bg-blue-600 text-white ${
              numberOfActivePlans >= 6 ? "opacity-40" : ""
            }`}
          >
            Add
          </Button>

          <div className={`relative h-12 rounded-md`}>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <div className="h-4 w-4 font-semibold text-gray-800">
                <FiSearch />
              </div>
            </div>
            <input
              data-cy="search-input"
              type="search"
              id="default-search"
              //   onChange={(e) => setQuery(e.target.value)}
              className="text-black-800 block h-full w-full rounded-md border bg-gray-50 px-3 py-2 pl-10 text-sm placeholder-gray-800 outline-none focus:border-blue-800 focus:ring-blue-800"
              placeholder="Search"
              required
            />
          </div>
        </div>
      </div>
      {modalOpen && (
        <Modal
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          okButtonProps={{ style: { backgroundColor: "#4285F4" } }}
          footer={null}
          destroyOnClose
          width={656}
          className="font-poppins bg-[#fafafc]"
          style={{ backgroundColor: "#fafafc" }}
          centered
        >
          <AddPlanForm
            setShowModal={setModalOpen}
            // getStripePlansHandler={getStripePlansHandler}
          />
          Plan Form
        </Modal>
      )}
      <PlanAndSubscriptionTable
        getStripePlansHandler={() => {}}
        data={filterData ? filterData : data}
      />
    </div>
  );
};

export default PlanAndSubscription;
