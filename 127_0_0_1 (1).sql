-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2025 at 01:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kolaborate_devs`
--
CREATE DATABASE IF NOT EXISTS `kolaborate_devs` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `kolaborate_devs`;

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`skills`)),
  `experienceYears` int(11) DEFAULT NULL,
  `availableForWork` tinyint(1) DEFAULT 1,
  `hourlyRate` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `name`, `email`, `location`, `skills`, `experienceYears`, `availableForWork`, `hourlyRate`, `created_at`) VALUES
(1, 'Alice Johnson', 'alice@example.com', 'New York', '[\"React\",\"Node.js\",\"TypeScript\"]', 5, 1, 85.00, '2025-10-22 08:15:23'),
(2, 'Bob Smith', 'bob@example.com', 'San Francisco', '[\"Python\",\"Django\",\"PostgreSQL\"]', 3, 1, 75.00, '2025-10-22 08:15:23'),
(3, 'Carol Davis', 'carol@example.com', 'Remote', '[\"Vue.js\",\"JavaScript\",\"CSS\"]', 4, 0, 70.00, '2025-10-22 08:15:23'),
(4, 'David Wilson', 'david@example.com', 'Austin', '[\"Java\",\"Spring Boot\",\"MySQL\"]', 6, 1, 90.00, '2025-10-22 08:15:23'),
(5, 'Eva Brown', 'eva@example.com', 'Chicago', '[\"React\",\"GraphQL\",\"MongoDB\"]', 2, 1, 65.00, '2025-10-22 08:15:23'),
(6, 'Naana Shifah', 'nan@gmail.com', 'Gulu', '[\"React\"]', 2, 0, 23.00, '2025-10-22 11:03:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
