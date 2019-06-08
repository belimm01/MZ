**Required:**

1. [Npm](https://www.npmjs.com/get-npm) - recommended 3.5.2 version 
2. [Node](https://nodejs.org/en/download/) - recommended v8.10.0
3. [Docker](https://www.docker.com/products/docker-desktop)
4. [Docker owncloud](https://hub.docker.com/_/owncloud)

**Optional**
1. [Postman](https://www.getpostman.com/downloads/) - to sent json to API

Set up owncloud docker: 
1. run this command `docker run -d -p 80:80 owncloud`
2. start container 
3. open browser and navigate to http://localhost:80/
4. create owncloud account with **login: _admin_ and password: _admin_**
5. Allow cors to localhost:8080
   1. in terminal run this command: docker exec -it [CONTAINER_NAME] bash
   2. navigate to config dir: cd config
   4. print config.php file with command: cat config.php and copy your credetials
   3. run this command with your credentials: 
   ```
   echo  "<?php
   " '$CONFIG' "= array (
     'instanceid' => '',
     'passwordsalt' => '',
     'secret' => '',
     'trusted_domains' => 
     array (
       0 => 'localhost',
     ),
     'cors.allowed-domains' => [
       'http://localhost:8080',
     ],
     'datadirectory' => '/var/www/html/data',
     'overwrite.cli.url' => 'http://localhost',
     'dbtype' => '',
     'version' => '',
     'logtimezone' => 'UTC',
     'installed' => true,
   );" >> config.php
      chmod 777 config.php
   ```
   then run exit and restart docker container

Start project: 
1. Start owncloud docker container
2. Project
  1. In project open server folder and run this command: `node app.js`
  2. In project open client folder and run this command: `npm run serve`
3. Open postman and create PSOT request to `localhost:3000/api/v1.0/owncloud/` with sample json in the project *"client/src/assets/fake_data/akreditace-struktura.json"*
4. Navigate to localhost:8080 and check the app. You can check result in localhost:80 in Document folder :) 
