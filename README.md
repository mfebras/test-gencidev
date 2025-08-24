## About ##
Test with Express Js v5

## Installation ##
* Open project in terminal
* Copy .env.example to .env
* Run init database `node src/database/init.js`
* Run migration `npx knex migrate:latest`
* Run seeder `npx knex seed:run`
* Run `npm install`
* Run `npm run dev`
    * Make sure nodemon already installed globally: `npm i nodemon -g`

## Documentation ##
* When `NODE_ENV=development` you can view the API documentation in `/docs` path, for example `http://localhost:3000/docs`

## Run Test ##
* Run `npm test`
* Run specific test: `npm test auth`

## Project Structure ##
```
├── src
|   ├── database
|   |   ├── migrations
|   |   ├── seeders
|   |
|   ├── docs
|   |   ├── paths       (swagger route definition)
|   |   ├── schemas     (swagger request/ response definition)
|   |
|   ├── lang
|   |   ├── locales     (multi language dictionary)
|   |   |	├── en.json
|   |
|   ├── middlewares
|   |
|   ├── modules
|   |   ├── module_name
|   |   |   ├── index.js                      (module route)
|   |   |   ├── module_name_handler.js        (module controller)
|   |   |   ├── module_name_repository.js     (module query)
|   |   |   ├── module_name_validation.js     (module request validation)
|   |
|   ├── routes
|   |
|   ├── services  (3rd party function)
|   |
|   ├── tests
|   |   ├── factories
|   |   |   ├── name_factory.js     (generate payload for test)
|   |
|   ├── utils     (helper function)
|   |
|   app.js
|
```
