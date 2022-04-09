# Build step #1: build the React frontend
FROM node:lts-alpine as build-react

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# copy all the files neaded for the frontend build
COPY ./frontend/package.json  .
COPY ./frontend/package-lock.json  .
COPY ./frontend/src ./src
COPY ./frontend/public ./public

# build the frontend app
RUN npm install
RUN npm run build

# Build fast api image
FROM python:3.9

# Set environment varibles accessible from the outside also after build
ENV PYTHONUNBUFFERED 1
WORKDIR /code

# define env variable that have to be set from outside (eg docker compose)
# args are not editable after app build
ARG API_KEY

# Install dependencies
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the code into the container
COPY ./main.py /code/
COPY ./db/ /code/db/
COPY ./core/ /code/core/
COPY --from=build-react ./app/build /code/frontend/build/

# expose the port where you will call load the app from the browser
EXPOSE 80

# self starting app after build
# if the app its build directly from this dockerfile then the 80 port will not be automatically linked
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
