# Pull base image
FROM python:3.9

# Set environment varibles
ENV PYTHONUNBUFFERED 1
WORKDIR /code

# Install dependencies
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the code into the container
COPY ./main.py /code/
COPY ./db/ /code/db/
COPY ./core/ /code/core/
COPY ./frontend/build /code/frontend/build/

# expose the port where you will call load the app from the browser
EXPOSE 80

# self starting app after build
# if the app its build directly from this dockerfile then the 80 port will not be automatically linked
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
