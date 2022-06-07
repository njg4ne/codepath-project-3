import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import { default as UILink } from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import API from "services/API";
import Copyright from "components/Copyright";
import auth from "components/Auth/auth";
import { SettingsInputSvideoRounded } from "@mui/icons-material";
import { Navigate } from "react-router-dom";

export default function Login({ setUser, user }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "john.doe@example.com",
    },
  });

  const errMiddleware = (errStr, next) => {
    const where = errStr?.toLowerCase().indexOf("invalid");
    if (where && where >= 0) {
      setError("password", { type: "api", message: errStr.slice(where) });
    }
    if (next) {
      next(errStr);
    }
  };

  const submit = handleSubmit(async (d) => {
    // onSubmit(d);
    await auth(
      d,
      (c) => API.login(c),
      (e) => errMiddleware(e),
      (o) => {
        setUser(o);
      }
    );
    // alert(JSON.stringify(res));
    // alert(`Submit: ${JSON.stringify(d)}`);
  });
  if (user) {
    return <Navigate replace to="/sleep" />;
  }

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
          Sign in
        </Typography>
        <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register("email", {
              required: "Enter the email you used to register.",
            })}
            error={Boolean(errors?.email || errors?.password?.type === "api")}
            helperText={errors?.email?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password", {
              required: "Enter the password you used to register.",
            })}
            error={Boolean(errors?.password)}
            helperText={errors?.password?.message}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            {...register("remember")}
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item xs>
              <UILink href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </UILink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
