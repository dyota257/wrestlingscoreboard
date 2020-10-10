
-- create table

CREATE TABLE wrestlers (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(32),
    last_name VARCHAR(32),
    gender VARCHAR(1),
    club_name VARCHAR(32),
    full_name VARCHAR(64),
    PRIMARY KEY (id)
);
