CREATE TABLE matchesRaw 
    (
        Category VARCHAR(32),
        Round VARCHAR(8),
        Mat CHAR(1),
        Id INT,
        Red VARCHAR(64),
        Blue VARCHAR(64)
    )


LOAD DATA LOCAL INFILE 'E:\\Dyota\\OneDrive\\Projects\\Web\\Wrestling scoreboard\\Mat B.csv' 
INTO TABLE matchesRaw
FIELDS
  TERMINATED BY ','
  ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
IGNORE 1 ROWS ();