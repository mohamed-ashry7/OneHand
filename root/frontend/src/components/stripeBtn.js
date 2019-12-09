import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const stripeBtn = ({item}) => {
let price = item.price;
price = price*100;
function refreshPage() {
  window.location.reload(true);
}
const publishableKey = "pk_test_OXaOFv02nPl06SwomHwWyKvE00HgEX8x7G";
  const onToken = token => {
    console.log(price);
    const body = {
      amount: price,
      token: token
  };  axios
      .post("http://localhost:3000/api/stripePayment/charge", body)
      .then(response => {
        console.log(response);
        console.log(item);
        const ubdatebody = {
          state:true,
        };
        axios
          .put(
            "http://localhost:3000/api/items/"+item._id ,ubdatebody
          )
          .then(res => {
            alert("Payment Success");
            refreshPage();
          });
      })
      .catch(error => {
        console.log( error);
        alert(error);
      });
  };  return (
    
    <StripeCheckout
      color="primary" style={{position: "absolute",right:"0px"}}
      label="Buy" //Component button text
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
export default (stripeBtn);