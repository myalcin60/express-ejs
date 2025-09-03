CREATE DATABASE express_mvc;
use express_mvc;
CREATE Table personnes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    age INT
    );

INSERT INTO personnes VALUES 
(null, "Wick", "Jhon", 45),
(null, "Dalton", "Jack", 55),
(null, "Maggio", "Sophie", 35);


SELECT * FROM personnes

DELETE FROM personnes where id=14

UPDATE personnes SET non = ?, prenom=?, age=? WHERE id = ? ;