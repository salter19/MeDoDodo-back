# MeDoDodo-back

Todo software frontend repo for course tamk-4A00EZ61-frontend.

# How to save new task

You can now save new task into the database via commandline.
The required items are:

- title (String)
- due_date (String, yyyy-mm-dd 00:00:00)
  The optional items are:
- description (String)
- priority (String)
  In the future also category_id will be optional item.

The curl command given should go something like this:
`curl -X POST -d "{\"title\": \"add task\", \"due_date\":\"2020-11-23 21:00:00\", \"description\":\"Create save task functionality for Dodo.\"}" -H "Content-Type:application/json" http://localhost:8080/tasks `

Notice that for the command to work use double quotes and format the due_date like in the example.
