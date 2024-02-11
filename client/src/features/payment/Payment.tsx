import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { server } from "../../redux/store";

const Payment = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(async () => {
    const response = await fetch(`${server}/api/payment/create`, {
      method: "POST",
      body: {},
    });
    if (response) {
      setClientSecret(response);
    }
  }, []);
  return <div>Payment</div>;
};

export default Payment;
