# Celina Yousief IS24 Full Stack Competition

## PREREQUISITES

### Docker Compose
You will need `docker-compose` to run this application.
You can find comprehensive documentation on how to install `docker-compose` [here](https://docs.docker.com/compose/install/).

## HOW TO DEPLOY

1. After cloning the repository, navigate to the directory  `celina-yousief-IS24-full-stack-competition-req97073`
2. Run the following command:
    ``` 
    docker-compose up --build
    ```
    or
    ```
    docker-compose up --build db api client
    ```
    - You can stand up the containers individually by indicating them after `--build` as above

## HOW TO TEST
- You can access the homepage in your browser at `http://localhost:4000`
- You can interact with the api starting at `http://localhost:3000/api/product`
