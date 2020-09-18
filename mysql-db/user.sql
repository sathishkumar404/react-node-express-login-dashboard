-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2019 at 11:05 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 5.6.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bizky`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `employeeCount` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `phone`, `employeeCount`, `created_at`, `active`) VALUES
(30, 'Kumar', 'admin@gmail.com', '123456', 98934431, 1, '2019-10-11 11:10:41', 1),
(31, 'Edwin', 'edwin@gmail.com', '123456', 9786252624, 1, '2019-10-11 11:12:22', 1),
(32, 'sathi', 'ad3min@gmail.com', '534', 534, 1, '2019-10-11 11:15:05', 1),
(33, 'test', 'test@gmail.com', '123456', 534534, 1, '2019-10-11 11:23:00', 1),
(34, 'fsdfd', 'test4@gmail.com', '123456', 34543, 1, '2019-10-11 11:29:15', 1),
(35, 'fdsfsd', 'ok@gmail.com', '1537245372', 534543, 1, '2019-10-11 11:35:04', 1),
(36, 'sakthi', 'admi4n@gmail.com', '5345', 543, 1, '2019-10-11 11:45:30', 1),
(37, 'sfjsl', 'sfhsdlfhsd@gmail.com', '64645', 64, 1, '2019-10-11 11:46:49', 1),
(38, 'zippy', 'zippy@gmail.com', '123456', 435435, 1, '2019-10-14 06:10:32', 1),
(39, 'sridhar', 'sri@mail.com', '123456', 123456, 1, '2019-10-15 08:03:57', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
