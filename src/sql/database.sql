CREATE DATABASE todo_app;

CREATE TABLE todo(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titolo VARCHAR(100) NOT NULL,
    descrizione TEXT(500),
    stato VARCHAR(100),
    scadenza VARCHAR(200)
);
