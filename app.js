// const path = require("path");
const express = require("express");
const morgan = require("morgan");
// const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
// const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
// const AppError = require("./utils/appError");

const app = express();
// Important for deployment
app.enable("trust proxy");
app.set("trust proxy", false);
// Security HTTP Headers
app.use(helmet());

// Development Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 200,
  WindowMs: 60 * 60, // 1 hour
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);
app.use(express.json({ limit: "100kb" }));

app.use(cookieParser());

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// app.use(
//   hpp({
//     whitelist: ["price", "category"],
//   })
// );

app.use(compression());
app.use(cors());

// Routes

app.all("*", (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

// app.use(globalErrorHandler);

module.exports = app;
