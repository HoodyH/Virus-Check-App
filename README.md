# Virustotal

An app to check if a certain website it is malicious or not, 
the Backend it is built with Fastapi and the Frontend with React, all deployed as docker container.

The back end will validate the user request via virustotal api.

## Run the application
before start make sure that you have docker installed on your system,
if not [install docker](https://docs.docker.com/engine/install/) on your pc.

define a .env file in the root of the project with your personal virustotal api key inside,
it should look like the following example.
```conf
API_KEY=you_api_key
```

Now open a terminal INSIDE THE PROJECT FOLDER, at the same level of the current readme that you are reading
and with docker installed in your system execute the following command.
```bash
docker-compose up
```

Wait a bit after command ends to let the containers start up.

Enjoy you application at: http://localhost :)


## Project Structure
Each piece of code is commented to explain how it will work, the following details are about the main modules

### Backend
The backend its built with [fastapi](https://fastapi.tiangolo.com/)

In this application there are 2 endpoints:

- POST **/api/check** to submit a request, 
this endpoint it is responsible to make the request on virustotal api and save the result on the database
  - Content-Type: application/json 
  - body: {"target": "1.1.1.1"}
  
- GET **/api/items** to get the list the request made
  - Content-Type: application/json 

### Frontend
The frontend is built with [React](https://reactjs.org/docs/getting-started.html) 
as an independent app

The website design its on [bootstrap for react](https://react-bootstrap.github.io/)

To know how to build/deploy/update the app read the [frontend/readme](./frontend/README.md)

### Database 
The database implementations it is the standard one provided by 
[sqlalchemy](https://docs.sqlalchemy.org/en/14/core/api_basics.html), 
all the implementation of the database it is inside the `db` folder. 
What it's inside the db it is a FULL STANDARD IMPLEMENTATION to know more about this read the 
[fast api documentation](https://fastapi.tiangolo.com/tutorial/sql-databases/)

The database chosen it's postgres, and it's inside a container built by the docker compose.
The db connection string for sqlalchemy is this `postgresql://postgres:postgres@localhost/postgres`

Since the image is the official one see the [postgres image here](https://hub.docker.com/_/postgres/)

### Docker
The app will be built with docker with docker-compose.
To use docker you need to [install docker](https://docs.docker.com/engine/install/) on your pc.

Here we are simply building the fastapi and the React app and espouse the full website on 80 port

Files follow the full standard documentation
- Dockerfile -> [docs](https://docs.docker.com/engine/reference/builder/)
- docker.compose.yml -> [docs](https://docs.docker.com/compose/compose-file/)

To build and deploy the app from terminal just run: `docker-compose up`

If you want to recompile the new changes you have to delete the containers and the images that you have to re-build


### Tests
To run test you have to install pytest, fastapi implements a test framework built on top of pytest.
As always I've implemented the test as the official documentation want, so you can check the 
[fastapi testing docs](https://fastapi.tiangolo.com/tutorial/testing/) 
and more descriptions can be found on the code in the `test.py` file


How to run the tests:
```bash
python -m pip install pytest
python -m pytest
```

## File structure
Explanation of each file in the project structure
```text
├── backend
│   ├── core
│   │   ├── models.py the incoming request model
│   │   └── virustotal.py the api calls to the virustotoal api
│   │
│   ├── db
│   │   ├── crud.py create read update delete operations
│   │   ├── database.py the database connection stuff
│   │   ├── models.py the db tables implementation (columns)
│   │   └── schemas.py pydantic interfaces to access the data
│   │
│   ├── Dockerfile build all the backend
│   ├── requirements.txt all the dependencies of the backend (python stuff)
│   └── test.py unit test implemented for pytest https://fastapi.tiangolo.com/tutorial/testing/
│
├── frontend
│   ├── public a folder with public static assets
│   │
│   ├── src
│   │   ├── components
│   │   │   ├── check.js the component that display the check form
│   │   │   ├── error.js the component that display the error on wrong url/ip
│   │   │   ├── list.js the component that display the list with the recent requests
│   │   │   └── result.js the component that display the result with the data
│   │   ├── index.css the only style file of the all app
│   │   └── index.js the main app code with the backed api interrogations and the dispatcher to components
│   │
│   ├── Dockerfile build all the frontend
│   ├── package.json all the dependencies of the package frontend (node stuff)
│   └── package-lock.json all the list dependencies of the dependencies locks (node stuff)
│
├── .env the secret file where to put the api token
├── .gitignore all the stuff that have to be excluded from git, eg secrets or db files
└── docker-compose.yml the file to build everything
└── Procfile config file for heroku cloud (not needed in this project, used just to share the development)
```
