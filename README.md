# Lab 13

##  Documentation
Include your travis badge at the top of your `README.md` file
In your `README.md`, describe the exported values of each module you have defined. Every function description should include it's airty (expected number of parameters), the expected data for each parameter (data-type and limitations), and it's behavior (for both valid and invalid use). Feel free to add any additional information in your `README.md` that you would like.
Submit images of your whiteboard and a hard copy of the code map as part of this assignment. If you can take a clear picture of the code map, that will suffice.

- whiteboard codemap is under assets/codemap.jpg
- Overall, the authentifcation process acts as a middleware to check if a condition is true/false. If true proceed to the next callback function. If false, return errors.
- Inside the auth function:
- - The model create the schema
- - Uses bcrypt methods to encrypt the password before saving into the system.
- - Runs authentification.
- - and generate token.
- The middleware create a {user:password} object to send into the model to authenticate the user.
- - runs the authenticating progress with the generated token fron model.js
- Lastly, the Router.
- - import both of the middleware.js and model.js.
- - return error if false information is being entered.
- - Defines the routes of the 2 signin and signup.

