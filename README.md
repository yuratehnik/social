# Social

To start the project, you need to make the next steps:
1. Go to "../social/server" folder in your terminal,where project is placed, and run "**npm i**".
2. Then, after finish run "**npm start**" and check for errors.
3. Create new MySQL database for project with collate utf8_general_ci.
4. Fill ./config/db.config.js file with your credetials
5. If you want not to restart server after changes, you need just run "**forever -w ./server.js**".

Next step, we need to actualise React App, for this:

1. Go to "../social/app" folder in your terminal, where project is placed, and run "**npm i**".
2. Run "**npm start**". Browser should open without errors and show working app.
