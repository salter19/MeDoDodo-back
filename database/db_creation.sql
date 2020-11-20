DROP TABLE IF EXISTS tasks, categories;

CREATE TABLE tasks (
  id              INT                 NOT NULL      AUTO_INCREMENT
  , title         VARCHAR(255)        NOT NULL
  , description   VARCHAR(255)
  , due_date      DATETIME            NOT NULL
  , priority      INT                 DEFAULT 0
  , category_id   INT                 DEFAULT 1
  , is_done       BOOLEAN             DEFAULT false
  , CONSTRAINT    pk_task_id          PRIMARY KEY (id)
  , CONSTRAINT    fk_category_id      FOREIGN KEY (category_id)
                  REFERENCES          categories (id)
                  ON UPDATE           CASCADE
                  ON DELETE           RESTRICT
);

CREATE TABLE categories (
  id              INT           NOT NULL            AUTO_INCREMENT
  , title         VARCHAR(30)   DEFAULT 'my_tasks'  UNIQUE
  , PRIMARY KEY (id)
);
-- INSERT INTO categories() VALUES();
-- INSERT INTO tasks (title, due_date) VALUES ('Teemu ja team Dodo', '2020-11-20 10:00:00');

SELECT 
  tasks.title           AS    Task
  , categories.title    AS    Category
  , due_date            AS    Dued
  , is_done             AS    Done
FROM
  tasks
INNER JOIN categories
  ON tasks.category_id = categories.id;
