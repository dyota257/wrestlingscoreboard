
-- This is the table that will be displayed as fixtures "on the wall"
-- Results from the scoreboard will not go here. They will go to matches_records

CREATE TABLE matches_temp(
    id INT NOT NULL AUTO_INCREMENT,
    tournament INT,
    red INT,
    blue INT,
    age VARCHAR(30),
    gender VARCHAR(10),
    style VARCHAR(30),
    weight VARCHAR(30),
    mat VARCHAR(1),
    PRIMARY KEY (id),
    FOREIGN KEY (tournament) REFERENCES tournaments(id),
    FOREIGN KEY (red) REFERENCES wrestlers(id),
    FOREIGN KEY (blue) REFERENCES wrestlers(id),
);

INSERT INTO matches
VALUES (
    1,
    "Phoenix Evans-Brown",
    "Jack Graham-Arho",
    "10-11",
    "Male",
    "Freestyle",
    "42kg"
), 
(
    2,
    "Gray Moffat-Clarke",
    "Yusuf Loder",
    "14-15",
    "Male",
    "Freestyle",
    "90kg"
), 
(
    3,
    "Tait Anderson",
    "Jake Raymond Criddle",
    "10-11",
    "Male",
    "Freestyle",
    "35kg"
), 
(
    4,
    "Stojan Stojanovic",
    "Tom Barns",
    "21+",
    "Male",
    "Greco-Roman",
    "90kg"
);