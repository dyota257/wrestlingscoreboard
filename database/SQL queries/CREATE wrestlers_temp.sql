
-- create table
-- full_name is a hash of first_name, last_name, and dob

CREATE TABLE wrestlers_temp (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(32),
    last_name VARCHAR(32),
    gender VARCHAR(1),
    dob DATE,
    club_name VARCHAR(32),
    full_name VARCHAR(64),
    PRIMARY KEY (id)
);
