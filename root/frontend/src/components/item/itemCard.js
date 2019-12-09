import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Stripe from "../stripeBtn"


class ItemCard extends React.Component {
  state = {
    redirect: false,
  };
  handleClick = () => {
    this.setState({
      redirect: true
    });
  };
  render() {
    const {item} =this.props;
    const {sellerID} =item;
    return (
      <Card 
          style={{
              padding:"10px",
              border: "1px solid blue",
              marginBottom: "10px",
              marginLeft: "auto",
              marginRight: "auto",
              width:"80%",
          }}>
      
        <CardActionArea>
          <div style={{height: "200px"}}>
            {(item.Image!=null)?(<img
              src={`data:${item.ImageType};base64,${Buffer.from(item.Image.data).toString('base64')}`}
              height="200"
            />):<div/>}
          </div>
          <CardContent>
          <p style={{ textAlign: "left"}}>
                    {item.title}
                      </p>
              <div style={{ display: "flex", position: "relative" }}>
                  <div 
                  style={{
                      width:"20%",
                      float:"left",
                      textAlign: "left"
                  }}
                  >
                     
                      <p style={{height: "8px",top:"0px"}}>
                      {(item.price!=null)?item.price:""}
                      </p>
                      <p style={{height: "8px"}}>
                      {item.category}
                      </p>
                  </div>
              
                  <Typography variant="body2" color="textSecondary" component="p" 
                      style={{
                          width:"60%",
                          float:"left"
                  }}>
                      {item.description}
                  </Typography>
                  <div 
                      style={{
                          width:"20%",
                          float:"left",
                          textAlign: "right"
                      }}>
                      <p style={{height: "8px", top:"0px"}}>
                      {item.address}
                      </p>
                      <p style={{height: "8px"}}>
                      {item.state?"Not Avaliable":"Avaliable"}
                      </p>
                  </div>
               </div>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ display: "flex", position: "relative" }}>
          <h4 size="small" color="primary">
             {(sellerID!=null)?sellerID.firstName + " " +sellerID.lastName:""} 
          </h4>
          {(item.type === "Sell")?<Stripe item={item}/>:<Button size="big" color="primary" style={{position: "absolute",right:"0px"}} >
              Exchange
          </Button>}
        </CardActions>
      </Card>
    );
  }
}

export default ItemCard;
