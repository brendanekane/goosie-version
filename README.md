## Installation

create a .env file from the example

create a user with password and CREATED_DB privileges with psql-cli

```bash
psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"
```

cd into backend

run the following commands

```bash
# install node modules
npm install

# create the database
npx dotenv sequelize db:create

# migrate tables
npx dotenv sequelize db:migrate

# seed database
npx dotenv sequelize db:seed:all

# start api server
npm start
```

open another terminal tab and cd into frontend

run the following commands

```bash
# install node modules
npm install

#start the react server
npm start
```
