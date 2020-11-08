
-- This is not the fixtures that got up "on the wall". 
-- This are the records that are recorded once the matches are finished (from the scoreboard)

CREATE TABLE matches_records(
    id INT NOT NULL AUTO_INCREMENT,
    tournament INT,
    red INT,
    blue INT,
    winner CHAR(3), --RED/BLU
    class_points VARCHAR(4),
    age VARCHAR(30),
    gender VARCHAR(10),
    style VARCHAR(30),
    weight VARCHAR(30),
    PRIMARY KEY (id),
    FOREIGN KEY (tournament) REFERENCES tournaments(id),
    FOREIGN KEY (red) REFERENCES wrestlers(id),
    FOREIGN KEY (blue) REFERENCES wrestlers(id)
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