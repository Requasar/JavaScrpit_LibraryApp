CREATE TABLE IF NOT EXISTS Run(
    id INT NOT NULL,
    book varchar(250) NOT NULL,
    pages INT NOT NULL,
    author varchar(250) NOT NULL,
    started_on timestamp NOT NULL,
    completed_on timestamp NOT NULL,
    version INT,
    PRIMARY KEY(id)

);