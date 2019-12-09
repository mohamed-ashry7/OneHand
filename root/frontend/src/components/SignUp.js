import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import * as ReactBootstrap from 'react-bootstrap';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { DropdownButton } from 'react-bootstrap';
import Dropdown from 'react-bootstrap';
const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});
var fname;
var lname;
var e_mail;
var passwordd;
var phonee;
var addresss;


const SignUp = props => {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <div>
          {/* <form className={classes.form}> */}
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="firstName">Your First Name</InputLabel>
            <Input
              id="firstName"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              onChange={e => {
                fname = e.target.value 
               props.firstName(e.target.value)
              }}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="lastName">Your Last Name</InputLabel>
            <Input
              name="lastName"
              type="lastName"
              id="lastName" 
              autoComplete="lastName"
              onChange={e => {
                props.lastName(e.target.value);
               lname = e.target.value;
              }}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              name="email"
              type="email"
              id="email"
              autoComplete="email"
              onChange={e => {
                props.mail(e.target.value);
                e_mail = e.target.value;
              }}
            />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => {
                props.pass(e.target.value)
                passwordd = e.target.value;
              }}
            />
          </FormControl>

          
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="phone">Phone</InputLabel>
            <Input
              name="phone"
              type="phone"
              id="phone"
              autoComplete="phone"
              onChange={e => {
                props.phone(e.target.value);
                phonee=e.target.value
              }}
            />
          </FormControl>
         
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="address">Address</InputLabel>
            <Input
              name="address"
              type="address"
              id="address"
              autoComplete="address"
              onChange={e => {
                props.address(e.target.value);
                addresss = e.target.value;
              }}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={
              //console.log(props.firstName)
              () => props.signUpMethod(fname,lname,e_mail,passwordd,phonee,addresss)
            }
          >
            Sign up
          </Button>
          {/* </form> */}
        </div>
      </Paper>
    </main>
  );
};

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);