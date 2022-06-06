import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import API from "../../services/API";
import { useState } from "react";
import Copyright from "../Copyright";
import auth from "./auth";

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
    },
  });

  const errMiddleware = (errStr, next) => {
    const where = errStr?.toLowerCase().indexOf("duplicate email");
    if (where && where >= 0) {
      setError("email", { type: "api", message: errStr.slice(where) });
    }
    if (next) {
      next(errStr);
    }
  };

  const submit = handleSubmit(async (d) => {
    // onSubmit(d);
    await auth(
      d,
      (c) => API.register(c),
      (e) => errMiddleware(e)
    );
    // alert(JSON.stringify(res));
    // alert(`Submit: ${JSON.stringify(d)}`);
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={submit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstname"
                required
                fullWidth
                id="firstname"
                label="First Name"
                autoFocus
                {...register("firstname", {
                  required: "You must provide a first name to register.",
                })}
                error={Boolean(errors?.firstname)}
                helperText={errors?.firstname?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="family-name"
                {...register("lastname", {
                  required: "You must provide a last name to register.",
                })}
                error={Boolean(errors?.lastname)}
                helperText={errors?.lastname?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register("email", {
                  required: "You must provide an email to register.",
                })}
                error={Boolean(errors?.email)}
                helperText={errors?.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register("password", {
                  required: "You must provide an password to register.",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Please use a password that is at least eight characters, and contains at least one each: uppercase letter, lowercase letter, number, and special character (@, $, !, %, *, ?, or &).",
                  },
                  // minLength: {
                  //   value: 8,
                  //   message: "Passwords must be at least 8 characters.",
                  // },
                })}
                error={Boolean(errors?.password)}
                helperText={errors?.password?.message}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
