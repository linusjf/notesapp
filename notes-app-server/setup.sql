/*
In Neon, databases are stored on branches. By default, a project has one branch and one database.
You can select the branch and database to use from the drop-down menus above.

Try generating sample data and querying it by running the example statements below, or click
New Query to clear the editor.
*/
CREATE TABLE notes(note_id SERIAL PRIMARY KEY, title TEXT NOT NULL, content text not null,create_date timestamp not null default current_timestamp, update_date timestamp not null default current_timestamp );
INSERT INTO notes(title, content) values('test title', 'test content');
SELECT * FROM notes;
