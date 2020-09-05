# Album-review


The premise of this app is that users can sign up, and once signed in they view a list of allbums that other users have uploaded,
they can also add their own album when they press the add buttons tab on the navbar, this will take them to a screen where they enter a form of their preferred choice of album.


## Future features

- I'm enventuallly going to add an upload link so the user can upload an image of their chosen album.
- Im also going to add a ratings systems where other users can rate another users album, and create a system where the albums with the highest amount of rating will be shown at the top.
- I'm also going to include an spotify api that will give users a preview of the top songs from that album.


## Tech stack

#### Back-end
- Node
- Nodemon
- Morgan
- Mongoose
- Mongodb
- Bcrypt
- Body-parser
- Express
- http-proxy-middleware
- jsonwebtokens


#### Front-end
- React
- React-router-dom
- React context api
- Axios


## Process

#### Back-end
- For this project I used Node, which is server-side platform that allows Javascript users to run server-side code on the web, and with the constantly updating code we need something will track this and prevent us from stopping/restarting the server so I installed a package called nodemon

- To initialise my app I imported Express which allows my app to make http requests such as GET and POST, which will allow me to get a list of albums, add a new album and update and delte an abum.

- Once Express has been added I can create routes for user and albums respectively, each will have GET method thats will get the list of albums/users, POST that will add a new album/register a new user/login a user and also to check if a user is logged in, PATCH allows me to update an album, and DELETE will allow me to delete an album.

- To make sure these routes are working I use Postman, which is an applcation, instaleed locally on my computer that will test each http request and return to me the requested endpoint or an error.

- The data we get back from the request is in json format, and is not easily readable, so to make it understandable we have to install a middleware-package called Body-parser which will parse the body from the incoming request we get from postman and allow me to use req.body

- Next I created a database which will store the lists of albums and users respectively, the database I chose to use is Mongodb, to connect it within my code I use a package called Mongoose

- Now that Mongoose has been added I can create a userSchema and a albumSchema which connects to a Mongodb collection, which will show how I want entries in the document to look and these will be stored in the a folder called models.

- The models have been created and and now we can create controllers and this where the routes functions are defined. The first function is the user_signup, which is a POST request. I have used the async/await keywords, which are a pair function keywords that when the async keyword is declared the possibility of await is expected. This make the code run asynchronously.  

- Within the async/await block I will use a try/catch block, which when code is inserted into the try block it will run the block of code and if it catches any errors the catch block will execute a response status of 500.

- Mongoose gives us some methods to use on our Album/User model objects such as findOne(), findByIdAndDelete(), findById() that enables me to perform different action when necessary on the model objects

- As I'm working with http requests, I need a way of getting a visual representation of what the intended requests I'm making is and what status I get back to make sure its been successful, to do this I install a middleware package called Morgan, which will log the requests and the status onto my terminal.

- In the controller user_signup, once a new user has been created to ensure that their account credentials are secure especially their password, I will install a package called Bcrypt that will make the password undecypherable (hash), it does this by generating salt that does the decyphering, and i pass that to a hash function that comes with Bcrypt, and pass that to the new user object model.

- Each new user will given a unique id, this is given to us by Mongoose through the objectId function.

- Another package that was used in the user_login and user_isLoggedIn is that jsonwebtoken which will assign is session token, which is some randomised text, that are assigned to a user objectId and give that user ability to log in and stay logged aslong as they have been given a session token.

- Once the user routes have been created, I made a custom middleware which will check the authentication of a user and will either enable or deny them access to certain pages depending on if they have session token in the request header. and i'll pass this check_auth middleware onto the routes that need authentication to access their pages.

- Similiarly we do the same for album controllers.

- Now that the back-end side of things is finished for now, I can start to work on the front-end. I'll be using React.js, which is a Javascript library, which is a view layer of a
MVC application (Model View Controller). To initialise React i will use yarn create react-app, which will installed a pre-configurated app.

- I remove unnecessary imports from app.js and index.js such as the logo.svg and the jsx within app.js so just left with a blank page on the screen.

- I start create a basic layout for the app, I start by making navbar that will contain the the tab for sign-up/login/ and once the user has been authenticated and logged in the navbar will give them the option to view album and to add album.


#### Front-end
- Next I create a data store for the data about the user, I use React context api, which provides a way to make particular data available to all components throughout the component tree no matter how deeply nested that component may be. To do this I create a file called UserContext and in the file I imoprt createContext from React as React give us access to this and finally I export it.







