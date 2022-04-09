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
docker-compose run
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

### Docker
The app will be built with docker with docker-compose.
To use docker you need to [install docker](https://docs.docker.com/engine/install/) on your pc.

Here we are simply building the fastapi and the React app and espouse the full website on 80 port

Files follow the full standard documentation
- Dockerfile -> [docs](https://docs.docker.com/engine/reference/builder/)
- docker.compose.yml -> [docs](https://docs.docker.com/compose/compose-file/)

To deploy the app from terminal just run: `docker-compose run`


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
