# Album-review

The premise of this app is that users can sign up and once signed in they view a list of albums that other users have uploaded. They can also add their own album when they press the add buttons tab on the navbar. This will take them to a screen where they enter a form of their preferred choice of album.
Future features

•	I'm eventually going to add an upload link so the user can upload an image of their chosen album.

•	I’m also going to add a ratings system where users can rate another users album and create a system where the albums with the highest amount of rating will be shown at the top.

•	I'm also going to include a Spotify api that will give users a preview of the top songs from that album.

# Tech stack
#### Back-end
•	Node
•	Nodemon
•	Morgan
•	Mongoose
•	Mongodb
•	Bcrypt
•	Body-parser
•	Express
•	http-proxy-middleware
•	jsonwebtokens

#### Front-end
•	React
•	React-router-dom
•	React context api
•	Axios

## Process

### Back-end
•	For this project I used Node, which is server-side platform that allows Javascript users to run server-side code on the web. With the constantly updating code we need something that will track this and prevent us from stopping/restarting the server, so I installed a package called Nodemon.

•	To initialise my app I imported Express, which allows my app to make http requests such as GET and POST. This allowed me to get a list of albums, add a new album, update an album and delete an album.

•	Once Express has been added I can create routes for user and albums respectively. Each will have GET method which will get the list of albums/users, POST that will add a new album/register a new user/login a user and also to check if a user is logged in. PATCH allows me to update an album, and DELETE will allow me to delete an album.

•	To make sure these routes are working I used Postman, which is an application installed locally on my computer that will test each http request and return to me the requested endpoint or an error.

•	The data we get back from the request is in Json format and is not easily readable, so to make it understandable we have to install a middleware-package called Body-parser. This will parse the body from the incoming request we get from postman and allow me to use req.body.

•	Next I created a database that will store the lists of albums and users respectively, the database I chose to use is Mongodb. To connect it within my code I use a package called Mongoose.

•	Now that Mongoose has been added I can create a userSchema and an albumSchema, which connects to a Mongodb collection. This will show how I want entries in the document to look and these will be stored in a folder called models.

•	The models have been created and now we can create controllers, this is where the routes functions are defined. The first function is the user_signup, which is a POST request. I have used the async/await keywords, which are a pair of function keywords that when the async keyword is declared the possibility of await is expected. This makes the code run asynchronously.

•	Within the async/await block I will use a try/catch block, which when code is inserted into the try block it will run the block of code and if it catches any errors the catch block will execute a response status of 500.

•	Mongoose gives us some methods to use on our Album/User model objects such as findOne(), findByIdAndDelete(), findById() that enables me to perform different action when necessary on the model objects.

•	As I'm working with http requests, I need a way of getting a visual representation of what the intended requests I'm making is and what status I get back to make sure its been successful. To do this I install a middleware package called Morgan, which will log the requests and the status onto my terminal.

•	In the user_signup function, once a new user has been created I must make sure that their account credentials are secure, especially their password. I will install a package called Bcrypt that will make the password undecipherable (hash), it does this by generating salt that does the deciphering. I pass that to a hash function that comes with Bcrypt, and pass that to the new user object model.

•	Each new user will given a unique id, this is given to us by Mongoose through the objectId function.

•	Another package that was used in the user_login and user_isLoggedIn is the jsonwebtoken. This will assign a session token, which is some randomised text assigned to a user objectId. It gives that user the ability to log in and stay logged in, as long as they have been given a session token.

•	Once the user routes have been created, I made a custom middleware that checks the authentication of a user. It will either enable or deny them access to certain pages depending on if they have session token in the request header. I’ll pass this check_auth middleware onto the routes that need authentication to access their pages.

•	Similarly we do the same for album controllers.

•	The back-end side of things is finished for now; I can start to work on the front-end. I'll be using React.js, which is a Javascript library that gives a view layer of a MVC application (Model View Controller). To initialise React I will use Create-react-app, which will install a pre-configured app.

### Front-end
•	I remove unnecessary imports from App.js and index.js such as the logo.svg and the jsx within app.js so its left with a blank page on the screen.

•	I start by creating a basic layout for the app. First by creating a navbar that will contain a tab for register/login. Once the user has been authenticated and logged in the navbar will give them the option to view an album and to add an album. I will also create components for register, login, add-album, view-album, and logout.

•	Next I created a data store for the data about the user. I use React context api, which provides a way to make particular data available to all components throughout the component tree, no matter how deeply nested that component may be. To do this I create a file called UserContext and in the file I import createContext from React, as React give us access to this, and finally I export it.

•	Now the context has been created, in the App.js I'm going to install a package called React-router-dom that allows me route between different pages React-router gives me access to { BrowserRouter, Switch, Route }. Firstly I’ll nest all my components within the BrowserRouter, Switch will then wrap around the components. Finally I’ll change all the components from their jsx tags to Route tags.

•	Now with React to avoid having to pass down data through different components, they came up with React-hooks. You can import useState() from React, which gives you access to the current state value that contains the data you will use and a function that lets you set the data. Within the setState() function I will declare an object within it with the value user and token and set them to undefined.

•	Now that the user state has been set, I need to create the authorization options for the page and also I need to create action for the buttons within the navbar. To do that I imported useHistory from React-router, which is also a react hook that allows the page redirection.

•	I'm going to start to create the functionality for the register page. First I’m going to set the state for the email, password, passwordCheck, displayName so their value can be recorded when someone types in the input fields. Secondly, I’ll import usercontext so I have the user data available.

•	To be able to retrieve data from the back-end to front-end I’m going to use a package called Axios, which is a promise based HTTP client for the browser and Node.js. Axios makes it easy to send asynchronous HTTP requests to REST endpoints.

•	I declare a function called submit once a user signs-up they're immediately logged in.

•	Within an object set as newUser I’m going to put the state of email, password, passwordCheck, and displayName. Once this is done I can make a post request using Axios, the first parameter is the url we want to access and the second parameter will be whatever we put in the request body, in the is case it will be the newuser.

•	To get the user to be logged in once they register, I set the userData to get the token. Once the data has been received, I will pass it to the localstorage.setIem which you give a key name and specify the value, localStorage.setItem("auth-token", loginRes.data.token).

•	Similarly the same is done with the login page.

•	Back to App.js, once we have access to the userdata we can use React-context as a jsx tag and nest it directly under the BrowserRouter, which has passed the values userData and setUserData. This allows all the children components to have access to the userdata.

• To allow access to certain routes within the app I made a function called checkedLoggedIn, which gets the token from the localstorage and passes the token to the header of the req body if a token exists. If it exists this means a user is logged in, which means they can access the authorised routes.
