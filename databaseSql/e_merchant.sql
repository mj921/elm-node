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

 Date: 25/07/2019 15:13:16
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
  `province_id` int(11) NOT NULL DEFAULT 0 COMMENT '省id',
  `city_id` int(11) NOT NULL DEFAULT 0 COMMENT '市id',
  `area_id` int(11) NOT NULL DEFAULT 0 COMMENT '区id',
  `area_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '省市区名称',
  `longitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '经度',
  `latitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '纬度',
  `position` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '定位地点',
  `logo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'logo',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商户手机号',
  `password` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '123456' COMMENT '商户登录密码',
  `score` decimal(11, 0) UNSIGNED ZEROFILL NULL DEFAULT 00000000000 COMMENT '商户评分',
  `status` tinyint(2) NOT NULL DEFAULT 0 COMMENT '状态 0 待审核 1 待开业 2 开业 3 休息 4 封禁 -1 审核不通过',
  `distribution_fee` decimal(11, 0) NOT NULL COMMENT '配送费',
  `start_distribution_fee` decimal(11, 0) NOT NULL COMMENT '起送费',
  `distribution_time` int(8) NULL DEFAULT 30 COMMENT '配送时间',
  `distance` int(8) NULL DEFAULT 1000 COMMENT '距离',
  `audit_remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '审核备注',
  `addtime` datetime(0) NOT NULL,
  `modifytime` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`, `status`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
