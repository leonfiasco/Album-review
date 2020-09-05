# Album-review


The premise of this app is that users can sign up, and once signed in they view a list of allbums that other users have uploaded,
they can also add their own album when they press the add buttons tab on the navbar, this will take them to a screen where they enter a form of their preferred choice of album.


## Future features

- I'm enventuallly going to add an upload link so the user can upload an image of their chosen album.
- Im also going to add a ratings systems where other users can rate another users album, and create a system where the albums with the highest amount of rating will be shown at the top.
- I'm also going to include an spotify api that will give users a preview of the top songs from that album.


## Tech stack

#### Back-end
- node
- nodemon
- morgan
- mongoose
- mongodb
- bcrypt
- body-parser
- express
- http-proxy-middleware
- jsonwebtokens


#### Front-end
- react
- react-router-dom
- react context provider
- axios


## Process
-For this project I used node, which is server-site platform that allows Javascript users to run server-side code on the web, and with the constantly updating code we need something will track this and prevent us from stopping/restarting the server to see this affect I installed a package called nodemon

- To initialise my app I imported express which allows my app to make http requests such as GET and POST, which will allow me to get a list of albums, add a new album and update and delte an abum.

- Once express has been added I can create routes for user and albums respectively, each will have GET method thats will get the list of albums/users, POST that will add a new album/register a new user/login a user and also to check if a user is logged in, PATCH allows me to update an album, and DELETE will allow me to delete an album.

- To make sure these routes are working I use postman, which is an applcation, instaleed locally on my computer that will test each http request and return to me the requested endpoint or an error.

- The data we get back from the request is in json format, and is not easily readable, so to make it understandable we have to install a middleware-package called body-parser which will parse the body from the incoming request we get from postman and allow me to use req.body

- Next I created a database which will store the lists of albums and users respectively, the database I chose to use is Mongodb, to connect it within my code I use a package called mongoose

- Now that mongoose has been added I can create a userSchema and a albumSchema which connects to a Mongodb collection, which will show how I want entries in the document to look and these will be stored in the a folder called models.

- The models have been created and and now we can create controllers and this where the routes functions are defined. The first function is the user_signup, which is a POST request. I have used the async/await keywords, which are a pair function keywords that when the async keyword is declared the possibility of await is expected. This make the code run asynchronously.  

- Within the async/await block I will use a try/catch block, which when code is inserted into the try block it will run the block of code and if it catches any errors the catch block will execute a response status of 500.

- As I'm working with http requests, I need a way of getting a visual representation of what the intended requests I'm making is and what status I get back to make sure its been successful, to do this I install a middleware package called morgan, which will log the requests and the status onto my terminal.

- In the controller user_signup, once a new user has been created to ensure that their account credentials are secure especially their password, I will install a package called bcrypt that will make the password undecypherable (hash), it does this by generating salt that does the decyphering, and i pass that to a hash function that comes with bcrypt, and pass that to the new user object model.

- Each new user will given a unique id, this is given to us by mongoose through the objectId function.

- Another package that was used in the user_login and user_isLoggedIn is that jsonwebtoken which will assign is session token, which is some randomised text, that are assigned to a user objectId and give that user ability to log in and stay logged aslong as they have been given a session token.

- Once the user routes have been created, I made a custom middleware which will check the authentication of a user and will either enable or deny them access to certain pages depending on if they have session token in the request header. and i'll pass this check_auth middleware onto the routes that need authentication to access their pages. 

