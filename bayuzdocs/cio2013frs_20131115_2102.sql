-- phpMyAdmin SQL Dump
-- version 4.0.0
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 15, 2013 at 09:01 PM
-- Server version: 5.1.72-2
-- PHP Version: 5.3.3-7+squeeze17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cio2013frs`
--

-- --------------------------------------------------------

--
-- Table structure for table `dosen`
--

CREATE TABLE IF NOT EXISTS `dosen` (
  `nip` varchar(255) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nip` (`nip`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `dosen`
--

INSERT INTO `dosen` (`nip`, `nama`, `id`, `createdAt`, `updatedAt`) VALUES
('197408152009031002', 'Moch. Hariadi ST. Msc. Phd', 1, '2013-11-12 13:33:46', '2013-11-12 13:33:46'),
('197408152009031009', 'Dr. Ir. Janti Gunawan, M.Eng.', 2, '2013-11-12 13:38:12', '2013-11-12 15:00:10'),
('197408152009031019', 'Dr. I Ketut Edy Purnama ST. MT', 3, '2013-11-12 13:41:19', '2013-11-12 13:41:19'),
('197408152009031025', 'Dr. Ir. Ahmad Affandi, DEA', 4, '2013-11-12 14:53:50', '2013-11-12 14:53:50'),
('197408152009031035', 'Dr. Ir. Yoyon Kusnendar Suprapto, Msc', 5, '2013-11-12 14:57:55', '2013-11-12 14:57:55'),
('197408152009031041', 'Dr. Surya Sumpena, ST. Msc.', 6, '2013-11-12 14:58:56', '2013-11-12 15:02:04'),
('197408152009031047', 'Muhtadin, ST. MT.', 7, '2013-11-12 15:02:43', '2013-11-12 15:02:43'),
('197408152009031053', 'Achmad Zaini ST. MT.', 8, '2013-11-12 15:03:39', '2013-11-12 15:03:39'),
('197408152009031060', 'Adhi Dharma Wibawa, ST. MT.', 9, '2013-11-12 15:06:39', '2013-11-12 15:06:39');

-- --------------------------------------------------------

--
-- Table structure for table `frs`
--

CREATE TABLE IF NOT EXISTS `frs` (
  `id_mhs` varchar(255) DEFAULT NULL,
  `id_kuliah` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=45 ;

--
-- Dumping data for table `frs`
--

INSERT INTO `frs` (`id_mhs`, `id_kuliah`, `id`, `createdAt`, `updatedAt`) VALUES
('1', '2', 5, '2013-11-15 00:40:50', '2013-11-15 00:40:50'),
('1', '1', 6, '2013-11-15 00:40:50', '2013-11-15 00:40:50'),
('7', '1', 7, '2013-11-15 02:38:20', '2013-11-15 02:38:20'),
('7', '5', 8, '2013-11-15 02:38:20', '2013-11-15 02:38:20'),
('2', '2', 9, '2013-11-15 03:37:38', '2013-11-15 03:37:38'),
('2', '1', 10, '2013-11-15 03:37:38', '2013-11-15 03:37:38'),
('12', '4', 11, '2013-11-15 03:54:01', '2013-11-15 03:54:01'),
('12', '3', 12, '2013-11-15 03:54:01', '2013-11-15 03:54:01'),
('16', '1', 13, '2013-11-15 03:54:40', '2013-11-15 03:54:40'),
('16', '4', 14, '2013-11-15 03:54:40', '2013-11-15 03:54:40'),
('20', '6', 15, '2013-11-15 03:56:46', '2013-11-15 03:56:46'),
('20', '3', 16, '2013-11-15 03:56:46', '2013-11-15 03:56:46'),
('6', '2', 17, '2013-11-15 03:59:01', '2013-11-15 03:59:01'),
('6', '1', 18, '2013-11-15 03:59:01', '2013-11-15 03:59:01'),
('6', '4', 19, '2013-11-15 03:59:01', '2013-11-15 03:59:01'),
('5', '1', 24, '2013-11-15 04:18:05', '2013-11-15 04:18:05'),
('5', '4', 25, '2013-11-15 04:18:05', '2013-11-15 04:18:05'),
('4', '5', 26, '2013-11-15 04:23:18', '2013-11-15 04:23:18'),
('4', '6', 27, '2013-11-15 04:23:18', '2013-11-15 04:23:18'),
('8', '2', 28, '2013-11-15 04:24:14', '2013-11-15 04:24:14'),
('8', '1', 29, '2013-11-15 04:24:14', '2013-11-15 04:24:14'),
('9', '6', 30, '2013-11-15 04:24:59', '2013-11-15 04:24:59'),
('9', '3', 31, '2013-11-15 04:24:59', '2013-11-15 04:24:59'),
('11', '4', 32, '2013-11-15 04:28:25', '2013-11-15 04:28:25'),
('11', '5', 33, '2013-11-15 04:28:25', '2013-11-15 04:28:25'),
('14', '2', 34, '2013-11-15 04:29:48', '2013-11-15 04:29:48'),
('14', '3', 35, '2013-11-15 04:29:48', '2013-11-15 04:29:48'),
('17', '2', 36, '2013-11-15 06:03:10', '2013-11-15 06:03:10'),
('17', '3', 37, '2013-11-15 06:03:10', '2013-11-15 06:03:10'),
('6', '6', 38, '2013-11-15 06:10:26', '2013-11-15 06:10:26'),
('5', '6', 39, '2013-11-15 06:10:46', '2013-11-15 06:10:46'),
('1', '3', 40, '2013-11-15 06:11:12', '2013-11-15 06:11:12'),
('7', '3', 41, '2013-11-15 06:32:31', '2013-11-15 06:32:31'),
('4', '1', 42, '2013-11-15 08:08:13', '2013-11-15 08:08:13'),
('2', '6', 43, '2013-11-15 13:52:29', '2013-11-15 13:52:29'),
('8', '4', 44, '2013-11-15 14:00:21', '2013-11-15 14:00:21');

-- --------------------------------------------------------

--
-- Table structure for table `kuliah`
--

CREATE TABLE IF NOT EXISTS `kuliah` (
  `kode` varchar(255) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `sks` int(11) DEFAULT NULL,
  `id_dosen` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kode` (`kode`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `kuliah`
--

INSERT INTO `kuliah` (`kode`, `nama`, `sks`, `id_dosen`, `id`, `createdAt`, `updatedAt`) VALUES
('TE092636', 'Sistem Biometrika (C)', 3, '1', 1, '2013-11-14 03:46:21', '2013-11-15 13:36:32'),
('TE092635', 'Manajemen Strategi', 2, '2', 2, '2013-11-14 04:24:08', '2013-11-14 04:24:08'),
('TE092640', 'Pengenalan Bidang Riset (B)', 2, '3', 3, '2013-11-14 04:25:47', '2013-11-14 04:25:47'),
('TE092637', 'Manajemen Jaringan (C)', 2, '4', 4, '2013-11-14 04:27:00', '2013-11-14 04:27:00'),
('TE092638', 'Sistem Manajemen Basis Data Terdistribusi', 3, '5', 5, '2013-11-14 04:27:47', '2013-11-15 13:36:13'),
('TE092639', 'Sistem dan Jaringan TIK', 2, '6', 6, '2013-11-14 04:28:50', '2013-11-14 04:28:50');

-- --------------------------------------------------------

--
-- Table structure for table `mhs`
--

CREATE TABLE IF NOT EXISTS `mhs` (
  `nrp` varchar(255) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nrp` (`nrp`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `mhs`
--

INSERT INTO `mhs` (`nrp`, `nama`, `id`, `createdAt`, `updatedAt`) VALUES
('2213206711', 'Apri Suharto', 1, '2013-11-07 15:11:43', '2013-11-07 15:11:43'),
('2213206725', 'Nofian Adi P', 2, '2013-11-07 15:12:14', '2013-11-07 19:21:32'),
('2213206721', 'Ari Gunadi Palilu', 4, '2013-11-07 15:13:05', '2013-11-07 15:13:05'),
('2213206706', 'Siendi Baskoro', 5, '2013-11-07 15:14:13', '2013-11-07 15:14:13'),
('2213206702', 'Petrix Nomieni', 6, '2013-11-07 15:14:42', '2013-11-12 15:15:32'),
('2213206727', 'Abd. Rahman', 8, '2013-11-12 12:11:02', '2013-11-12 15:15:42'),
('2213206731', 'Teti Rohaeti', 9, '2013-11-12 12:11:52', '2013-11-12 15:15:52'),
('2213206741', 'Eni Yusriani', 11, '2013-11-12 13:30:17', '2013-11-12 13:30:17'),
('2213206745', 'I Made Pasek Mudhana', 12, '2013-11-12 13:32:27', '2013-11-12 13:32:27'),
('2213206751', 'Yanti', 14, '2013-11-12 15:34:47', '2013-11-12 15:34:47'),
('2213206753', 'Elok Sri Wahyuni', 15, '2013-11-12 15:35:12', '2013-11-12 15:35:12'),
('2213206760', 'Rista Novitasari', 16, '2013-11-12 15:35:48', '2013-11-12 15:35:48'),
('2213206763', 'Haerul Harun', 17, '2013-11-12 15:36:21', '2013-11-12 15:36:21'),
('2213206770', 'Hazwar Ambo Enre', 18, '2013-11-12 15:37:07', '2013-11-12 15:37:07'),
('2213206777', 'Ahmad Mulla Ali Bastho', 19, '2013-11-12 15:37:42', '2013-11-12 15:37:42'),
('2213206780', 'Amin Wahyono', 20, '2013-11-12 15:39:38', '2013-11-12 15:39:38'),
('2213206799', 'Bayu Setyatmoko', 21, '2013-11-12 15:39:51', '2013-11-12 15:39:51'),
('2213206718', 'Muslem', 7, '2013-11-07 15:15:10', '2013-11-07 15:35:49');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
