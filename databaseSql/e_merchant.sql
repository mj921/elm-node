/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : elm

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 09/07/2019 16:03:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for e_merchant
-- ----------------------------
DROP TABLE IF EXISTS `e_merchant`;
CREATE TABLE `e_merchant`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商户名',
  `address` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '地址',
  `logo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'logo',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商户手机号',
  `password` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '123456' COMMENT '商户登录密码',
  `status` tinyint(2) NOT NULL DEFAULT 0 COMMENT '状态 0 待审核 1 待开业 2 开业 3 休息 4 封禁 -1 审核不通过',
  `distribution_fee` double(255, 0) NOT NULL COMMENT '配送费',
  `start_distribution_fee` double(255, 0) NOT NULL COMMENT '起送费',
  `distribution_time` int(8) NULL DEFAULT 30 COMMENT '配送时间',
  `distance` int(8) NULL DEFAULT 1000 COMMENT '距离',
  `audit_remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '审核备注',
  `addtime` datetime(0) NOT NULL,
  `modifytime` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`, `status`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
