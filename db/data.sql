INSERT INTO `dekanat`.`Groups` VALUES(1, 'ՄՀ721')

INSERT INTO `dekanat`.`Groups` VALUES(2, 'ՄՀ621')

INSERT INTO `dekanat`.`Groups` VALUES(3, 'Հ521')

INSERT INTO `dekanat`.`Groups` VALUES(4, 'Հ621')

INSERT INTO `dekanat`.`Groups` VALUES(5, 'Հ421')


SELECT * FROM `dekanat`.`Groups`

INSERT INTO `dekanat`.`Students` VALUES(1, 1, 'Ռոբերտ Ասատուրյան', '1996-07-03', 'Ք. Երևան 16 թաղամաս 26 շենք 46 բն', '041504950')

INSERT INTO `dekanat`.`Students` VALUES(2, 1, 'Սարգիս Շահինյան', '1996-12-02', 'Ք. Երևան Մոլդովական Փ. 39 շենք 29 բն', '093364657')

INSERT INTO `dekanat`.`Students` VALUES(3, 2, 'Թամարա Կարախանյան', '1995-03-11', 'Ք. Երևան Հալաբյան Փ. 12 շենք 34 բն', '041123487')

INSERT INTO `dekanat`.`Students` VALUES(4, 3, 'Կարինե Օհանյան', '1996-11-25', 'Ք. Երևան Բաղրամյան Փ. 45 շենք 23 բն', '055235678')

SELECT * FROM `dekanat`.`Students`

INSERT INTO `dekanat`.`Subjects` VALUES(1, 'Կառավարման տեղեկատվական համակարգեր')

INSERT INTO `dekanat`.`Subjects` VALUES(2, 'Մաթեմատիկական անալիզ');

INSERT INTO `dekanat`.`Subjects` VALUES(3, 'Ֆիզիկա');

INSERT INTO `dekanat`.`Subjects` VALUES(4, 'Թվային մեթոդներ');

SELECT * FROM `dekanat`.`Subjects`

INSERT INTO `dekanat`.`Grades` VALUES(1, 1, 1, 100);

INSERT INTO `dekanat`.`Grades` VALUES(2, 1, 2, 89);

INSERT INTO `dekanat`.`Grades` VALUES(3, 2, 1, 93);

INSERT INTO `dekanat`.`Grades` VALUES(4, 3, 2, 100);

INSERT INTO `dekanat`.`Grades` VALUES(5, 4, 4, 97);

SELECT * FROM `dekanat`.`Grades`

SELECT * FROM `dekanat`.`Grades` JOIN `dekanat`.`Students` ON `dekanat`.`Grades`.`student_id` = `dekanat`.`Students`.`id` JOIN `dekanat`.`Subjects` ON `dekanat`.`Grades`.`subject_id` = `dekanat`.`Subjects`.`id` JOIN `dekanat`.`Groups` ON `dekanat`.`Students`.`group` = `dekanat`.`Groups`.`id`

