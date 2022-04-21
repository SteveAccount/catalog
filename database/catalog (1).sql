-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Ápr 21. 11:11
-- Kiszolgáló verziója: 10.4.19-MariaDB
-- PHP verzió: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `catalog`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `albums`
--

CREATE TABLE `albums` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `publisherId` int(11) NOT NULL,
  `publishDate` date NOT NULL,
  `createdBy` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `modifiedBy` int(11) DEFAULT NULL,
  `modifiedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `albums`
--

INSERT INTO `albums` (`id`, `title`, `publisherId`, `publishDate`, `createdBy`, `createdAt`, `modifiedBy`, `modifiedAt`) VALUES
(1, 'Album 1', 1, '2018-01-01', 1, '2022-04-20 10:26:21', NULL, '2022-04-20 10:26:21'),
(2, 'Album2', 2, '2018-01-01', 1, '2022-04-20 10:26:21', NULL, '2022-04-20 10:26:21'),
(3, 'Album3', 3, '2018-01-01', 1, '2022-04-20 10:26:21', NULL, '2022-04-20 10:26:21'),
(4, 'Album4', 1, '2018-01-01', 1, '2022-04-20 10:26:21', NULL, '2022-04-20 10:26:21'),
(5, 'Album56', 2, '2018-01-01', 1, '2022-04-20 10:26:21', 0, '2022-04-20 10:26:21'),
(6, 'xasxasxasx', 4, '2022-04-04', 0, '2022-04-21 08:05:16', NULL, '2022-04-21 08:05:16');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `albums_composers_rel`
--

CREATE TABLE `albums_composers_rel` (
  `id` int(11) NOT NULL,
  `albumId` int(11) NOT NULL,
  `composerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `albums_composers_rel`
--

INSERT INTO `albums_composers_rel` (`id`, `albumId`, `composerId`) VALUES
(1, 1, 1),
(2, 2, 1),
(22, 6, 1),
(3, 2, 2),
(7, 4, 2),
(28, 5, 2),
(23, 6, 2),
(4, 3, 3),
(6, 4, 3),
(5, 4, 4),
(29, 5, 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `composers`
--

CREATE TABLE `composers` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdBy` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `modifiedBy` int(11) DEFAULT NULL,
  `modifiedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `composers`
--

INSERT INTO `composers` (`id`, `name`, `isActive`, `createdBy`, `createdAt`, `modifiedBy`, `modifiedAt`) VALUES
(1, 'Szerző 1', 1, 1, '2022-04-20 10:25:54', NULL, '2022-04-20 10:25:54'),
(2, 'Szerző 2', 1, 1, '2022-04-20 10:25:54', NULL, '2022-04-20 10:25:54'),
(3, 'Szerző 3', 1, 1, '2022-04-20 10:25:54', NULL, '2022-04-20 10:25:54'),
(4, 'Szerző 4', 1, 1, '2022-04-20 10:25:54', NULL, '2022-04-20 10:25:54'),
(5, '11', 1, 0, '2022-04-21 06:22:50', 0, '2022-04-21 06:22:50');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `publishers`
--

CREATE TABLE `publishers` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdBy` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `modifiedBy` int(11) DEFAULT NULL,
  `modifiedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `publishers`
--

INSERT INTO `publishers` (`id`, `name`, `isActive`, `createdBy`, `createdAt`, `modifiedBy`, `modifiedAt`) VALUES
(1, 'Kiadó 1', 1, 1, '2022-04-20 10:25:17', NULL, '2022-04-20 10:25:17'),
(2, 'Kiadó 2', 1, 1, '2022-04-20 10:25:17', NULL, '2022-04-20 10:25:17'),
(3, 'Kiadó 333', 1, 1, '2022-04-20 10:25:17', 0, '2022-04-20 10:25:17'),
(4, 'Best Trainer', 1, 0, '2022-04-21 06:07:04', NULL, '2022-04-21 06:07:04'),
(5, '11', 1, 0, '2022-04-21 06:08:16', 0, '2022-04-21 06:08:16'),
(6, 'Mi ez', 1, 0, '2022-04-21 06:09:04', NULL, '2022-04-21 06:09:04'),
(7, 'Kukucs', 1, 0, '2022-04-21 06:09:23', NULL, '2022-04-21 06:09:23');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `session`
--

CREATE TABLE `session` (
  `id` int(11) NOT NULL,
  `sessionId` varchar(200) NOT NULL,
  `ip` varchar(45) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `expirationDate` datetime NOT NULL,
  `token` varchar(200) DEFAULT NULL,
  `companyId` int(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `session`
--

INSERT INTO `session` (`id`, `sessionId`, `ip`, `userId`, `expirationDate`, `token`, `companyId`) VALUES
(1, '38da06f133dcf9607e64025c4501963efbcdcd4ac0c44f664f57617ebc15d4e314a9b5d18d5ea7d27d523052e49baba127593ac456da211ae6d13d4862f8ebb4', '::1', 0, '2022-04-21 18:02:18', NULL, 0),
(2, '3616ec84fd2741f316d35a6628ad0f258ade353f900a8e85dcb6ed8a613c33955afc5146de4039b21e175062d79632d2b2ab521edd31d9271277c746d9f38b50', '::1', 0, '2022-04-21 19:01:47', NULL, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `monogram` varchar(4) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `passwordHash` varchar(200) NOT NULL,
  `permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`permissions`)),
  `startPage` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKpublisher_idx` (`publisherId`);

--
-- A tábla indexei `albums_composers_rel`
--
ALTER TABLE `albums_composers_rel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKalbum_idx` (`albumId`),
  ADD KEY `FKcomposer_idx` (`composerId`,`albumId`);

--
-- A tábla indexei `composers`
--
ALTER TABLE `composers`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `publishers`
--
ALTER TABLE `publishers`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `albums_composers_rel`
--
ALTER TABLE `albums_composers_rel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT a táblához `composers`
--
ALTER TABLE `composers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `publishers`
--
ALTER TABLE `publishers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `session`
--
ALTER TABLE `session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `FKpublisher` FOREIGN KEY (`publisherId`) REFERENCES `publishers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Megkötések a táblához `albums_composers_rel`
--
ALTER TABLE `albums_composers_rel`
  ADD CONSTRAINT `FKalbum` FOREIGN KEY (`albumId`) REFERENCES `albums` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FKcomposer` FOREIGN KEY (`composerId`) REFERENCES `composers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
