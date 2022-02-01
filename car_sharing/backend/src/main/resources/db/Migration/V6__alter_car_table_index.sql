ALTER TABLE `car-sharing`.`car`
    ADD FULLTEXT INDEX `cardDisplayIndex` (`model`, `brand`, `city`) VISIBLE;
;
