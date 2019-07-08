import winston from "winston";
import config from "../config";

export default class Logger {
  constructor () {
    this.logger = winston.createLogger(config.logger);
  }
  msgToString (msg) {
    if (msg instanceof Error) {
      return msg;
    } else if (typeof msg === "object") {
      return JSON.stringify(msg);
    } else {
      return msg;
    }
  }
  log () {
    Array.from(arguments).forEach(msg => {
      this.logger.log("info", this.msgToString(msg));
    });
  }
  info () {
    Array.from(arguments).forEach(msg => {
      this.logger.log("info", this.msgToString(msg));
    });
  }
  error () {
    Array.from(arguments).forEach(msg => {
      this.logger.log("error", this.msgToString(msg));
    });
  }
  debug () {
    Array.from(arguments).forEach(msg => {
      this.logger.log("debug", this.msgToString(msg));
    });
  }
  warn () {
    Array.from(arguments).forEach(msg => {
      this.logger.log("warn", this.msgToString(msg));
    });
  }
  silly () {
    Array.from(arguments).forEach(msg => {
      this.logger.log("silly", this.msgToString(msg));
    });
  }
  verbose () {
    Array.from(arguments).forEach(msg => {
      this.logger.log("verbose", this.msgToString(msg));
    });
  }
  profile (str) {
    this.logger.profile(str);
  }
}