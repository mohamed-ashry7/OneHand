


const express = require('express') ; 
const stripe = require('stripe')("sk_test_TPHgTPCEQ7WdeCylJGOdnCL300yKtwgMVV") ;
const router = express.Router() ; 



const stripeChargeCallback = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
        console.log(stripeErr)
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  };
router.post('/charge',async(req,res)=>{
    const stripeToken = req.body.token.id
    const chargedAmount = await req.body.amount
    stripe.charges.create({
        amount:chargedAmount ,
        source:stripeToken ,
        currency:"usd"
    }, stripeChargeCallback(res)) ; 
})

module.exports=router 

