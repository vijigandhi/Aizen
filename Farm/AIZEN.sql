-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 09, 2024 at 10:52 AM
-- Server version: 10.4.30-MariaDB-1:10.4.30+maria~ubu2004
-- PHP Version: 8.1.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `AIZEN`
--

-- --------------------------------------------------------

--
-- Table structure for table `Address`
--

CREATE TABLE `Address` (
  `addresid` int(11) NOT NULL,
  `address_line1` varchar(255) DEFAULT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `address_line3` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `pincode` bigint(20) DEFAULT NULL,
  `telephone` bigint(20) DEFAULT NULL,
  `is_shipping` tinyint(1) DEFAULT NULL,
  `is_billing` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Cart`
--

CREATE TABLE `Cart` (
  `cart_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `CartItem`
--

CREATE TABLE `CartItem` (
  `cartitem_id` int(11) NOT NULL,
  `cart_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `row_total` int(11) DEFAULT NULL,
  `strikeout_price` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `subtotal` int(11) DEFAULT NULL,
  `grand_total` int(11) DEFAULT NULL,
  `tax` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `is_popular` smallint(6) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Country`
--

CREATE TABLE `Country` (
  `country_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `CustomerDetails`
--

CREATE TABLE `CustomerDetails` (
  `customer_id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `address_line1` varchar(255) DEFAULT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `address_line3` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `pincode` bigint(20) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `telephone` bigint(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role_id` int(11) DEFAULT NULL,
  `email_verified` tinyint(1) NOT NULL DEFAULT 0,
  `is_approved` tinyint(1) DEFAULT NULL,
  `id_proof` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `CustomerDetails`
--

INSERT INTO `CustomerDetails` (`customer_id`, `first_name`, `last_name`, `email`, `password_hash`, `address_line1`, `address_line2`, `address_line3`, `city`, `state`, `pincode`, `country`, `telephone`, `created_at`, `updated_at`, `role_id`, `email_verified`, `is_approved`, `id_proof`) VALUES
(23, 'Tanner', 'Davis', 'rufiz@mailinator.com', '$2y$10$0wS5ElF4IqdDBAEQiV7O4.UtW4qfH65pTiohYaZgKJdQqNGiA9xmi', '65 South Hague Extension', 'Eveniet voluptates ', 'Ut voluptatem aut re', 'Sint sit consequunt', 'Ea exercitationem qu', 638576, 'Duis velit qui exerc', 9574247668, '2024-07-06 04:45:38', '2024-07-06 04:45:38', 3, 0, NULL, NULL),
(25, 'Madison', 'Bowen', 'buron@mailinator.com', '$2y$10$ln9cWegheWGPmC1AGsLfTusj6jvQq1.70sYzr9dI6thEG76mWXxYy', '464 Oak Court', 'Voluptatem quis quis', 'Voluptate porro perf', 'Sunt asperiores nul', 'Illo sunt quisquam ', 123456, 'Eius a amet quos po', 7878787878, '2024-07-08 15:00:09', '2024-07-08 15:00:09', 3, 0, NULL, NULL),
(26, 'Shad', 'Castaneda', 'vaja@mailinator.com', '$2y$10$YEiQkez8TsX39NGC9aNGguIx9Uy6ClT91MArtll9sZ77V1AOLhxC6', '16 West Old Parkway', 'Laudantium voluptat', 'Rerum natus ullamco ', 'Molestiae aute sed q', 'Eum amet nostrum am', 0, 'Totam ipsum velit n', 0, '2024-07-08 15:46:01', '2024-07-08 15:46:01', 3, 0, NULL, NULL),
(27, 'Solomon', 'Stone', 'xyviqa@mailinator.com', '$2y$10$8pAs2sI2qVvA7/GXso9eoeTV8lAoHLb3h1vsdNFX.Y2TrbB4mt7yG', '98 Old Parkway', 'Repudiandae esse un', 'Omnis nemo quia quia', 'Est itaque assumend', 'Doloremque quos volu', 666666, 'Eu possimus accusan', 7878787878, '2024-07-08 15:55:55', '2024-07-08 15:55:55', 3, 0, NULL, '/var/www/html/AIZEN/Frontend/src/assets/form.png'),
(28, 'Jessica', 'Shelton', 'cowolonejo@mailinator.com', '$2y$10$lpNWCpZfJFUZQMvVcdrlHecEdmLzgIF3c7AtIK8DxELfpIRSJtZdi', '812 Hague Avenue', 'Corrupti voluptatem', 'Aut facere consequat', 'Earum ullamco adipis', 'Dolore temporibus se', 666666, 'Et consequatur venia', 0, '2024-07-08 16:02:33', '2024-07-08 16:02:33', 3, 0, NULL, '/var/www/html/AIZEN/Frontend/src/assets/form.png'),
(29, 'Wilma', 'Rollins', 'cutudu@mailinator.com', '$2y$10$5N04Od8rR7xZ.Mo8szNJIe.eZ3pE.dWvhFrO3ByxnexVu/m4DXTsm', '719 South Milton Court', 'Deleniti est quia la', 'Omnis impedit imped', 'Ut beatae quas nostr', 'Labore aliquam elige', 999999, 'Adipisci quisquam se', 0, '2024-07-08 16:11:26', '2024-07-08 16:11:26', 3, 0, NULL, '/var/www/html/AIZEN/Frontend/src/assets/form.png'),
(30, 'Dana', 'Stanton', 'sykafinu@mailinator.com', '$2y$10$QHswSUzkoefa1CghsTeCjOEkhC39BSdaXml1q5HGNC88Y2H/M4XnC', '51 Green Cowley Lane', 'Quis aute eligendi i', 'Vel eos in voluptat', 'Ullam eos consequun', 'Et totam ipsum alia', 888888, 'Nostrum aute volupta', 987654321, '2024-07-08 16:34:57', '2024-07-08 16:34:57', 3, 0, NULL, '/var/www/html/AIZEN/Frontend/src/assets/form.png'),
(31, 'Kelly', 'Guzman', 'sykewamuca@mailinator.com', '$2y$10$4.znCOrpm2QMha1XrlRso.YPDBnSGx.VQbupO2Vnk.TpSMdJB2d2K', '913 New Court', 'Aut labore quaerat v', 'Animi culpa saepe ', 'Nam distinctio Volu', 'Quibusdam est provid', 888888, 'Deleniti in deserunt', 987654321, '2024-07-08 17:01:08', '2024-07-08 17:01:08', 3, 0, NULL, NULL),
(32, 'Freya', 'Vinson', 'cogo@mailinator.com', '$2y$10$v7vtIs4w3zDxgc1Pnd0tEOqRzG4UgwQ05It4A4Abmef54wWkCHOnS', '792 Green Milton Freeway', 'Temporibus numquam a', 'Quia voluptatem per', 'Reprehenderit paria', 'Excepturi autem inci', 999999, 'Saepe dolorem mollit', 6385785905, '2024-07-08 17:08:24', '2024-07-08 17:08:24', 3, 0, NULL, NULL),
(33, 'Freya', 'Vinson', 'mathish@gmail.com', '$2y$10$hbWEwNSo.QjLXbSTdjPquul/M8qdmBZpd2pcfADS3xAoZYGoamsPO', '792 Green Milton Freeway', 'Temporibus numquam a', 'Quia voluptatem per', 'Reprehenderit paria', 'Excepturi autem inci', 999999, 'Saepe dolorem mollit', 6385785905, '2024-07-08 17:09:02', '2024-07-08 17:09:02', 3, 0, NULL, '/var/www/html/AIZEN/Frontend/src/assets/form.png'),
(34, 'August', 'Wilder', 'huguh@mailinator.com', '$2y$10$uPQeS3ehqoRjXyTUt0cIC.MRCx/TJX4HQC3dnUnVaLild.Pwpoc..', '119 Second Parkway', 'Non nostrum ut persp', 'Et elit ipsum commo', 'Dolor ipsam temporib', 'Labore eos omnis ut', 999999, 'Veniam non est rer', 0, '2024-07-09 03:39:38', '2024-07-09 03:39:38', 3, 0, NULL, '/var/www/html/AIZEN/Frontend/src/assets/form.png'),
(35, 'Lani', 'Elliott', 'xunotym@mailinator.com', '$2y$10$lhwSGc7ipKKUJV7mVo9SseeNoZpXidC7lLhuvThl8GC35VLWu8Fnq', '30 Oak Drive', 'Sit ullamco do nobis', 'Eius aliquid autem v', 'Repellendus Laudant', 'Fugit iure sit sed', 989898, 'In aut elit magnam ', 987654321, '2024-07-09 04:00:09', '2024-07-09 04:00:09', 3, 0, NULL, '/var/www/html/AIZEN/Frontend/src/assets/form.png'),
(36, 'Sarah', 'Frost', 'zonijiku@mailinator.com', '$2y$10$ccA8fC54.dITxcHwFIlF5uJD5wmg5tFYWMNwBqOuqwasSQnwidDaW', '613 South Rocky Second Drive', 'In non explicabo Vo', 'Do blanditiis eum ma', 'Esse voluptas dolor', 'Sint incidunt hic e', 625018, 'Ullam voluptatem Qu', 987654321, '2024-07-09 04:07:11', '2024-07-09 04:07:11', 3, 0, NULL, '/var/www/html/AIZEN/Frontend/src/assets/form.png'),
(37, 'Autumn', 'Faulkner', 'gagikyhaqy@mailinator.com', '$2y$10$xfeF1ogvB6uDsLdnHEXvCea6iwMRi41Csek5PEuOm08DXLxBIC03q', '996 Nobel Street', 'Suscipit ullam aut o', 'Veniam ut est ab e', 'Ut delectus ratione', 'Modi dolor mollit ma', 0, 'Similique non vel au', 0, '2024-07-09 04:24:15', '2024-07-09 04:24:15', NULL, 0, NULL, NULL),
(38, 'Kyra', 'Nixon', 'giterejecu@mailinator.com', '$2y$10$bAB/ADncoiqrlWYjOq/kkewr2uDPVJEMJ1haNc0ipKOt5lcbIwjP6', '422 West Nobel Street', 'Est delectus Nam di', 'Sit maxime qui eu oc', 'Accusantium nostrum ', 'Dolores aliqua Vel ', 888888, 'Sint earum reprehen', 0, '2024-07-09 04:47:21', '2024-07-09 04:47:21', 3, 0, NULL, '/var/www/html/AIZEN/Frontend/src/assets/form.png'),
(39, 'Fitzgerald', 'Padilla', 'jygyzawi@mailinator.com', '$2y$10$bzZGwO0Oo4MQiWxKhJUxUeUayo6DfBAFhyTPUUB9ORZqvQ8tC./h.', '603 West Green New Street', 'Et nihil distinctio', 'Aut sunt labore ull', 'Culpa natus tempor ', 'Voluptatem cillum du', 625018, 'Aut voluptas distinc', 6385785905, '2024-07-09 04:56:03', '2024-07-09 04:56:03', 3, 0, NULL, '/var/www/html/AIZEN/Frontend/src/assets/form.png'),
(40, 'Asha', 'k', 'ashakdckap@gmail.com', '$2y$10$qOV5Ko0gBC.u8Iy8.GpF0.aurCgNuSHUJCyhWxLwtxmDyXxsk5pj2', '659 West Cowley Boulevard', 'Dolorem dolorum nece', 'Eu rerum unde impedi', 'Adipisci laboriosam', 'Excepteur adipisci c', 625018, 'India', 12185925539, '2024-07-09 05:01:14', '2024-07-09 05:01:14', 3, 0, NULL, '/var/www/html/AIZEN/Frontend/src/assets/form.png');

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `order_id` int(11) NOT NULL,
  `cart_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_phone_number` bigint(20) DEFAULT NULL,
  `shippingmethod_id` int(11) DEFAULT NULL,
  `shipping_address_line1` varchar(255) DEFAULT NULL,
  `shipping_address_line2` varchar(255) DEFAULT NULL,
  `shipping_address_line3` varchar(255) DEFAULT NULL,
  `shipping_city` varchar(255) DEFAULT NULL,
  `shipping_state` varchar(255) DEFAULT NULL,
  `shipping_country` varchar(255) DEFAULT NULL,
  `billing_address_line1` varchar(255) DEFAULT NULL,
  `billing_address_line2` varchar(255) DEFAULT NULL,
  `billing_address_line3` varchar(255) DEFAULT NULL,
  `billing_city` varchar(255) DEFAULT NULL,
  `billing_state` varchar(255) DEFAULT NULL,
  `billing_country` varchar(255) DEFAULT NULL,
  `phone_number` bigint(20) DEFAULT NULL,
  `sub_total` int(11) DEFAULT NULL,
  `tax` int(11) DEFAULT NULL,
  `grand_total` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Payment`
--

CREATE TABLE `Payment` (
  `payment_id` int(11) NOT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `subcategory_id` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `special_price` int(11) DEFAULT NULL,
  `actual_price` int(11) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `is_popular` smallint(6) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Role`
--

CREATE TABLE `Role` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `Role`
--

INSERT INTO `Role` (`role_id`, `role_name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', '2024-07-03 07:13:32', '2024-07-03 07:13:32'),
(2, 'Vendor', '2024-07-03 07:13:56', '2024-07-03 07:13:56'),
(3, 'User', '2024-07-03 07:14:15', '2024-07-03 07:14:15');

-- --------------------------------------------------------

--
-- Table structure for table `ShippingMethod`
--

CREATE TABLE `ShippingMethod` (
  `shippingmethod_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `amount_charge` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `State`
--

CREATE TABLE `State` (
  `state_id` int(11) NOT NULL,
  `country_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Store`
--

CREATE TABLE `Store` (
  `store_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `address_line1` varchar(255) DEFAULT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `address_line3` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Subcategory`
--

CREATE TABLE `Subcategory` (
  `subacategory_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `variant_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_popular` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Wishlist`
--

CREATE TABLE `Wishlist` (
  `wishlist_id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Address`
--
ALTER TABLE `Address`
  ADD PRIMARY KEY (`addresid`);

--
-- Indexes for table `Cart`
--
ALTER TABLE `Cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `CartItem`
--
ALTER TABLE `CartItem`
  ADD PRIMARY KEY (`cartitem_id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `Country`
--
ALTER TABLE `Country`
  ADD PRIMARY KEY (`country_id`);

--
-- Indexes for table `CustomerDetails`
--
ALTER TABLE `CustomerDetails`
  ADD PRIMARY KEY (`customer_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `payment_id` (`payment_id`),
  ADD KEY `shippingmethod_id` (`shippingmethod_id`);

--
-- Indexes for table `Payment`
--
ALTER TABLE `Payment`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `subcategory_id` (`subcategory_id`),
  ADD KEY `store_id` (`store_id`);

--
-- Indexes for table `Role`
--
ALTER TABLE `Role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `ShippingMethod`
--
ALTER TABLE `ShippingMethod`
  ADD PRIMARY KEY (`shippingmethod_id`);

--
-- Indexes for table `State`
--
ALTER TABLE `State`
  ADD PRIMARY KEY (`state_id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indexes for table `Store`
--
ALTER TABLE `Store`
  ADD PRIMARY KEY (`store_id`);

--
-- Indexes for table `Subcategory`
--
ALTER TABLE `Subcategory`
  ADD PRIMARY KEY (`subacategory_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `Wishlist`
--
ALTER TABLE `Wishlist`
  ADD PRIMARY KEY (`wishlist_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Address`
--
ALTER TABLE `Address`
  MODIFY `addresid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Cart`
--
ALTER TABLE `Cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `CartItem`
--
ALTER TABLE `CartItem`
  MODIFY `cartitem_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Country`
--
ALTER TABLE `Country`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `CustomerDetails`
--
ALTER TABLE `CustomerDetails`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Payment`
--
ALTER TABLE `Payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Role`
--
ALTER TABLE `Role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ShippingMethod`
--
ALTER TABLE `ShippingMethod`
  MODIFY `shippingmethod_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `State`
--
ALTER TABLE `State`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Store`
--
ALTER TABLE `Store`
  MODIFY `store_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Subcategory`
--
ALTER TABLE `Subcategory`
  MODIFY `subacategory_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Wishlist`
--
ALTER TABLE `Wishlist`
  MODIFY `wishlist_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `Cart_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `CustomerDetails` (`customer_id`);

--
-- Constraints for table `CartItem`
--
ALTER TABLE `CartItem`
  ADD CONSTRAINT `CartItem_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `Cart` (`cart_id`),
  ADD CONSTRAINT `CartItem_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Products` (`product_id`);

--
-- Constraints for table `Category`
--
ALTER TABLE `Category`
  ADD CONSTRAINT `Category_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `CustomerDetails` (`customer_id`);

--
-- Constraints for table `CustomerDetails`
--
ALTER TABLE `CustomerDetails`
  ADD CONSTRAINT `CustomerDetails_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `Role` (`role_id`);

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `Cart` (`cart_id`),
  ADD CONSTRAINT `Orders_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `CustomerDetails` (`customer_id`),
  ADD CONSTRAINT `Orders_ibfk_3` FOREIGN KEY (`payment_id`) REFERENCES `Payment` (`payment_id`),
  ADD CONSTRAINT `Orders_ibfk_4` FOREIGN KEY (`shippingmethod_id`) REFERENCES `ShippingMethod` (`shippingmethod_id`);

--
-- Constraints for table `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `Category` (`category_id`),
  ADD CONSTRAINT `Products_ibfk_2` FOREIGN KEY (`subcategory_id`) REFERENCES `Subcategory` (`subacategory_id`),
  ADD CONSTRAINT `Products_ibfk_3` FOREIGN KEY (`store_id`) REFERENCES `Store` (`store_id`);

--
-- Constraints for table `State`
--
ALTER TABLE `State`
  ADD CONSTRAINT `State_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `Country` (`country_id`);

--
-- Constraints for table `Subcategory`
--
ALTER TABLE `Subcategory`
  ADD CONSTRAINT `Subcategory_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `Category` (`category_id`);

--
-- Constraints for table `Wishlist`
--
ALTER TABLE `Wishlist`
  ADD CONSTRAINT `Wishlist_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `CustomerDetails` (`customer_id`),
  ADD CONSTRAINT `Wishlist_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
