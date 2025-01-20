-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: daycare
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity` (
  `ActivityId` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ActivityId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (1,'Arts and Crafts','Creative activities with paper and colors'),(2,'Outdoor Play','Playtime in the playground'),(3,'Story Time','Reading stories to children'),(4,'Music and Movement','Dancing and singing activities'),(5,'Science Experiment','Simple science experiments for kids');
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity_calendar`
--

DROP TABLE IF EXISTS `activity_calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_calendar` (
  `CalendarId` int NOT NULL,
  `ActivityId` int NOT NULL,
  `TimeStart` datetime NOT NULL,
  `TimeEnd` datetime NOT NULL,
  PRIMARY KEY (`ActivityId`,`CalendarId`),
  KEY `CalendarId` (`CalendarId`),
  CONSTRAINT `activity_calendar_ibfk_1` FOREIGN KEY (`ActivityId`) REFERENCES `activity` (`ActivityId`),
  CONSTRAINT `activity_calendar_ibfk_2` FOREIGN KEY (`CalendarId`) REFERENCES `calendar` (`CalendarId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_calendar`
--

LOCK TABLES `activity_calendar` WRITE;
/*!40000 ALTER TABLE `activity_calendar` DISABLE KEYS */;
INSERT INTO `activity_calendar` VALUES (1,1,'2024-03-26 09:00:00','2024-03-26 09:30:00'),(2,2,'2024-03-26 10:00:00','2024-03-26 11:00:00'),(3,3,'2024-03-26 11:30:00','2024-03-26 12:00:00'),(4,4,'2024-03-26 13:00:00','2024-03-26 13:30:00'),(5,5,'2024-03-26 14:00:00','2024-03-26 15:00:00');
/*!40000 ALTER TABLE `activity_calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agegroup`
--

DROP TABLE IF EXISTS `agegroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agegroup` (
  `AgeGroupId` int NOT NULL AUTO_INCREMENT,
  `RangeG` varchar(50) NOT NULL,
  PRIMARY KEY (`AgeGroupId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agegroup`
--

LOCK TABLES `agegroup` WRITE;
/*!40000 ALTER TABLE `agegroup` DISABLE KEYS */;
INSERT INTO `agegroup` VALUES (1,'Infant'),(2,'Toddler'),(3,'Preschooler');
/*!40000 ALTER TABLE `agegroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `AttendanceId` int NOT NULL AUTO_INCREMENT,
  `Date` date DEFAULT NULL,
  `ChildId` int NOT NULL,
  `ClassId` int NOT NULL,
  `Present` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`AttendanceId`),
  KEY `ChildId` (`ChildId`),
  KEY `attendancet_ibfk_2_idx` (`ClassId`),
  CONSTRAINT `attendancet_ibfk_1` FOREIGN KEY (`ChildId`) REFERENCES `child` (`ChildId`) ON DELETE CASCADE,
  CONSTRAINT `attendancet_ibfk_2` FOREIGN KEY (`ClassId`) REFERENCES `class` (`ClassId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,'2024-01-01',1,1,1),(2,'2024-01-01',2,1,0),(3,'2024-01-01',3,2,1),(4,'2024-01-01',4,2,1);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calendar`
--

DROP TABLE IF EXISTS `calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendar` (
  `CalendarId` int NOT NULL AUTO_INCREMENT,
  `Date` date NOT NULL,
  PRIMARY KEY (`CalendarId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar`
--

LOCK TABLES `calendar` WRITE;
/*!40000 ALTER TABLE `calendar` DISABLE KEYS */;
INSERT INTO `calendar` VALUES (1,'2024-03-26'),(2,'2024-03-27'),(3,'2024-03-28'),(4,'2024-03-29'),(5,'2024-03-30');
/*!40000 ALTER TABLE `calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `child`
--

DROP TABLE IF EXISTS `child`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `child` (
  `ChildId` int NOT NULL AUTO_INCREMENT,
  `Birthday` date NOT NULL,
  `Gender` varchar(2) DEFAULT NULL,
  `Photo` varchar(255) DEFAULT NULL,
  `Allergies` varchar(255) DEFAULT NULL,
  `Vaccines` varchar(255) DEFAULT NULL,
  `Name` varchar(50) NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `Payments` decimal(10,2) NOT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ChildId`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child`
--

LOCK TABLES `child` WRITE;
/*!40000 ALTER TABLE `child` DISABLE KEYS */;
INSERT INTO `child` VALUES (1,'2015-02-03','Ma','child1.jpg','None','MMR, DTaP','Alex','Smith',200.00,1),(2,'2016-07-10','Fe','child2.jpg','Peanuts','DTaP','Sophia','Johnson',250.00,1),(3,'2017-12-25','Ma','child3.jpg','None','MMR','Noah','Williams',180.00,1),(4,'2018-06-30','Fe','child4.jpg','Milk','DTaP','Emma','Brown',220.00,1);
/*!40000 ALTER TABLE `child` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `child_parent`
--

DROP TABLE IF EXISTS `child_parent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `child_parent` (
  `ChildId` int NOT NULL,
  `ParentId` int NOT NULL,
  PRIMARY KEY (`ChildId`,`ParentId`),
  KEY `ParentId_idx` (`ParentId`),
  CONSTRAINT `ChildId` FOREIGN KEY (`ChildId`) REFERENCES `child` (`ChildId`) ON DELETE CASCADE,
  CONSTRAINT `ParentId` FOREIGN KEY (`ParentId`) REFERENCES `parent` (`ParentId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child_parent`
--

LOCK TABLES `child_parent` WRITE;
/*!40000 ALTER TABLE `child_parent` DISABLE KEYS */;
/*!40000 ALTER TABLE `child_parent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `ClassId` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `AgeGroupId` int DEFAULT NULL,
  PRIMARY KEY (`ClassId`),
  KEY `AgeGroupId` (`AgeGroupId`),
  CONSTRAINT `class_ibfk_1` FOREIGN KEY (`AgeGroupId`) REFERENCES `agegroup` (`AgeGroupId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'Toddlers',1),(2,'Preschool',2),(3,'Kindergarten',3),(4,'After School',4),(5,'Summer Camp',5);
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_child`
--

DROP TABLE IF EXISTS `class_child`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_child` (
  `ChildId` int NOT NULL,
  `ClassId` int NOT NULL,
  PRIMARY KEY (`ClassId`,`ChildId`),
  KEY `ChildId` (`ChildId`),
  CONSTRAINT `class_child_ibfk_1` FOREIGN KEY (`ChildId`) REFERENCES `child` (`ChildId`) ON DELETE CASCADE,
  CONSTRAINT `class_child_ibfk_2` FOREIGN KEY (`ClassId`) REFERENCES `class` (`ClassId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_child`
--

LOCK TABLES `class_child` WRITE;
/*!40000 ALTER TABLE `class_child` DISABLE KEYS */;
INSERT INTO `class_child` VALUES (1,1),(2,1),(3,2),(4,2);
/*!40000 ALTER TABLE `class_child` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactform`
--

DROP TABLE IF EXISTS `contactform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contactform` (
  `ContactFormId` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(100) NOT NULL,
  `Message` text NOT NULL,
  `DateCreated` datetime NOT NULL,
  `Subject` varchar(255) NOT NULL,
  PRIMARY KEY (`ContactFormId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactform`
--

LOCK TABLES `contactform` WRITE;
/*!40000 ALTER TABLE `contactform` DISABLE KEYS */;
INSERT INTO `contactform` VALUES (1,'parent1@example.com','I have a question about the upcoming field trip.','2024-03-26 10:00:00','Field Trip Inquiry'),(2,'parent2@example.com','I would like to schedule a meeting with my child\'s teacher.','2024-03-27 11:30:00','Parent-Teacher Meeting Request'),(3,'parent3@example.com','I need to update my contact information.','2024-03-28 14:45:00','Contact Information Update'),(4,'parent4@example.com','I want to enroll my child in the summer camp.','2024-03-29 16:20:00','Summer Camp Enrollment'),(5,'parent5@example.com','I have a suggestion for improving the daycare program.','2024-03-30 09:10:00','Program Improvement Suggestion');
/*!40000 ALTER TABLE `contactform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `EventId` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`EventId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'Parent-Teacher Conference','Meeting between parents and teachers'),(2,'Holiday Party','Celebration of holidays with games and food'),(3,'Field Trip','Educational outing to a museum'),(4,'Sports Day','Day of sports and games'),(5,'Graduation Ceremony','Ceremony for graduating students');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_calendar`
--

DROP TABLE IF EXISTS `event_calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_calendar` (
  `CalendarId` int NOT NULL,
  `EventId` int NOT NULL,
  `TimeStart` datetime NOT NULL,
  `TimeEnd` datetime NOT NULL,
  PRIMARY KEY (`EventId`,`CalendarId`),
  KEY `CalendarId` (`CalendarId`),
  CONSTRAINT `event_calendar_ibfk_1` FOREIGN KEY (`EventId`) REFERENCES `event` (`EventId`),
  CONSTRAINT `event_calendar_ibfk_2` FOREIGN KEY (`CalendarId`) REFERENCES `calendar` (`CalendarId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_calendar`
--

LOCK TABLES `event_calendar` WRITE;
/*!40000 ALTER TABLE `event_calendar` DISABLE KEYS */;
INSERT INTO `event_calendar` VALUES (1,1,'2024-04-01 18:00:00','2024-04-01 19:00:00'),(2,2,'2024-05-15 10:00:00','2024-05-15 12:00:00'),(3,3,'2024-06-20 08:00:00','2024-06-20 16:00:00'),(4,4,'2024-07-10 14:00:00','2024-07-10 15:00:00'),(5,5,'2024-08-05 09:00:00','2024-08-05 17:00:00');
/*!40000 ALTER TABLE `event_calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food` (
  `FoodId` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Allergens` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`FoodId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (1,'Apple','Fresh apple','None'),(2,'Milk','Whole milk','Lactose'),(3,'Chicken','Grilled chicken breast','None'),(4,'Pasta','Spaghetti with tomato sauce','Gluten'),(5,'Banana','Fresh banana','None');
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_calendar_meal`
--

DROP TABLE IF EXISTS `food_calendar_meal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_calendar_meal` (
  `CalendarId` int NOT NULL,
  `MealId` int NOT NULL,
  `FoodId` int DEFAULT NULL,
  `TimeStart` datetime NOT NULL,
  `TimeEnd` datetime NOT NULL,
  PRIMARY KEY (`MealId`,`CalendarId`),
  KEY `FoodId` (`FoodId`),
  KEY `CalendarId` (`CalendarId`),
  CONSTRAINT `food_calendar_meal_ibfk_1` FOREIGN KEY (`MealId`) REFERENCES `meal` (`MealId`),
  CONSTRAINT `food_calendar_meal_ibfk_2` FOREIGN KEY (`FoodId`) REFERENCES `food` (`FoodId`),
  CONSTRAINT `food_calendar_meal_ibfk_3` FOREIGN KEY (`CalendarId`) REFERENCES `calendar` (`CalendarId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_calendar_meal`
--

LOCK TABLES `food_calendar_meal` WRITE;
/*!40000 ALTER TABLE `food_calendar_meal` DISABLE KEYS */;
INSERT INTO `food_calendar_meal` VALUES (1,1,1,'2024-03-26 08:00:00','2024-03-26 08:30:00'),(2,2,2,'2024-03-26 12:00:00','2024-03-26 12:30:00'),(3,3,3,'2024-03-26 16:00:00','2024-03-26 16:30:00'),(4,4,4,'2024-03-26 18:00:00','2024-03-26 18:30:00'),(5,5,5,'2024-03-26 20:00:00','2024-03-26 20:30:00');
/*!40000 ALTER TABLE `food_calendar_meal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meal`
--

DROP TABLE IF EXISTS `meal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meal` (
  `MealId` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  PRIMARY KEY (`MealId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meal`
--

LOCK TABLES `meal` WRITE;
/*!40000 ALTER TABLE `meal` DISABLE KEYS */;
INSERT INTO `meal` VALUES (1,'Breakfast'),(2,'Lunch'),(3,'Dinner'),(4,'Snack'),(5,'Brunch');
/*!40000 ALTER TABLE `meal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parent`
--

DROP TABLE IF EXISTS `parent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parent` (
  `ParentId` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `Birthday` date NOT NULL,
  `Gender` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `PhoneNumber` varchar(20) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ParentId`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `PhoneNumber` (`PhoneNumber`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent`
--

LOCK TABLES `parent` WRITE;
/*!40000 ALTER TABLE `parent` DISABLE KEYS */;
INSERT INTO `parent` VALUES (1,'Dea','Fetahu','1990-09-24','Female','dea.fetahu@example.com','123 Main St','1234567890','deafetahu','password',1),(2,'Elsa','Tomaj','1992-08-12','Female','elsa.tomaj@example.com','456 Elm St','9876543210','elsatomaj','password',1),(3,'Marjeta','Ramaj','1992-09-06','Female','marjeta.ramaj@example.com','789 Oak St','4567890123','marjetaramaj','password',1),(4,'Erblin','Ymeri','1988-03-25','Male','erblin.ymeri@example.com','101 Pine St','7890123456','erblinymeri','password',1),(5,'Butrint','Reqica','1983-11-05','Male','butrint.reqica@example.com','202 Maple St','2345678901','butrintreqica','password',1),(14,'Risk of Rain 2','tst','2024-04-18','Male','erbliny22@gmail.com','asdf','76547853865','admin_dune@gmail.com','123admin!@#',1);
/*!40000 ALTER TABLE `parent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `PaymentId` int NOT NULL AUTO_INCREMENT,
  `ChildId` int NOT NULL,
  `ParentId` int NOT NULL,
  `Date` datetime DEFAULT NULL,
  `Amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`PaymentId`),
  KEY `ChildId` (`ChildId`),
  KEY `ParentId` (`ParentId`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`ChildId`) REFERENCES `child` (`ChildId`) ON DELETE CASCADE,
  CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`ParentId`) REFERENCES `parent` (`ParentId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,1,1,'2024-03-26 10:00:00',50.00),(2,2,2,'2024-03-26 11:00:00',60.00),(3,3,3,'2024-03-26 12:00:00',70.00),(4,4,4,'2024-03-26 13:00:00',80.00);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `raport`
--

DROP TABLE IF EXISTS `raport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `raport` (
  `RaportId` int NOT NULL AUTO_INCREMENT,
  `Description` text NOT NULL,
  `ChildId` int NOT NULL,
  PRIMARY KEY (`RaportId`),
  KEY `ChildId` (`ChildId`),
  CONSTRAINT `raport_ibfk_1` FOREIGN KEY (`ChildId`) REFERENCES `child` (`ChildId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raport`
--

LOCK TABLES `raport` WRITE;
/*!40000 ALTER TABLE `raport` DISABLE KEYS */;
INSERT INTO `raport` VALUES (1,'Had a great day today!',1),(2,'Ate lunch very quickly',2),(3,'Participated in all activities',3),(4,'Got a bit upset during snack time',4);
/*!40000 ALTER TABLE `raport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `StaffId` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Surname` varchar(45) NOT NULL,
  `Birthday` date NOT NULL,
  `Gender` varchar(45) DEFAULT NULL,
  `Email` varchar(100) NOT NULL,
  `PhoneNumber` varchar(20) NOT NULL,
  `Role` varchar(45) NOT NULL,
  `Username` varchar(45) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Password` varchar(255) NOT NULL,
  PRIMARY KEY (`StaffId`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `PhoneNumber` (`PhoneNumber`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'John','Doe','1970-01-15','Male','john.doe@example.com','5551234567','Admin','johndoe','321 Pine St','password'),(2,'Mary','Smith','1985-08-20','Female','mary.smith@example.com','5552345678','Teacher','marysmith','456 Elm St','password'),(3,'David','Brown','1982-04-10','Male','david.brown@example.com','5553456789','Teacher','davidbrown','789 Oak St','password'),(4,'Sarah','Johnson','1978-12-05','Female','sarah.johnson@example.com','5554567890','Teacher','sarahjohnson','101 Pine St','password'),(5,'Michael','Williams','1990-03-30','Male','michael.williams@example.com','5555678901','Teacher','michaelwilliams','202 Maple St','password');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_class`
--

DROP TABLE IF EXISTS `staff_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_class` (
  `StaffId` int NOT NULL,
  `ClassId` int NOT NULL,
  PRIMARY KEY (`StaffId`,`ClassId`),
  KEY `ClassId_idx` (`ClassId`),
  CONSTRAINT `ClassId` FOREIGN KEY (`ClassId`) REFERENCES `class` (`ClassId`) ON DELETE CASCADE,
  CONSTRAINT `StaffId` FOREIGN KEY (`StaffId`) REFERENCES `staff` (`StaffId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_class`
--

LOCK TABLES `staff_class` WRITE;
/*!40000 ALTER TABLE `staff_class` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff_class` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-05 12:39:18
