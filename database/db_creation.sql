DROP TABLE IF EXISTS tasks, categories;

CREATE TABLE categories (
  id              INT           NOT NULL            AUTO_INCREMENT
  , title         VARCHAR(30)   DEFAULT 'my_tasks'  UNIQUE
  , PRIMARY KEY (id)
);

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

-- INSERT INTO categories() VALUES();
-- INSERT INTO tasks (title, due_date) VALUES ('Teemu ja team Dodo', '2020-11-20 10:00:00');
INSERT INTO categories() VALUES();
INSERT INTO categories (title) VALUES ("database course"); 
INSERT INTO tasks (title, due_date, description, priority, category_id) VALUES ('dodo backend', '2020-11-25 21:00:00', '', 3, 1),
('dodo backend 2', '2020-12-20 21:00:00', 'some additional info', 3, 2),
('dodo front', '2020-12-05 15:00:00', 'almost ready by this time', 2, 1);

SELECT 
  tasks.title           AS    Task
  , categories.title    AS    Category
  , due_date            AS    Dued
  , is_done             AS    Done
FROM
  tasks
INNER JOIN categories
  ON tasks.category_id = categories.id;

-- curl -X POST -d "{\"title\": \"add task\", \"due_date\":\"2020-11-23 21:00:00\", \"category_id\":2}" -H "Content-Type:application/json" http://localhost:8080/tasks
INSERT INTO tasks (title, due_date, description, priority, category_id) VALUES ('dodo backend 2', '2020-11-23 21:00:00', '', 3, 2);
