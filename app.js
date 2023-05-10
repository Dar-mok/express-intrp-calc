/** Simple demo Express app. */

const express = require("express");
const app = express();
// app.use(express.json());
// app.use(express.urlencoded());


// useful error class to throw
const { ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError, } = require("./expressError");

  const { convertStrNums } = require("./utils");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";
const { findMean,
  findMedian,
  findMode } = require("./stats");

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  if(!req.query.nums){
    throw new BadRequestError("nums are required")
  }
  let stringNums = req.query.nums.split(",");

  const convertedStrNums = convertStrNums(stringNums);

  const mean = findMean(convertedStrNums);

  return res.json({
    "operation": "mean",
    "result": mean});
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {
  if(!req.query.nums){
    throw new BadRequestError("nums are required")
  }
  let stringNums = req.query.nums.split(",");

  const convertedStrNums = convertStrNums(stringNums);

  const median = findMedian(convertedStrNums);

  return res.json({
    "operation": "median",
    "result": median});
});

/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res) {
  if(!req.query.nums){
    throw new BadRequestError("nums are required")
  }
  let stringNums = req.query.nums.split(",");

  const convertedStrNums = convertStrNums(stringNums);

  const mode = findMode(convertedStrNums);

  return res.json({
    "operation": "mode",
    "result": mode});
});

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;