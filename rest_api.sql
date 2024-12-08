-- -- Active: 1733563944704@@127.0.0.1@3306@rest_api
-- -- MySQL dump 10.13  Distrib 8.0.39, for macos14 (x86_64)
-- --
-- -- Host: localhost    Database: rest_api
-- -- ------------------------------------------------------
-- -- Server version	8.0.39

-- /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
-- /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
-- /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
-- /*!50503 SET NAMES utf8mb4 */;
-- /*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
-- /*!40103 SET TIME_ZONE='+00:00' */;
-- /*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
-- /*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
-- /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- --
-- -- Table structure for table `transactions`
-- --

-- DROP TABLE IF EXISTS `transactions`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `transactions` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `user_id` int NOT NULL,
--   `type` enum('topup','payment') NOT NULL,
--   `service_name` varchar(100) DEFAULT NULL,
--   `amount` decimal(10,2) NOT NULL,
--   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`),
--   KEY `user_id` (`user_id`),
--   CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;

-- --
-- -- Dumping data for table `transactions`
-- --

-- LOCK TABLES `transactions` WRITE;
-- /*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
-- INSERT INTO `transactions` VALUES (1,8,'payment','Subscription',50.00,'2024-12-08 06:34:41'),(2,8,'payment','Bmw',500.00,'2024-12-08 06:39:53'),(3,8,'payment','marce',100.00,'2024-12-08 06:55:45');
-- /*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
-- UNLOCK TABLES;

-- --
-- -- Table structure for table `users`
-- --

-- DROP TABLE IF EXISTS `users`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `users` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `username` varchar(50) NOT NULL,
--   `password` varchar(255) NOT NULL,
--   `balance` decimal(10,2) DEFAULT '0.00',
--   `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
--   `email` varchar(255) NOT NULL,
--   PRIMARY KEY (`id`),
--   UNIQUE KEY `username` (`username`),
--   UNIQUE KEY `email` (`email`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;

-- --
-- -- Dumping data for table `users`
-- --

-- LOCK TABLES `users` WRITE;
-- /*!40000 ALTER TABLE `users` DISABLE KEYS */;
-- INSERT INTO `users` VALUES (1,'ee','$2b$10$DI0ucMdiTprB.zWGpyisyehYPxRF/.rDq9Y4od0zAbzA3EQg5YhHi',0.00,'2024-12-08 05:56:22','aedng'),(2,'a1','$2b$10$L7QxbJY4lM1NRbjLFJcs.OLxmgjYbkQFVfOurBZ9pWhL2GCMlx5me',0.00,'2024-12-08 05:57:56','a@gmail.com'),(3,'user1','$2b$10$whyAyEbSNMu7zK8vjpC8o.S6vuo3ieDiiCHHCV9v4cKyl80dWFnai',0.00,'2024-12-08 06:03:10','user1@example.com'),(5,'detol','$2b$10$3uWyvpW9lAE72gnw1kSi/uLfAzeozRswHY/J9ROYnzov/Hmj1ZrmC',0.00,'2024-12-08 06:03:45','use1r1@example.com'),(7,'asa1','$2b$10$YdkitSr0sgcD8kBkM9Kmt.SX2kuxybAiofQnAnJxfdQRBFhWwf0h.',0.00,'2024-12-08 06:06:09','a@gmdsaail.com'),(8,'11','$2b$10$eXAXkswRAY6KYVsBAhCgGeO1Vs6LqzavZBVWxTxjieSf3Yvm18GKO',400.00,'2024-12-08 06:25:12','11.com'),(9,'elv','$2b$10$BWXhpMtK3AvCa2elkqtQXeM3zZdy.qP1wjYdbrpeEM0OgISQ95C8q',0.00,'2024-12-08 07:18:08','elv@gmail.com');
-- /*!40000 ALTER TABLE `users` ENABLE KEYS */;
-- UNLOCK TABLES;
-- /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

-- /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
-- /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
-- /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- -- Dump completed on 2024-12-08 16:55:56
