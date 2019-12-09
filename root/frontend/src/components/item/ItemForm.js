import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

  const onChangeValueHandler = (val) => {
    file = val; 
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createItem = () => {
    let body=null;
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
    }if(type === "Donate"){
      body = {
        type:"Donate",
        title:title,
        category:category,
        state:false,
        description:description,
        address:(country+"/"+city+"/"+addressline)
      };
    }
    else{
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
    console.log(body);
    let res;
    try {
      res = axios.post("http://localhost:3000/api/items", body);
      if (res.status === 200) {
        console.log(res)
      }
    } catch(error) {console.log(error.message)}
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
  }if(type==="Donate"){
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