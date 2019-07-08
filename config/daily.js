'use strict';

import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import Util from '../lib/util'

module.exports = {
	domain: 'http://asset-daily.ycd360.cn',
	mysql: {
		host:'rds6vef326vef32o.mysql.rds.aliyuncs.com',
		port: 3306,
		user:'ycd360test',
        password:'N6yS1yQotRl8Hfa&n%BiPCpiz',
        database:'insight_dev'
	},
	logger: {
		levels: winston.config.syslog.levels,
		transports: [
			new winston.transports.Console(),
			new (winston.transports.DailyRotateFile)({
				filename: 'logs/risk-control-daily-%DATE%.log',
				datePattern: 'YYYY-MM-DD-HH',
				zippedArchive: true,
				maxSize: '20m',
				maxFiles: '14d'
			})
		],
		format: winston.format.combine(
			winston.format.timestamp(),
			winston.format.printf(info => {
				return `${Util.dateFmt(new Date(info.timestamp), "yyyy-MM-dd HH:mm:ss.S")} ${info.level}: ${info.message}`
			})
		),
		meta: false,
		msg: "{{req.method}} {{res.statusCode}} {{res.responseTime}}ms {{req.url}}",
		statusLevels: true
	}
}