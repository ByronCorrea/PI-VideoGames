# 🎮 PI- Videogames 🎮

Responsive web page created with the Raw API. Pagination, alphabetical filtering, rating,
gender.

![preview img](/preview.png)

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Replace postgresuser and postgrespassword with your own credentials to connect to postgres. This file will be ignored when uploading to github, as it contains sensitive information (credentials).

Additionally, it will be necessary to create a database called videogames from psql

**IMPORTANT!**: To be able to use this external [rawg](https://rawg.io/apidocs) API it is necessary to create an account to obtain an API Key that should then be included in all the requests that we make to rawg simply by adding `?key={YOUR_API_KEY}` at the end of each endpoint. Add the key in the `.env` file so that it is not uploaded to the repository for security reasons and use it from there.

#### Necessary technologies:

- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

#### Frontend

- Main: "/"

- Home path: "/home"

- Game detail path: "/detail/:id"

- Game creation path: "/create"

#### Database

- [ ] Videogame:

  - ID: \*
  - Name \*
  - Descripction \*
  - Release date
  - Rating
  - Plataforms \*

- [ ] Genre:

  - ID
  - Nombre

#### Backend

- [ ] **GET /videogames**:

- [ ] **GET /videogames?name="..."**:

- [ ] **GET /videogame/{idVideogame}**:

- [ ] **GET /genres**:

- [ ] **POST /videogame**:
