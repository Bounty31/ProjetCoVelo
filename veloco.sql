-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 17 Février 2016 à 12:23
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `veloco`
--

-- --------------------------------------------------------

--
-- Structure de la table `trace_1`
--

CREATE TABLE IF NOT EXISTS `trace_1` (
  `id_point` int(11) NOT NULL,
  `altitude` float NOT NULL,
  `distance` float NOT NULL,
  `vitesse` float NOT NULL,
  `freq_cardiaque` float NOT NULL,
  `delta_temps` float NOT NULL,
  `puissance` float NOT NULL,
  `freq_pedalage` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--


-- --------------------------------------------------------

--
-- Structure de la table `trace_id`
--

CREATE TABLE IF NOT EXISTS `trace_id` (
  `id` int(11) NOT NULL,
  `nom_table` varchar(50) NOT NULL,
  `nom_parcours` varchar(50) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `trace_id`
--

INSERT INTO `trace_id` (`id`, `nom_table`, `nom_parcours`, `date`) VALUES
(0, 'trace_1', 'parcours Salbert', '2016-02-18');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
