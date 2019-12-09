import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";


const stripeBtn = ({price}) => {
const publishableKey = "pk_test_OXaOFv02nPl06SwomHwWyKvE00HgEX8x7G";
   
  const onToken = token => {
    const body = {
      amount: price,
      token: token
  };  axios
      .post("http://localhost:3001/api/stripePayment/charge", body)
      .then(response => {
        console.log(response);
        alert("Payment Success");
      })
      .catch(error => {
        console.log( error);
        alert(error);
      });
  };  return (
    
    <StripeCheckout
      label="Purchase" //Component button text
      name="OneHand Inc." //Modal Header
      description="What concerns us is your demands"
      panelLabel="Purchase" //Submit button in modal
      amount={price} //Amount in cents 
      token={onToken}
      stripeKey={publishableKey}
      billingAddress={false}
    />
    
  );
};
export default stripeBtn;