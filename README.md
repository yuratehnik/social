# Social

To start the project, you need to make the next steps:
1. Go to "../social/server" folder in your terminal,where project is placed, and run:
```bash
npm i
```
2. Then, after finish run:
```bash
npm start
```
3. Create new MySQL database for project with collate utf8_general_ci.
4. Fill ./config/db.config.js file with your credetials
5. If you are having problems with connection to the database (in case with using mamp)
```bash
sudo ln -s /Applications/MAMP/tmp/mysql/mysql.sock /tmp/mysql.sock
```
6. If you want not to restart server after changes, you need just run:
```bash
forever -w ./server.js
```
Next step, we need to actualise React App, for this:

1. Go to "../social/app" folder in your terminal, where project is placed, and run:
```bash
npm i
```
2. After running of next command, browser should open without errors and show working app:
```bash
npm start
```

