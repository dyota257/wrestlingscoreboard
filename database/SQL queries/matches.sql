CREATE TABLE matchesRaw 
    (
        category VARCHAR(32),
        round VARCHAR(8),
        mat CHAR(1),
        id INT,
        red_name VARCHAR(64),
        red_fullname VARCHAR(64),
        red_club VARCHAR(64),
        blue_name VARCHAR(64),
        blue_fullname VARCHAR(64),
        blue_club VARCHAR(64)
    );


LOAD DATA LOCAL INFILE 'E:\\Dyota\\OneDrive\\Projects\\Web\\Wrestling scoreboard\\Mat B.csv' 
INTO TABLE matchesRaw
FIELDS
  TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
IGNORE 1 ROWS ();