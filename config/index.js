"use strict";
import process from "process";

let config = {};
switch (process.env.NODE_ENV) {
  case "development":
    config = require("./development");
    break;
  case "daily":
    config = require("./daily");
    break;
}

export default {
  port: 8001,
  page: {
    current: 1,
    pageSize: 10
  },
  accessKey: "OBDhZ5Z0QMeaJotHlenFM2W7M9IPTpj9HFvS67CB",
  secretKey: "c3F4cEztOTGen-Sx4qOmSB7kCxOTLaJsrEmivfyF",
  ...config
};

