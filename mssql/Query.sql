
create database root_user;
use root_user;


-- Create Main Menu Table --------------------------------------------------------
create table main_menu_HU (
	id int not null primary key identity,
	text varchar(30) not null,
	icon varchar(50) not null,
	method varchar(30) not null
);

insert main_menu_HU values
('Kezdőoldal','fas fa-home','menu_load_home'),
('Profil','fas fa-user-circle','menu_load_profile'),
('Keresés','fas fa-search','menu_load_search'),
('Szótáraim','fas fa-book','menu_load_dictionaries'),
('Új szavak','fas fa-plus-circle','menu_load_addwords'),
('Agytorna','fas fa-brain','menu_load_brainteaser'),
('Felolvasó','fas fa-headphones','menu_load_listening'),
('Beállítások','fas fa-cog','menu_load_settings'),
('Kijelentkezés','fas fa-sign-out-alt','menu_load_signout');


create table main_menu_EN (
	id int not null primary key identity,
	text varchar(30) not null,
	icon varchar(50) not null,
	method varchar(30) not null
);

insert main_menu_EN values
('Home','fas fa-home','menu_load_home'),
('Profil','fas fa-user-circle','menu_load_profile'),
('Search','fas fa-search','menu_load_search'),
('My lexicones','fas fa-book','menu_load_dictionaries'),
('Add new!','fas fa-plus-circle','menu_load_addwords'),
('Brain teaser','fas fa-brain','menu_load_brainteaser'),
('Reader','fas fa-headphones','menu_load_listening'),
('Settings','fas fa-cog','menu_load_settings'),
('Sign out!','fas fa-sign-out-alt','menu_load_signout');

--/////////////////////////////////////////////////////////////////////////////////////

-- Create Default tables Table -------------------------------------------------------------

create table languages (
	id int not null primary key identity,
	lang_code varchar(10) not null,
	lang_name varchar(30) not null
);

insert languages values
('hu-HU','Magyar'),
(​'de-DE',​'Deutsch'),
(​'en-US',​'US English'),
(​'en-GB',​'UK English'​),
(​'es-ES',​'Espanol'),
(​'es-US',​'Espanol de Estados Unidos'),
(​'fr-FR',​'Francais'​),
(​'hi-IN',​'Hindi'),
(​'id-ID',​'Bahasa Indonesia'),
(​'it-IT',​'Italiano'),
('nl-NT','Nederlands'),
('pl-PL','Polski'),
(​'pt-BR',​'Portugues do Brasil');

create table dictionaries (
	id int not null primary key identity,
	dictionary_name varchar(30) not null,
	FK_language_code_1 int not null,
	FK_language_code_2 int not null,
	relase_date datetime not null,
	FOREIGN KEY (FK_language_code_1) REFERENCES languages(id),
	FOREIGN KEY (FK_language_code_2) REFERENCES languages(id),
);

create table words (
	id int not null primary key identity,
	FK_dictionary_id int not null,
	word_1 varchar(255) not null,
	word_2 varchar(255) not null,
	FK_language_code_1 int not null,
	FK_language_code_2 int not null,
	relase_date datetime not null,
	FOREIGN KEY (FK_language_code_1) REFERENCES languages(id),
	FOREIGN KEY (FK_language_code_2) REFERENCES languages(id),
	FOREIGN KEY (FK_dictionary_id) REFERENCES dictionaries(id),
);




--////   QUERIES   ////////////////////////////////////////////////////////////////////
--/////////////////////////////////////////////////////////////////////////////////////


--Dictionarires table query
Select
dictionaries.id as 'ID',
dictionary_name as 'Dictionary_Name',
(select languages.lang_code from languages where dictionaries.FK_language_code_1 = languages.id) as 'Lang_Prim',
(select languages.lang_code from languages where dictionaries.FK_language_code_2 = languages.id) as 'Lang_Sec',
dictionaries.relase_date as 'RelaseDate'
FROM dictionaries
FOR JSON AUTO;

-- Languages table query
Select
languages.lang_code as 'countryCode',
languages.lang_name as 'countryName'
FROM languages
FOR JSON AUTO;

-- Main Menu HU query
Select
* from
main_menu_HU
FOR JSON AUTO;

-- Main Menu EN query
Select
* from
main_menu_EN
FOR JSON AUTO;
