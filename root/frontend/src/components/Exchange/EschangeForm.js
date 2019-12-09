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
          <DialogTitle id="responsive-dialog-title">{ "Enter Your Item Information:"}</DialogTitle>
          <DialogContent  style={{height: "100px"}}>
            <React.Fragment>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="primary" className={classes.addUser} onClick={handleClickOpenCash}>
                        Cash
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <ItemForm Type="Exchange"/>
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
          <DialogTitle id="responsive-dialog-title">{ "Enter Your Item Information:"}</DialogTitle>
          <DialogContent>
            <React.Fragment>
              <Grid container spacing={3}>
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
            <Button onClick={handleCloseCash} color="primary" autoFocus>
              Cancel
            </Button>
            <Button onClick={sendToOwner} color="primary" autoFocus>
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