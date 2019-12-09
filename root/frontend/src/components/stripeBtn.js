import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const stripeBtn = ({item}) => {
const publishableKey = process.env.REACT_APP_API_STRIPE_PUBLISH_KEY;
const port = process.env.REACT_APP_PORT ; 
let price = item.price;
price = price*100;
function refreshPage() {
  window.location.reload(true);
}

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

  const onToken = token => {
    console.log(price);
    const body = {
      amount: price,
      token: token
  };  axios
      .post(`http://localhost:${port}/api/stripePayment/charge`, body)
      .then(response => {
        console.log(response);
        console.log(item);
        const ubdatebody = {
          state:true,
        };
        axios
          .put(
            `http://localhost:${port}/api/items/`+item._id ,ubdatebody
          )
          .then(res => {
            let body={
                senderID:"5de6eb301d09972504e4464f",
                recieverID:item.sellerID,
                content : "Your item has been sold",
                date: dateTime,
                isRead :false
              };
            let res;
            try {
              res = axios.post(`http://localhost:${port}/api/notifications`, body);
              if (res != null) {
                alert("Payment Success");
                handleCloseCash();
                handleClose();
              }
            } catch(error) {console.log(error.message)}
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