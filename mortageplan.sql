create database mortageplan

use mortageplan; 

CREATE TABLE mortage (
    id int NOT NULL AUTO_INCREMENT,
    customer varchar(32) NOT NULL,
    total_loan_euro int NOT NULL, 
    total_loan_cent int NOT NULL,
    interest decimal(3, 2) NOT NULL,
    years int NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO mortage VALUES (NULL, 'Juha', 1000, 0, 5.0, 2);
INSERT INTO mortage VALUES (NULL, 'Karvinen', 4356, 0, 1.27, 6);
INSERT INTO mortage VALUES (NULL, 'Claes Månsson', 1300, 55, 8.67, 2);
INSERT INTO mortage VALUES (NULL, '"Clarencé, Andersson"', 2000, 0, 6, 4);

SELECT * FROM mortage;

DROP TABLE mortage;