const express = require("express");
const res = require("express/lib/response");
const app = express();
const fs = require("fs");
const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "calculate-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
const add = (n1, n2) => {
  return n1 + n2;
};
const sub = (n1, n2) => {
  return n1 - n2;
};
const mul = (n1, n2) => {
  return n1 * n2;
};
const div = (n1, n2) => {
  return n1 / n2;
};
app.get("/add", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }

    if (n1 === NaN || n2 === NaN) {
      console.log();
      throw new Error("Parsing Error");
    }
    logger.info("Parameters " + n1 + " and " + n2 + " received for addition");
    const result = add(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
});
app.get("/sub", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }

    if (n1 === NaN || n2 === NaN) {
      console.log();
      throw new Error("Parsing Error");
    }
    logger.info(
      "Parameters " + n1 + " and " + n2 + " received for subtraction"
    );
    const result = sub(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
});
app.get("/multiply", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }

    if (n1 === NaN || n2 === NaN) {
      console.log();
      throw new Error("Parsing Error");
    }
    logger.info("Parameters " + n1 + " and " + n2 + " received for multiply");
    const result = mul(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
});
app.get("/division", (req, res) => {
  try {
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if (isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
    }
    if (isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
    }
    if (n2 == 0) {
      logger.error("n2 is Zero");
      throw new Error("Zero division error");
    }

    if (n1 === NaN || n2 === NaN) {
      console.log();
      throw new Error("Parsing Error");
    }
    logger.info("Parameters " + n1 + " and " + n2 + " received for division");
    const result = div(n1, n2);
    res.status(200).json({ statuscocde: 200, data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscocde: 500, msg: error.toString() });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log("Service running on port: " + port);
});
