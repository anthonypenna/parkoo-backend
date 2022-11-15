# Parkoo backend

Restful API service for the Parkoo app.

Uses Typescript, Express, MongoDB and Docker.

When pushing to the main branch, a Github action will automatically deploy the latest version to Heroku.

## Getting started

You can start the container using:

```
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

This will build the Docker image and start the container in detached mode

For convenience, a makefile is included, with some useful commands for streamlining the process.

### Starting the container

```
$ make start
```

### Starting the container without detaching

```
$ make dev
```

### Stop the container

```
$ make stop
```

### Getting ready for deployment

You're going to need a few environment variables which are listed in the `.env` file.

**NOTE**: The `.env` environment variables are for DEVELOPMENT only. You will need to replace them with the proper values when deploying.
