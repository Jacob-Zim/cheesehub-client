SKATESPOT FINDER

Skatespot Finder allows for user submitted skate spots which include a location, rating, image, and notes.
Anyone can see spots that users submit but one must be logged in to submit, edit, or delete a spot.

A deployed version of the app can be found at:

https://infallible-goodall-e2cc46.netlify.com/

Here are some examples of the app:

![Screenshot](https://imgur.com/SYEsCaq "Initial Page")

![Screenshot](https://imgur.com/PQDv1zp "Editing")

![Screenshot](https://imgur.com/AXgL2Bz "About")

The application is using the MERN stack (mongodb, express, react, node.js),
along with react-google-maps (https://github.com/tomchentw/react-google-maps),
and redux for state management

The main component is Map which generates and rerenders the google map based on state,
the other critical component is the header which contains the login / logout / register operations
