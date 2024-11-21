import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsProcessing(false);
        return;
      }

      console.log("PaymentMethod:", paymentMethod);
      onPaymentSuccess(paymentMethod);
      setIsProcessing(false);
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6 border"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Payment Details
      </h2>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-800 text-gray-700 mb-2"
        >
          Cardholder Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border-gray-300  border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label
          htmlFor="card-element"
          className="block text-sm font-800 text-gray-700 mb-2"
        >
          Card Details
        </label>
        <div id="card-element" className="border rounded-lg shadow-sm p-2">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
      </div>

      {errorMessage && (
        <div className="text-sm text-red-600 mt-2">{errorMessage}</div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full bg-[#051b8d] hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          isProcessing ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
