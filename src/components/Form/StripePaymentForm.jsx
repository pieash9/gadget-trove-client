/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./StripeCheckoutForm.css";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const StripePaymentForm = ({ totalPrice, allCarts, formData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    // generate client secret and save in state
    if (totalPrice) {
      axiosSecure
        .post(`/create-payment-intent`, { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [totalPrice, axiosSecure]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "unknown",
          },
        },
      });

    if (confirmError) {
      console.log("[error]", confirmError);
      setCardError(confirmError.message);
    } else {
      console.log("[paymentIntent]", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // save payment info in db
        axiosSecure
          .post(`/orders/stripe`, {
            allCarts,
            formData,
            tran_id: paymentIntent.id,
            createdAt: new Date(),
          })
          .then((res) => {
            if (res.data.insertedId) {
              toast.success("Successfully toasted!");
            }
          });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        {cardError && <p className="mt-3 text-red-500">{cardError}</p>}
        <div className="text-center mt-3">
          <button
            className="button-primary !py-1"
            type="submit"
            disabled={!stripe}
          >
            Pay ${totalPrice + 12}
          </button>
        </div>
      </form>
    </>
  );
};

// Make

export default StripePaymentForm;
