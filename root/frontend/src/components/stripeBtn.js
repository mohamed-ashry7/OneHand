import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";


const stripeBtn = ({price}) => {
const publishableKey = process.env.REACT_APP_API_STRIPE_PUBLISH_KEY;
const port = process.env.REACT_APP_PORT ; 
   
  const onToken = token => {
    const body = {
      amount: price,
      token: token
  };  axios
      .post(`http://localhost:${port}/api/stripePayment/charge`, body)
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