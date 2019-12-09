import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Filepond from "../filepond"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";
import PropTypes from 'prop-types';
const port = process.env.REACT_APP_PORT ; 

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

function ItemForm(props) {
  const { classes ,type} = props;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  var  file = null;
  var title = "";
  var category = " cfd";
  var addressline = "";
  var city = "";
  var country = "";
  var description = "";
  var price = 0;

    function refreshPage() {
     window.location.reload(true);
    }

  const onChangeValueHandler = (val) => {
    file = val; 
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  
  const handleClose = () => {
    setOpen(false);
  };
  console.log(type)
  const createItem = () => {
    console.log("jkhkljhlkjh")
    let body=null;
    if(type === "Exchange1"){
      body = {
        type:"Exchange",
        title:title,
        category:category,
        state:false,
        image:file,
        description:description,
        address:(country+"/"+city+"/"+addressline),
        itemToExchangeID:[props.item._id]
      };
      console.log(body)
      try {
        axios.post(`http://localhost:${port}/api/items`, body)
        .then(res => {
            console.log(props.item.itemToExchangeID)
            let itemToExchangeID;
            if(props.item.itemToExchangeID != null)
              itemToExchangeID = props.item.itemToExchangeID.concat(res.data.data._id);
            else 
              itemToExchangeID = [res.data.data._id];
            let ubdatebody ={
              itemToExchangeID:itemToExchangeID
            }
            console.log(ubdatebody)
            axios.put(
              `http://localhost:${port}/api/items/`+props.item._id ,ubdatebody
            )
            .then(res => {
              console.log(res)
              let body={
                  senderID:"5de6eb301d09972504e4464f",
                  recieverID:item.sellerID,
                  content : "there is one offer "+res.data.data.title+" to you on your "+item.title+" stuff connect with him",
                  date: dateTime,
                  isRead :false
                };
              let res;
              try {
                res = axios.post(`http://localhost:${port}/api/notifications`, body);
                if (res != null) {
                  alert("Your offer was sent successfully");
                  handleCloseCash();
                  handleClose();
                }
              } catch(error) {console.log(error.message)}
              alert("Item Created and connected to the item you want");
              refreshPage();
            });
        });
      } catch(error) {console.log(error.message)}
    }else{
    if(type==="Sell"){
      body = {
        type:"Sell",
        title:title,
        price:parseInt(price),
        category:category,
        state:false,
        image:file,
        description:description,
        address:(country+"/"+city+"/"+addressline)
      };
    }else if(type === "Donate"){
      body = {
        type:"Donate",
        title:title,
        category:category,
        state:false,
        description:description,
        address:(country+"/"+city+"/"+addressline)
      };
    }else{
      body = {
        type:"Exchange",
        title:title,
        category:category,
        state:false,
        image:file,
        description:description,
        address:(country+"/"+city+"/"+addressline)
      };
    }
    console.log(body)
    try {
      axios.post(`http://localhost:${port}/api/items`, body)
      .then(res => {
        alert("Item was added successfully");
        console.log(res)
        refreshPage();
      });
    } catch(error) {console.log(error.message)}
    }
    handleClose();
  };
  if(type==="Sell"){
    return(
      <React.Fragment>
        <Grid item>
          <Button variant="contained" color="primary" className={classes.addUser} onClick={handleClickOpen}>
            Sell your stuff
          </Button>
        </Grid>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{ "Enter Your Item Information:"}</DialogTitle>
          <DialogContent>
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="title"
                    name="title"
                    label="Title"
                    onChange={(e) => { title = e.target.value;}}
                    fullWidth
                    autoComplete="title"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="category"
                    onChange={(e) => { category = e.target.value;}}
                    name="category"
                    label="Category"
                    fullWidth
                    autoComplete="category"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    onChange={(e) => { city = e.target.value;}}
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="billing address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    onChange={(e) => { country = e.target.value;}}
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="billing country"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    onChange={(e) => { addressline = e.target.value;}}
                    id="address"
                    name="address"
                    label="Address line"
                    fullWidth
                    autoComplete="billing address-line"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    multiline={true}
                    rows = "6"
                    required
                    onChange={(e) => { description = e.target.value;}}
                    id="description"
                    name="description"
                    label="Description"
                    fullWidth
                    autoComplete="description"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Filepond file={file} onChangeValue={onChangeValueHandler}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => { price = e.target.value;}}
                    required
                    type="number"
                    id="price"
                    name="price"
                    label="Price"
                    fullWidth
                    autoComplete="price"
                  />
                </Grid>
              </Grid>
            </React.Fragment>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Cancel
            </Button>
            <Button onClick={createItem} color="primary" autoFocus>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }else if(type==="Donate"){
    return(
      <React.Fragment>
        <Grid item>
          <Button variant="contained" color="primary" className={classes.addUser} onClick={handleClickOpen}>
            Donate
          </Button>
        </Grid>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{ "Enter Your Item Information:"}</DialogTitle>
          <DialogContent>
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="title"
                    name="title"
                    label="Title"
                    onChange={(e) => { title = e.target.value;}}
                    fullWidth
                    autoComplete="title"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="category"
                    onChange={(e) => { category = e.target.value;}}
                    name="category"
                    label="Category"
                    fullWidth
                    autoComplete="category"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    onChange={(e) => { city = e.target.value;}}
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="billing address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    onChange={(e) => { country = e.target.value;}}
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="billing country"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    onChange={(e) => { addressline = e.target.value;}}
                    id="address"
                    name="address"
                    label="Address line"
                    fullWidth
                    autoComplete="billing address-line"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline={true}
                    rows = "3"
                    required
                    onChange={(e) => { description = e.target.value;}}
                    id="description"
                    name="description"
                    label="Description"
                    fullWidth
                    autoComplete="description"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </React.Fragment>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Cancel
            </Button>
            <Button onClick={createItem} color="primary" autoFocus>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }else if(type==="Exchange1"){
    return(
      <React.Fragment>
        <Grid item>
          <Button variant="contained" color="primary" style={{position: "absolute",right:"0px",marginRight:"35px"}} className={classes.addUser} onClick={handleClickOpen}>
             Stuff
          </Button>
        </Grid>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{ "Enter Your Item Information:"}</DialogTitle>
          <DialogContent>
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="title"
                    name="title"
                    label="Title"
                    onChange={(e) => { title = e.target.value;}}
                    fullWidth
                    autoComplete="title"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="category"
                    onChange={(e) => { category = e.target.value;}}
                    name="category"
                    label="Category"
                    fullWidth
                    autoComplete="category"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    onChange={(e) => { city = e.target.value;}}
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="billing address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    onChange={(e) => { country = e.target.value;}}
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="billing country"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    onChange={(e) => { addressline = e.target.value;}}
                    id="address"
                    name="address"
                    label="Address line"
                    fullWidth
                    autoComplete="billing address-line"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    multiline={true}
                    rows = "6"
                    required
                    onChange={(e) => { description = e.target.value;}}
                    id="description"
                    name="description"
                    label="Description"
                    fullWidth
                    autoComplete="description"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Filepond file={file} onChangeValue={onChangeValueHandler}/>
                </Grid>
              </Grid>
            </React.Fragment>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Cancel
            </Button>
            <Button onClick={createItem} color="primary" autoFocus>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
  else{
    return(
      <React.Fragment>
        <Grid item>
          <Button variant="contained" color="primary" className={classes.addUser} onClick={handleClickOpen}>
            Exchange your stuff
          </Button>
        </Grid>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{ "Enter Your Item Information:"}</DialogTitle>
          <DialogContent>
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="title"
                    name="title"
                    label="Title"
                    onChange={(e) => { title = e.target.value;}}
                    fullWidth
                    autoComplete="title"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="category"
                    onChange={(e) => { category = e.target.value;}}
                    name="category"
                    label="Category"
                    fullWidth
                    autoComplete="category"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    onChange={(e) => { city = e.target.value;}}
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="billing address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    onChange={(e) => { country = e.target.value;}}
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="billing country"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    onChange={(e) => { addressline = e.target.value;}}
                    id="address"
                    name="address"
                    label="Address line"
                    fullWidth
                    autoComplete="billing address-line"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    multiline={true}
                    rows = "6"
                    required
                    onChange={(e) => { description = e.target.value;}}
                    id="description"
                    name="description"
                    label="Description"
                    fullWidth
                    autoComplete="description"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <Filepond file={file} onChangeValue={onChangeValueHandler}/>
                </Grid>
              </Grid>
            </React.Fragment>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Cancel
            </Button>
            <Button onClick={createItem} color="primary" autoFocus>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

ItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemForm);