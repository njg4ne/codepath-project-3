import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.linkedin.com/in/nicholas-gardella-14519618b"
      >
        Nicholas Gardella
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
