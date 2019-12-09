import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
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
import ItemForm from "./../item/ItemForm"
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

function ExchangeForm(props) {
  const { classes } = props;
  const [open, setOpen] = React.useState(false);
  const [openCash, setOpenCash] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const {item} = props;
  let price ="";
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenCash = () => {
    setOpenCash(true);
  };

  const handleCloseCash = () => {
    setOpenCash(false);
  };

  const sendToOwner = () => {
    setOpenCash(false);
  };
      
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  
  const createItem = () => {
    let body={
        senderID:"5de6eb301d09972504e4464f",
        recieverID:item.sellerID,
        content : "there is one offer "+price+" to you on your "+item.title+" stuff connect with him",
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
  };
  
    return(
      <React.Fragment>
        <Grid item>
          <Button variant="contained" color="primary" style={{position: "absolute",right:"0px"}} className={classes.addUser} onClick={handleClickOpen}>
           Eschange
          </Button>
        </Grid>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{ "How you want to exchange?"}</DialogTitle>
          <DialogContent  style={{height: "60px"}}>
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                    <Button variant="contained" color="primary" className={classes.addUser} onClick={handleClickOpenCash}>
                        Cash
                    </Button>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <ItemForm type="Exchange1" item={item}/>
                </Grid>
              </Grid>
            </React.Fragment>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullScreen={fullScreen}
          open={openCash}
          onClose={handleCloseCash}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{ "Enter Your Offer:"}</DialogTitle>
          <DialogContent  style={{height: "80px"}}>
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    onChange={(e) => { price = e.target.value;}}
                    required
                    type="number"
                    id="price"
                    name="price"
                    label="Amount"
                    fullWidth
                    autoComplete="price"
                  />
                </Grid>
              </Grid>
            </React.Fragment>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCash} color="primary" autoFocus>
              Cancel
            </Button>
            <Button onClick={createItem} color="primary" autoFocus>
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
}

ItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExchangeForm);