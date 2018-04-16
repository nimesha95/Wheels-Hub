[![Build Status](https://travis-ci.org/nimesha95/Wheels-Hub.svg?branch=master)](https://travis-ci.org/nimesha95/Wheels-Hub)

# Wheels-Hub
A platform that uses blockchain technology to store the information about 
vehicles, their insuarace claims

## Installation

This project requires both [Docker](https://www.docker.com/) and
[Node/NPM](https://nodejs.org/). After installing, download this repo and run
the following commands to install dependencies for the transaction processor:

```bash
cd {project directory}/processor
npm install
```

And these commands to install dependencies for and build the client:

```bash
cd {project directory}/client
npm install
```

## Running

### Sawtooth Components

Use the included docker compose file to spin up some default Sawtooth
components, including a validator and a REST API. Full instructions are
available in the
[Sawtooth Documentation](https://sawtooth.hyperledger.org/docs/core/releases/0.8/app_developers_guide/docker.html),
but all you really need to know is, from the project directory, run this
command to start Sawtooth up:

```bash
docker-compose up
```

And run this command to shut them down:

```bash
docker-compose down
```

Once running, you should be able to access the validator at
`tcp://localhost:4004` and the REST API at `http://localhost:8008`.

### Transaction Processor

In a new terminal window, start up the transaction processor:

```bash
cd {project directory}/processor
npm start
```

### Browser Client
In a new terminal window, start up the client:
Start the client simply by opening `localhost:3000` in any browser.

