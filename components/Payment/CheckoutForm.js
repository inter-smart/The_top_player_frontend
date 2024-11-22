import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

const CheckoutForm = ({ course_id, Lang, type }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [disabel, setDisabel] = useState(false);
  // const { t } = useTranslation();
  const toast = useRef(null);
  const EMptyInput = (mess) => {
    toast.current.show({
      severity: "error",
      summary: `${mess}`,
      // life: 3000,
    });
  };
  const show = (e) => {
    toast.current.show({
      severity: "success",
      summary: e,
      // detail: formik.values.value,
    });
  };
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    setDisabel(true);
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/${Lang}/user/payment/confirm/${type}/${course_id}`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      EMptyInput(result.error.message);
      setDisabel(false);
    } else {
      // console.log(result)
      show("Payment success");
      setDisabel(false);
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
        <PaymentElement />
        <button disabled={!stripe} className={`submit-button ${disabel && "LoadingButton"}`}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
