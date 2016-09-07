/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50713
 Source Host           : localhost
 Source Database       : hocodo_admin

 Target Server Type    : MySQL
 Target Server Version : 50713
 File Encoding         : utf-8

 Date: 09/07/2016 10:36:47 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `ae`
-- ----------------------------
DROP TABLE IF EXISTS `ae`;
CREATE TABLE `ae` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(10) NOT NULL COMMENT '姓名',
  `enname` varchar(15) DEFAULT NULL COMMENT '英文名称 ',
  `phone` varchar(11) NOT NULL COMMENT '电话号码 ',
  `serviceid` int(11) NOT NULL COMMENT '服务机构ID',
  `created` datetime DEFAULT NULL COMMENT '创建时间 ',
  PRIMARY KEY (`id`),
  KEY `serviceid` (`serviceid`),
  CONSTRAINT `serviceid` FOREIGN KEY (`serviceid`) REFERENCES `service` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `project`
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(50) NOT NULL COMMENT '项目名称 ',
  `serviceid` int(11) DEFAULT NULL COMMENT '所属服务机构',
  `description` varchar(100) DEFAULT NULL,
  `status` int(5) DEFAULT '0' COMMENT '项目状态：0、未开始 1、进行中 2、已结束',
  `created` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `serviceid` (`serviceid`),
  CONSTRAINT `sid` FOREIGN KEY (`serviceid`) REFERENCES `service` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='项目总目录';

-- ----------------------------
--  Table structure for `project_line`
-- ----------------------------
DROP TABLE IF EXISTS `project_line`;
CREATE TABLE `project_line` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '项目流水ID',
  `title` varchar(100) NOT NULL COMMENT '项目流水标题',
  `pid` int(11) NOT NULL COMMENT '所属项目ID',
  `aeid` int(11) NOT NULL COMMENT '项目AE',
  `startTime` datetime NOT NULL COMMENT '开始时间 ',
  `endTime` datetime NOT NULL COMMENT '结束时间 ',
  `useHour` double NOT NULL COMMENT '项目耗时',
  `charge` varchar(10) NOT NULL COMMENT '负责人姓名',
  `created` datetime DEFAULT NULL COMMENT '创建时间 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='项目流水';

-- ----------------------------
--  Table structure for `project_line_desc`
-- ----------------------------
DROP TABLE IF EXISTS `project_line_desc`;
CREATE TABLE `project_line_desc` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水描述ID',
  `text` text NOT NULL COMMENT '描述文字 ',
  `money` double DEFAULT '0' COMMENT '价格',
  `status` int(5) DEFAULT '2' COMMENT '任务状态 ：1、未开始  2、进行中 3、已结束 ',
  `plineid` int(11) NOT NULL COMMENT 'project_line ID',
  `created` datetime DEFAULT NULL COMMENT '创建时间 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `service`
-- ----------------------------
DROP TABLE IF EXISTS `service`;
CREATE TABLE `service` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(100) NOT NULL COMMENT '机构名称 ',
  `desc` varchar(255) DEFAULT NULL COMMENT '机构描述',
  `created` datetime DEFAULT NULL COMMENT '创建时间 ',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `username` varchar(32) DEFAULT NULL COMMENT '用户名',
  `password` varchar(32) DEFAULT NULL COMMENT '密码',
  `status` int(10) DEFAULT NULL COMMENT '账号状态  0：销毁 1: 正常 2：冻结 ',
  `name` varchar(10) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
