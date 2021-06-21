import React, { useState } from "react"
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core"
import { GoogleLogin } from "react-google-login"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { signup, signin } from "../../redux/actions/auth"
import Input from "./Input"
import Icon from "./Icon"

import useStyles from "./styles.js"

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  confirmPassword: "",
}

const Auth = () => {
  const classes = useStyles()
  // const isSignup = true
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignup) {
      // Sign Up
      dispatch(signup(formData, history))
    } else {
      dispatch(signin(formData, history))
    }
    console.log(formData)
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
  }

  const googleSuccess = async (res) => {
    const result = res?.profileObj // if not there, return undefined
    const token = res?.tokenId // if not there, return undefined

    try {
      dispatch({ type: "AUTH", data: { result, token } })
      history.push("/")
    } catch (error) {
      console.log(error)
    }
  }
  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try Again")
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              type="email"
              handleChange={handleChange}
              half={false}
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              handleChange={handleChange}
              half={false}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                handleChange={handleChange}
                half={false}
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="1063521371648-m5rrn4bagvavcdu8p2iue4geuuu32u3j.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-start">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
