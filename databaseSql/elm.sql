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

 Date: 30/07/2019 16:31:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for e_address
-- ----------------------------
DROP TABLE IF EXISTS `e_address`;
CREATE TABLE `e_address`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '联系电话',
  `province` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '省',
  `city` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '市',
  `area` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '区',
  `area_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '省市区名称',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '收货人姓名',
  `position` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '定位地点',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '详细地址',
  `latitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '纬度',
  `longitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '经度',
  `default_flag` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否默认地址',
  `addtime` datetime(0) NOT NULL,
  `modifytime` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for e_area
-- ----------------------------
DROP TABLE IF EXISTS `e_area`;
CREATE TABLE `e_area`  (
  `id` int(11) NOT NULL,
  `code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '地区编码',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '地区名',
  `level` tinyint(4) NULL DEFAULT -1 COMMENT '地区级别（1:省份province,2:市city,3:区县district,4:街道street）',
  `city_code` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '城市编码',
  `center` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '城市中心点（即：经纬度坐标）',
  `parent_id` int(20) NULL DEFAULT -1 COMMENT '地区父节点',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `areaCode`(`code`) USING BTREE,
  INDEX `parentId`(`parent_id`) USING BTREE,
  INDEX `level`(`level`) USING BTREE,
  INDEX `areaName`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '地区码表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for e_areas
-- ----------------------------
DROP TABLE IF EXISTS `e_areas`;
CREATE TABLE `e_areas`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `areaid` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '区县编码',
  `area` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '区县名称',
  `cityid` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '所属城市编码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3145 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '区县信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for e_cities
-- ----------------------------
DROP TABLE IF EXISTS `e_cities`;
CREATE TABLE `e_cities`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `cityid` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '城市编码',
  `city` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '城市名称',
  `provinceid` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '所属省份编码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 346 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '城市信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for e_dish
-- ----------------------------
DROP TABLE IF EXISTS `e_dish`;
CREATE TABLE `e_dish`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `merchant_id` int(11) NOT NULL COMMENT '商户id',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜品名称',
  `price` decimal(10, 2) NOT NULL COMMENT '菜品价格',
  `type` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜品类别',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜品图片',
  `introduce` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '菜品描述',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '状态 0 下架 1 上架',
  `addtime` datetime(0) NOT NULL,
  `modifytime` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for e_evaluate
-- ----------------------------
DROP TABLE IF EXISTS `e_evaluate`;
CREATE TABLE `e_evaluate`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `merchant_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `score` int(11) NOT NULL DEFAULT 5 COMMENT '评价分数',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '评价内容',
  `addtime` datetime(0) NOT NULL,
  `modifytime` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

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

-- ----------------------------
-- Table structure for e_order
-- ----------------------------
DROP TABLE IF EXISTS `e_order`;
CREATE TABLE `e_order`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `merchant_id` int(11) NOT NULL COMMENT '商户id',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `address_id` int(11) NOT NULL COMMENT '地址id',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户手机号',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '地址',
  `price` decimal(10, 2) NOT NULL COMMENT '总价',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '备注',
  `status` tinyint(2) NOT NULL DEFAULT 0 COMMENT '订单状态 0 待接单 1 已接单 2 配送中 3 已完成 -1 已取消',
  `addtime` datetime(0) NOT NULL COMMENT '下单时间',
  `finishtime` datetime(0) NULL DEFAULT NULL COMMENT '完成时间',
  `modifytime` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for e_order_dish
-- ----------------------------
DROP TABLE IF EXISTS `e_order_dish`;
CREATE TABLE `e_order_dish`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL COMMENT '订单id',
  `dish_id` int(11) NOT NULL COMMENT '菜品id',
  `merchant_id` int(11) NOT NULL COMMENT '商户id',
  `num` int(11) NOT NULL DEFAULT 1 COMMENT '数量',
  `price` decimal(10, 2) NOT NULL COMMENT '单价',
  `addtime` datetime(0) NOT NULL,
  `modifytime` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for e_provinces
-- ----------------------------
DROP TABLE IF EXISTS `e_provinces`;
CREATE TABLE `e_provinces`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provinceid` int(11) NOT NULL,
  `province` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 392 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for e_user
-- ----------------------------
DROP TABLE IF EXISTS `e_user`;
CREATE TABLE `e_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '手机号',
  `password` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '登录密码',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0 冻结 1 正常',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '头像',
  `addtime` datetime(0) NOT NULL,
  `modifytime` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Procedure structure for setDefaultAddress
-- ----------------------------
DROP PROCEDURE IF EXISTS `setDefaultAddress`;
delimiter ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `setDefaultAddress`(IN `address_user_id` int,IN `address_id` int)
BEGIN
	#Routine body goes here...
	UPDATE e_address SET default_flag = 0 WHERE user_id = address_user_id;
	UPDATE e_address SET default_flag=1 WHERE id = address_id;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
