const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const { NotFoundError } = require("./utils/errors");
const { PORT } = require("./config");
const security = require("./routes/auth");

const app = express();
// Cross origin resource sharing
app.use(cors());
// Parse requests with JSON bodies
app.use(express.json());
// Logging
app.use(morgan("tiny"));

app.use("/auth", security);

// Fallback Error Type
app.use((req, res, next) => {
  return next(new NotFoundError());
});
// Error Handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`.green));
