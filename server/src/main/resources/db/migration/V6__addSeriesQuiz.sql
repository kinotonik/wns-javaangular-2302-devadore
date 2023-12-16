INSERT INTO quizzforall.quiz (title, description, category_id, created_by, created_at, updated_at) VALUES ('Série TV 1','Quiz Séries TV',6,3,'2023-02-14','2023-02-14');
INSERT INTO quizzforall.question (id, text, quiz_id, created_at, updated_at) VALUES
(85,'Quelle série met en scène un groupe d''amis vivant à New York, fréquentant le Central Perk et partageant leurs expériences de vie?',8,'2023-02-14','2023-02-14'),
(86,'Quelle série fantastique suit les aventures de Jon Snow, Daenerys Targaryen et Tyrion Lannister dans leur quête pour le Trône de Fer?',8,'2023-02-14','2023-02-14'),
(87,'Dans quelle série une famille du nom de Simpson habite-t-elle à Springfield?',8,'2023-02-14','2023-02-14'),
(88,'Quelle série médicale suit le quotidien du Dr. Meredith Grey et de ses collègues au Grey Sloan Memorial Hospital?',8,'2023-02-14','2023-02-14'),
(89,'Quelle série policière met en scène le consultant Patrick Jane, qui résout des crimes en utilisant ses compétences en lecture du langage corporel?',8,'2023-02-14','2023-02-14'),
(90,'Quelle série de science-fiction suit les aventures du Docteur, un Seigneur du Temps voyageant à travers le temps et l''espace à bord de son TARDIS?',8,'2023-02-14','2023-02-14'),
(91,'Quelle série se déroule dans l''univers du jeu vidéo et suit les aventures de Dev, un développeur d''applications mobiles à New York?',8,'2023-02-14','2023-02-14'),
(92,'Quelle série met en scène un groupe de survivants essayant de survivre à une apocalypse zombie?',8,'2023-02-14','2023-02-14'),
(93,'Dans quelle série des années 90 un adolescent nommé Cory Matthews traverse-t-il les hauts et les bas de l''adolescence avec sa famille et ses amis?',8,'2023-02-14','2023-02-14'),
(94,'Quelle série dramatique suit la vie de Walter White, un professeur de chimie devenu fabricant de méthamphétamine?',8,'2023-02-14','2023-02-14'),
(95,'Quelle série humoristique met en scène un groupe de geeks passionnés de jeux vidéo, de comics et de science-fiction?',8,'2023-02-14','2023-02-14'),
(96,'Dans quelle série une famille dysfonctionnelle du nom de Bluth doit-elle faire face aux conséquences des activités illégales de leur patriarche?',8,'2023-02-14','2023-02-14');
INSERT INTO quizzforall.answer(text, question_id, is_correct, created_at, updated_at) VALUES
('Friends',85,1,'2023-02-14','2023-02-14'),
('How I Met Your Mother',85,0,'2023-02-14','2023-02-14'),
('The Big Bang Theory',85,0,'2023-02-14','2023-02-14'),
('Seinfeld',85,0,'2023-02-14','2023-02-14'),
('Breaking Bad',86,0,'2023-02-14','2023-02-14'),
('Game of Thrones',86,1,'2023-02-14','2023-02-14'),
('The Walking Dead',86,0,'2023-02-14','2023-02-14'),
('Stranger Things',86,0,'2023-02-14','2023-02-14'),
('Family Guy',87,0,'2023-02-14','2023-02-14'),
('The Simpsons',87,1,'2023-02-14','2023-02-14'),
('American Dad!',87,0,'2023-02-14','2023-02-14'),
('South Park',87,0,'2023-02-14','2023-02-14'),
('ER',88,0,'2023-02-14','2023-02-14'),
('House',88,0,'2023-02-14','2023-02-14'),
('Grey''s Anatomy',88,1,'2023-02-14','2023-02-14'),
('Scrubs',88,0,'2023-02-14','2023-02-14'),
('The Mentalist',89,1,'2023-02-14','2023-02-14'),
('Criminal Minds',89,0,'2023-02-14','2023-02-14'),
('Sherlock',89,0,'2023-02-14','2023-02-14'),
('NCIS',89,0,'2023-02-14','2023-02-14'),
('Star Trek',90,0,'2023-02-14','2023-02-14'),
('Doctor Who',90,1,'2023-02-14','2023-02-14'),
('Stargate SG-1',90,0,'2023-02-14','2023-02-14'),
('Battlestar Galactica',90,0,'2023-02-14','2023-02-14'),
('Silicon Valley',91,0,'2023-02-14','2023-02-14'),
('Westworld',91,0,'2023-02-14','2023-02-14'),
('Master of None',91,1,'2023-02-14','2023-02-14'),
('Black Mirror',91,0,'2023-02-14','2023-02-14'),
('Fear the Walking Dead',92,0,'2023-02-14','2023-02-14'),
('The Walking Dead',92,1,'2023-02-14','2023-02-14'),
('Z Nation',92,0,'2023-02-14','2023-02-14'),
('28 Days Later',92,0,'2023-02-14','2023-02-14'),
('Boy Meets World',93,1,'2023-02-14','2023-02-14'),
('Saved by the Bell',93,0,'2023-02-14','2023-02-14'),
('Full House',93,0,'2023-02-14','2023-02-14'),
('Dawson''s Creek',93,0,'2023-02-14','2023-02-14'),
('Dexter',94,0,'2023-02-14','2023-02-14'),
('Breaking Bad',94,1,'2023-02-14','2023-02-14'),
('Narcos',94,0,'2023-02-14','2023-02-14'),
('The Wire',94,0,'2023-02-14','2023-02-14'),
('The IT Crowd',95,0,'2023-02-14','2023-02-14'),
('The Big Bang Theory',95,1,'2023-02-14','2023-02-14'),
('Silicon Valley',95,0,'2023-02-14','2023-02-14'),
('Rick and Morty',95,0,'2023-02-14','2023-02-14'),
('Arrested Development',96,1,'2023-02-14','2023-02-14'),
('Better Call Saul',96,0,'2023-02-14','2023-02-14'),
('The Sopranos',96,0,'2023-02-14','2023-02-14'),
('Mad Men',96,0,'2023-02-14','2023-02-14');
