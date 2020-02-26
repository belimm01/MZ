**Required:**

1. [Npm install](https://www.npmjs.com/get-npm) - recommended 3.5.2 version 
2. [Node install](https://nodejs.org/en/download/) - recommended v8.10.0
3. [Docker install](https://www.docker.com/products/docker-desktop)
4. [Docker owncloud install](https://hub.docker.com/_/owncloud)

**Optional**
1. [Postman](https://www.getpostman.com/downloads/) - to sent json to API

**Set up owncloud docker:**
1. run this command `docker run -d -p 80:80 owncloud`
2. start container 
3. open browser and navigate to *http://localhost:80/*
4. create owncloud account with **login: _admin_ and password: _admin_**
5. **Allow cors** to *localhost:8080* execute owncloud script in `server/owncloud.sh [NAMES_CONTAINER]` path.

**Start project:**
1. Start owncloud docker container
2. Project
  1. In project open server folder and run this command: `node producer.js`
  2. In project open client folder and run this command: `npm i` then `npm run serve`
3. Open postman and create POST request to `localhost:3000/accreditation` with sample json in the project *"client/src/assets/fake_data/akreditace-struktura.json"*
4. Navigate to `http://localhost:8080/?correlationId=9a342d6f-8251-4385-a4e4-65d359759445&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` with email and token params and check the app. You can check result in localhost:80 in Document folder :) 

**Init internal network**
`docker network create internal_mz`
    
**RabbitMq docker:**
Rabbit web UI - `http://localhost:15672`
Default username and password of `guest/guest`