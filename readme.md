# OneHand App
It is an application that makes you buy, sell, exchange and donate items with others 


## How to run

This application is written in javascript using environment Node.js so to set up 
### Step 1:
you shall install all the dependencies in the root/backend && root/frontend and that is by write
```bash
npm install 
```

### Step 2 :
You shall specify your env variables by creating 2 files of the name ``.env`` :

#### * First file is at ``root/backend`` you shall write
```

PORT=${PORT_YOU_WANT_TO_LISTEN_ON}

DATABASE_CONNECTION_STRING=${CONNECTION_STRING_TO_YOUR_DATABASE}

API_STRIPE_SECRET_KEY =${THE_SECRET_KEY_TO_STRIPE_API}


```
#### * Second file is at ``root/frontend`` you shall write
```

REACT_APP_PORT=${THE_SAME_PORT_AT_BACKEND}

REACT_APP_API_STRIPE_PUBLISH_KEY =${THE_PUBLISH_KEY_TO_STRIPE_API}


```



## Docker
There are ``Dockerfile`` which contains all the info and base layer of the app and ``docker-compose.yml`` which maintains the API which is ``mongo`` and the application.  

### To run the ``docker-compose.yml``:

```bash
docker-compose build --no-cache # -d if you want it in detached mode
docker-compose up
```
### To stop running
```
docker-compose down
```

### To run ``Dockerfile`` alone :

```
docker built -t <USERNAME>/<IMAGENAME>:<TAG> . 
docker run -p <NEWPORT>:3000 <USERNAME>/<IMAGENAME>:<TAG> # it is 3000 as it is the default

```

# NOTICE :
when using docker environment and want to link the frontend to it just put in ``root/fronten/.env`` file ``REACT_APP_PORT=<NEW_PORT_YOU_HAVE_SELECTED>``


