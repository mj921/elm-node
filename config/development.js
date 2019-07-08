"use strict";

import winston from "winston";
import Util from "../lib/util";
import mysqlConfig from "./mysql.dev";

module.exports = {
  // domain: 'http://asset-daily.ycd360.cn',
  domain: "http://localhost",
  mysql: mysqlConfig,
  logger: {
    levels: winston.config.syslog.levels,
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(info => {
        return `${Util.dateFmt(new Date(info.timestamp), "yyyy-MM-dd HH:mm:ss.S")} ${info.level}: ${info.message}`;
      })
    ),
    meta: false,
    msg: "{{req.method}} {{res.statusCode}} {{res.responseTime}}ms {{req.url}}",
    colorize: true,
    statusLevels: true
  }
  // domain: 'http://localhost:8080',
  // mysql: {
  // 	host:'localhost',
  // 	port: 3306,
  // 	user:'root',
  //   password:'e3223e569',
  //   database:'riskcontrol'
  // }
};
