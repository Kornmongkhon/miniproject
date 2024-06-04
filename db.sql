-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 24, 2024 at 04:23 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `newnatdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `apprentice`
--

CREATE TABLE `apprentice` (
  `appren_id` int(11) NOT NULL,
  `appren_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `checkin`
--

CREATE TABLE `checkin` (
  `chin_id` int(11) NOT NULL,
  `chin_student` varchar(200) NOT NULL,
  `chin_date` varchar(20) NOT NULL,
  `chin_time` varchar(20) NOT NULL,
  `chin_place` varchar(50) NOT NULL,
  `locain` varchar(100) NOT NULL,
  `chin_latitude` varchar(50) NOT NULL,
  `chin_longitude` varchar(50) NOT NULL,
  `dateCreatein` datetime NOT NULL DEFAULT current_timestamp(),
  `isLate` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `checkin`
--

INSERT INTO `checkin` (`chin_id`, `chin_student`, `chin_date`, `chin_time`, `chin_place`, `locain`, `chin_latitude`, `chin_longitude`, `dateCreatein`, `isLate`) VALUES
(25, 'นัทโตะ', '19 พฤษภาคม 2567', '15:43:50', 'TK Park', '155 Soi Rattanathibech 38, Tambon Bang Kraso, Amphoe Mueang Nonthaburi, Chang Wat Nonthaburi 11000, ', '13.8744674', '100.4858756', '2024-05-19 15:43:51', 0),
(26, 'นิว', '19 พฤษภาคม 2567', '16:05:18', 'TK Park', '155 Soi Rattanathibech 38, Tambon Bang Kraso, Amphoe Mueang Nonthaburi, Chang Wat Nonthaburi 11000, ', '13.8744707', '100.4858692', '2024-05-19 16:05:18', 0),
(27, 'พีม', '19 พฤษภาคม 2567', '19:19:08', 'TK Park', '155 Soi Rattanathibech 38, Tambon Bang Kraso, Amphoe Mueang Nonthaburi, Chang Wat Nonthaburi 11000, ', '13.8744623', '100.4858773', '2024-05-19 19:19:08', 0),
(28, 'peem', '19 พฤษภาคม 2567', '21:07:06', 'TK Park', '155 Soi Rattanathibech 38, Tambon Bang Kraso, Amphoe Mueang Nonthaburi, Chang Wat Nonthaburi 11000, ', '13.8744755', '100.4858677', '2024-05-19 21:07:06', 0),
(31, 'พศวัต วัดวิทยาคุณ (พีม)', '19 พฤษภาคม 2567', '21:13:13', 'TK Park', '155 Soi Rattanathibech 38, Tambon Bang Kraso, Amphoe Mueang Nonthaburi, Chang Wat Nonthaburi 11000, ', '13.8744716', '100.4858738', '2024-05-19 21:13:14', 0),
(32, 'พศวัต วัดวิทยาคุณ (พีม)', '22 พฤษภาคม 2567', '15:38:16', 'TK Park', 'VFPX+MPF, Ta Sai, Mueang Nonthaburi District, Nonthaburi 11000, Thailand', '13.8870784', '100.499456', '2024-05-22 15:38:16', 0),
(41, 'นัทโตะ', '23 พฤษภาคม 2567', '18:59:14', 'สำนักงานปลัดกระทรวงพลังงาน', 'VFPX+MPF, Ta Sai, Mueang Nonthaburi District, Nonthaburi 11000, Thailand', '13.8870784', '100.499456', '2024-05-23 18:59:14', 1),
(42, 'พีม', '23 พฤษภาคม 2567', '19:02:10', 'องค์การสงเคราะห์ทหารผ่านศึก', 'VFPX+MPF, Ta Sai, Mueang Nonthaburi District, Nonthaburi 11000, Thailand', '13.8870784', '100.499456', '2024-05-23 19:02:10', 1),
(43, 'พศวัต วัดวิทยาคุณ (พีม)', '23 พฤษภาคม 2567', '19:02:40', 'ITBT Corporation', 'VFPX+MPF, Ta Sai, Mueang Nonthaburi District, Nonthaburi 11000, Thailand', '13.8870784', '100.499456', '2024-05-23 19:02:40', 1);

-- --------------------------------------------------------

--
-- Table structure for table `checkout`
--

CREATE TABLE `checkout` (
  `chout_id` int(11) NOT NULL,
  `chout_student` varchar(200) NOT NULL,
  `chout_date` varchar(20) NOT NULL,
  `chout_time` varchar(20) NOT NULL,
  `chout_place` varchar(50) NOT NULL,
  `locaout` varchar(200) NOT NULL,
  `chout_latitude` varchar(50) NOT NULL,
  `chout_longitude` varchar(50) NOT NULL,
  `dateCreateout` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `checkout`
--

INSERT INTO `checkout` (`chout_id`, `chout_student`, `chout_date`, `chout_time`, `chout_place`, `locaout`, `chout_latitude`, `chout_longitude`, `dateCreateout`) VALUES
(13, 'นัทโตะ', '19 พฤษภาคม 2567', '15:43:51', 'TK Park', 'ฟหหกฟกฟกหหกฟหฟกฟห', '13.8744674', '100.4858756', '2024-05-19 15:43:52'),
(14, 'นิว', '19 พฤษภาคม 2567', '16:07:50', 'TK Park', '155 Soi Rattanathibech 38, Tambon Bang Kraso, Amphoe Mueang Nonthaburi, Chang Wat Nonthaburi 11000, Thailand', '13.8744707', '100.4858692', '2024-05-19 16:07:50'),
(15, 'พีม', '19 พฤษภาคม 2567', '19:19:20', 'TK Park', '155 Soi Rattanathibech 38, Tambon Bang Kraso, Amphoe Mueang Nonthaburi, Chang Wat Nonthaburi 11000, Thailand', '13.8744623', '100.4858773', '2024-05-19 19:19:20'),
(16, 'peem', '19 พฤษภาคม 2567', '21:07:24', 'TK Park', '155 Soi Rattanathibech 38, Tambon Bang Kraso, Amphoe Mueang Nonthaburi, Chang Wat Nonthaburi 11000, Thailand', '13.8744755', '100.4858677', '2024-05-19 21:07:25'),
(17, 'พศวัต วัดวิทยาคุณ (พีม)', '19 พฤษภาคม 2567', '21:13:24', 'TK Park', '155 Soi Rattanathibech 38, Tambon Bang Kraso, Amphoe Mueang Nonthaburi, Chang Wat Nonthaburi 11000, Thailand', '13.8744716', '100.4858738', '2024-05-19 21:13:24'),
(18, 'พศวัต วัดวิทยาคุณ (พีม)', '22 พฤษภาคม 2567', '15:38:31', 'TK Park', 'VFPX+MPF, Ta Sai, Mueang Nonthaburi District, Nonthaburi 11000, Thailand', '13.8870784', '100.499456', '2024-05-22 15:38:31'),
(27, 'นัทโตะ', '23 พฤษภาคม 2567', '19:00:56', 'สำนักงานปลัดกระทรวงพลังงาน', 'VFPX+MPF, Ta Sai, Mueang Nonthaburi District, Nonthaburi 11000, Thailand', '13.8870784', '100.499456', '2024-05-23 19:00:56'),
(28, 'พีม', '23 พฤษภาคม 2567', '19:02:18', 'องค์การสงเคราะห์ทหารผ่านศึก', 'VFPX+MPF, Ta Sai, Mueang Nonthaburi District, Nonthaburi 11000, Thailand', '13.8870784', '100.499456', '2024-05-23 19:02:18'),
(29, 'พศวัต วัดวิทยาคุณ (พีม)', '23 พฤษภาคม 2567', '19:02:48', 'ITBT Corporation', 'VFPX+MPF, Ta Sai, Mueang Nonthaburi District, Nonthaburi 11000, Thailand', '13.8870784', '100.499456', '2024-05-23 19:02:48');

-- --------------------------------------------------------

--
-- Table structure for table `checkwork`
--

CREATE TABLE `checkwork` (
  `chw_id` int(11) NOT NULL,
  `appren_id` int(11) NOT NULL,
  `chin_id` int(11) NOT NULL,
  `chout_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leave`
--

CREATE TABLE `leave` (
  `leave_id` int(11) NOT NULL,
  `leave_date` date NOT NULL,
  `leave_time` time NOT NULL,
  `leave_file` varchar(100) NOT NULL,
  `leave_note` varchar(100) NOT NULL,
  `localeave_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leavework`
--

CREATE TABLE `leavework` (
  `leavework_id` int(11) NOT NULL,
  `leavework_std` varchar(50) NOT NULL,
  `leavework_date` varchar(50) NOT NULL,
  `dateCreate` datetime NOT NULL DEFAULT current_timestamp(),
  `leavework_detail` varchar(300) NOT NULL,
  `leavework_path` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `leavework`
--

INSERT INTO `leavework` (`leavework_id`, `leavework_std`, `leavework_date`, `dateCreate`, `leavework_detail`, `leavework_path`) VALUES
(3, 'นัทโตะ', '19 พฤษภาคม 2567', '2024-05-19 19:06:07', 'ก่อนจะสายไป', 'นัทโตะ_2024-05-19_ลางาน.pdf'),
(4, 'peem', '19 พฤษภาคม 2567', '2024-05-19 21:08:14', 'ลา', 'peem_2024-05-19_ลางาน.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `locationin`
--

CREATE TABLE `locationin` (
  `locain_id` int(11) NOT NULL,
  `in_coordinates` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `locationleave`
--

CREATE TABLE `locationleave` (
  `localeave_id` int(11) NOT NULL,
  `le_coordinate` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `locationout`
--

CREATE TABLE `locationout` (
  `locaout_id` int(11) NOT NULL,
  `out_coordinates` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`username`, `password`) VALUES
('peem', '123');

-- --------------------------------------------------------

--
-- Table structure for table `placework`
--

CREATE TABLE `placework` (
  `placework_id` int(11) NOT NULL,
  `placework_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `placework`
--

INSERT INTO `placework` (`placework_id`, `placework_name`) VALUES
(1, 'ITBT Corporation'),
(2, 'องค์การสงเคราะห์ทหารผ่านศึก'),
(3, 'สำนักงานปลัดกระทรวงพลังงาน'),
(4, 'สำนักงานปลัดกระทรวงพาณิชย์'),
(5, 'สำนักงานเลขาธิการสภาผู้แทนราษฎร'),
(6, 'สำนักงานเศรษฐกิจอุตสาหกรรม'),
(7, 'สำนักงานคณะกรรมการส่งเสริมการลงทุน'),
(8, 'TK Park');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `stdID` int(10) NOT NULL,
  `stdName` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`stdID`, `stdName`) VALUES
(1, 'นัทโตะ'),
(2, 'นิว'),
(7, 'พีม'),
(8, 'peem'),
(9, 'พศวัต วัดวิทยาคุณ (พีม)');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `apprentice`
--
ALTER TABLE `apprentice`
  ADD PRIMARY KEY (`appren_id`);

--
-- Indexes for table `checkin`
--
ALTER TABLE `checkin`
  ADD PRIMARY KEY (`chin_id`),
  ADD KEY `locain_id` (`locain`);

--
-- Indexes for table `checkout`
--
ALTER TABLE `checkout`
  ADD PRIMARY KEY (`chout_id`),
  ADD KEY `locaout_id` (`locaout`);

--
-- Indexes for table `checkwork`
--
ALTER TABLE `checkwork`
  ADD PRIMARY KEY (`chw_id`),
  ADD KEY `appren_id` (`appren_id`),
  ADD KEY `chin_id` (`chin_id`),
  ADD KEY `chout_id` (`chout_id`);

--
-- Indexes for table `leave`
--
ALTER TABLE `leave`
  ADD PRIMARY KEY (`leave_id`);

--
-- Indexes for table `leavework`
--
ALTER TABLE `leavework`
  ADD PRIMARY KEY (`leavework_id`);

--
-- Indexes for table `locationin`
--
ALTER TABLE `locationin`
  ADD PRIMARY KEY (`locain_id`);

--
-- Indexes for table `locationleave`
--
ALTER TABLE `locationleave`
  ADD PRIMARY KEY (`localeave_id`);

--
-- Indexes for table `locationout`
--
ALTER TABLE `locationout`
  ADD PRIMARY KEY (`locaout_id`);

--
-- Indexes for table `placework`
--
ALTER TABLE `placework`
  ADD PRIMARY KEY (`placework_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`stdID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `apprentice`
--
ALTER TABLE `apprentice`
  MODIFY `appren_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `checkin`
--
ALTER TABLE `checkin`
  MODIFY `chin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `checkout`
--
ALTER TABLE `checkout`
  MODIFY `chout_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `checkwork`
--
ALTER TABLE `checkwork`
  MODIFY `chw_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leave`
--
ALTER TABLE `leave`
  MODIFY `leave_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `leavework`
--
ALTER TABLE `leavework`
  MODIFY `leavework_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `locationin`
--
ALTER TABLE `locationin`
  MODIFY `locain_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `locationleave`
--
ALTER TABLE `locationleave`
  MODIFY `localeave_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `locationout`
--
ALTER TABLE `locationout`
  MODIFY `locaout_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `placework`
--
ALTER TABLE `placework`
  MODIFY `placework_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `stdID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `checkwork`
--
ALTER TABLE `checkwork`
  ADD CONSTRAINT `checkwork_ibfk_1` FOREIGN KEY (`appren_id`) REFERENCES `apprentice` (`appren_id`),
  ADD CONSTRAINT `checkwork_ibfk_2` FOREIGN KEY (`chin_id`) REFERENCES `checkin` (`chin_id`),
  ADD CONSTRAINT `checkwork_ibfk_3` FOREIGN KEY (`chout_id`) REFERENCES `checkout` (`chout_id`);

--
-- Constraints for table `leave`
--
ALTER TABLE `leave`
  ADD CONSTRAINT `localeave_id` FOREIGN KEY (`localeave_id`) REFERENCES `locationleave` (`localeave_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
