export const plansDummy = [
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
    current_plan: true,
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
    current_plan: false,
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
    current_plan: false,
  },
];