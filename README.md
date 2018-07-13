## SKATESPOT FINDER

Skatespot Finder allows for user submitted skate spots which include a location, rating, image, and notes.
Anyone can see spots that users submit but one must be logged in to submit, edit, or delete a spot.

A deployed version of the app can be found at:

https://skatespots.netlify.com/

### Here are some images of the app:

#### Intial Page:
![capture1](https://user-images.githubusercontent.com/16858183/39651054-560ddec6-4f9f-11e8-92bf-7fb8f168e641.PNG)

#### Logged in and viewing a spot:
![capture2](https://user-images.githubusercontent.com/16858183/39651062-5abc8b8e-4f9f-11e8-8771-f38537327c66.PNG)

#### About section:
![capture3](https://user-images.githubusercontent.com/16858183/39651066-5e15068a-4f9f-11e8-9e49-18ac3ed2bb14.PNG)

## Development info:

The application is using the MERN stack (mongodb, express, react, node.js),
along with react-google-maps (https://github.com/tomchentw/react-google-maps),
and redux for state management

The main component is Map which generates and rerenders the google map based on state,
the other critical component is the header which contains the login / logout / register operations

### API

Authentication is done through the auth router, using passport and bcrypt
- POST /users creates a user
- POST /login creates a new token from user credentials
- POST /refresh creates a new token from old token

There is a spot router which is used for CRUD operations
- GET /spots gets all spots in the database
- GET /spots/:id gets a specific spot

These routes are behind jwt authentication
- POST /spots creates a spot
- PUT /spots/:id updates a specific spot
- DELETE /spots/:id deletes a specific user's spot as specified
