import mysql from "mysql";
import config from "../config";
import async from "async";
import Logger from "../lib/logger";

const logger = new Logger();

var mysqlPool = mysql.createPool(config.mysql);
/** 普通连接 */
export const getConnect = function (sql, option) {
  return new Promise((resolve, reject) => {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        try {
          logger.log(sql, option);
          logger.log(parseSql(sql, option));
        } catch(err) {
          reject(err);
        }
        connection.query(sql, option, (err, result) => {
          if (err) {
            reject(err);
          } else {
            var string = JSON.stringify(result);
            var data = JSON.parse(string);
            resolve(data);
          }
          // 结束会话
          connection.release();
        });
      }
    });
  });
};
/** 事务连接 */
export const getTransactionsConnect = function (processList) {
  return new Promise((resolve, reject) => {
    mysqlPool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      }
      connection.beginTransaction(function(err) {
        if (err) {
          reject(err);
        }
        var taskArr = [];
        processList.forEach((pro, i) => {
          taskArr.push(function(callback) {
            try {
              logger.log(pro.sql, pro.options);
              logger.log(parseSql(pro.sql, pro.options));
            } catch(err) {
              reject(err);
              connection.rollback(function() {
                logger.error("出现错误,回滚!");
                //释放资源
                connection.release();
                reject(err);
              });
              return;
            }
            connection.query(pro.sql, pro.options, function(err, result) {
              if (err) {
                callback(err, null);
                reject(err);
                return;
              }
              logger.log("第" + i + "次执行成功!");
              try {
                pro.callback && pro.callback(result, err);
              } catch (err) {
                reject(err);
                connection.rollback(function() {
                  logger.error("出现错误,回滚!");
                  //释放资源
                  connection.release();
                  reject(err);
                });
                return;
              }
              callback(null, result);
            });
          });
        });
        async.series(taskArr, function(err){
          if (err) {
            reject(err);
            //回滚
            connection.rollback(function() {
              logger.error("出现错误,回滚!");
              //释放资源
              connection.release();
              reject(err);
            });
            return;
          }
          //提交
          connection.commit(function(err) {
            if (err) {
              reject(err);
              return;
            }
            resolve();
            logger.log("成功,提交!");
            //释放资源
            connection.release();
          });
        });
      });
    });
  });
};

const parseSql = (sql, option) => {
  try {
    option.forEach(item => {
      sql = sql.replace("?", item);
    });
    return sql;
  } catch(err) {
    throw new Error("sql解析错误");
  }
};