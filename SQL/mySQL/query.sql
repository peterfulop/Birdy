

--Select all words
SELECT
`id` as 'id',
`FK_dictionary_id` as 'DictionaryID',
`word_1` as 'Word_1',
`word_2` as 'Word_2',
(select languages.lang_code from languages where words.FK_language_code_1 = languages.id) as 'Lang_1',
(select languages.lang_code from languages where words.FK_language_code_2 = languages.id) as 'Lang_2',
`relase_date` as 'RelaseDate'
FROM words;


