import express from "express";
import config from "./config";
import router from "./routes/v1/index";
import cookieParser from "cookie-parser";
import session from "express-session";
import expressWinston from "express-winston";
import history from "connect-history-api-fallback";
import chalk from "chalk";
import bodyParser from "body-parser";
import Logger from "./lib/logger.js";
import ServiceError from "./lib/ServiceError.js";

const app = express();
const expressLogger = expressWinston.logger(config.logger);
const logger = new Logger();

app.use(expressLogger);

app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true
}));

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.Origin || req.headers.origin || "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", "3.2.1");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
router(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) { // eslint-disable-line
  logger.error(err.stack);
  if (err instanceof ServiceError) {
    res.json({
      success: false,
      data: null,
      code: err.code,
      message: err.message
    });
  } else {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500).json({
      success: false,
      message: err.message
    });
  }
});

app.use(history());
app.use(express.static("./public"));
app.listen(config.port, () => {
  console.log(
    chalk.green(`成功监听端口：${config.port}`)
  );
});
