# client-wall-app

# Wall APP #

[Travis CI](https://travis-ci.org/Salomari1987/client-wall-app/builds/) or https://travis-ci.org/Salomari1987/client-wall-app/builds

## Wall App Messaging Portal ##

## Start the app (Instructions)
After cloning (or Downloading) the project into your local do from the root repository
* ```sudo npm install -g bower```
* ```sudo npm install -g jest```
* ```npm install```   - to install dependancies
* ```npm run build``` or ```gulp build``` to build client files
* Install rest api server from repository [rest-wall-app](https://github.com/Salomari1987/rest-wall-app) and follow the steps in that repository to install and run server before proceeding with the next steps
* ```npm start```   	- to start the project and access the portal on localhost
* Access application on **localhost:8080**

## Linting
* Eslint used for linting based on hackreactor styling guide
To run the lint file do:
* npm run lint

## Testing
* all tests are in __tests__ folder
* full tests: ```npm test```

## Development:
To make development easier I have included the following:
* run tests (watch mode): ```npm run test:watch```
* build project (watch mode): ```gulp```
* run server (watch mode): ```npm run watch```

## Dependancies
You can find server side dependancies in package.json

### Testing suits
#### Front End
* Jest
* Enzyme
* chai
* sinon

## Features:
* Users have access to site wide wall
* Users can see wall as guests but cannot post messages
* Users can register a new account, receive a welcome email and login to site
* Loggin users can post messages to site wide wall
* Messages are shown to all users in real time

## Technologies:
* React
* react-router
* Alt.js Flux
* Server-side rendering
* Express server
* Socket.io
* React Bootstrap (in beta)

## Known issues:
* Current packages are a little outdated, especially react-router, which needs updating to latest version to resolve React.PropTypes warning
* The project is not yet ready to run in production. Planning to add checks for process.env.NODE_ENV to change backend url to production.
* State management needs improvement
* using session storage to store username and token, must resort to usage of higher order components and using the flux state store to broadcast state to different components
* password is being sent in clear text (resort to md5)
* Using setInterval inside function to update timing of messages, must move some of this work to workers instead.
* The design is not cross-browser compatible
