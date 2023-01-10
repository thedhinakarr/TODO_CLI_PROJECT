----> TO_DO Application with god level integrations. <--------\

I'm just gonna use this as a log as to everything which is gonna be built on to this application.

/ 10/01/2023 /

BUILDING THE SERVER.

1. First we gotta decide on routes. Understanding the program flow on a superficial level is vital.
2. Setup the server. Setup the routine postman calls to this too.

3. Now, we step into the app.js file and setup the router.

        ALSO REMEMBER TO TEST ALL ROUTES BEFORE WRITING LOGICS.
        a.We have a user route--> All the registration and login logics go here,
        We go set that up now.

            server/Controllers/users/index.js is the address --> DONE. 
        
        b.Do the same thing for todo route.
          --> DO IT.  DONE.

4. MIDDLEWARESSSSSSS
    NEED: Efficient validations. We will be importing certain js libraries for these.

        4.1) We will be having three validations
                1.UserRegistrationValidations() --> WILL Be used in user register controller in server/controllers/users/index.js

                2.UserLoginValidations() --> will be used in user login controller in server/controllers/users/index.js

                3.AddTaskValidation() --> will be used in todo add task controller in server/controllers/todo/index.js

                Afterr you write the logics, more like joining dots....
                    you need to implement them in the index.js of user controller and todo controller.


5. Write the registration logic in /api/user/register.

        Inthis, dumb inputs are checked, passwords are hashed and a success message is sent.
        THE bcrypt package we are using here, is only for hashing the password.
        Password once hashed can never be "un-hashed" i.e it's kinda like a chemical reaction.
        Pardon my bad analogy here. But you get the point...


6. Write the login logic in /api/user/login.

    JSON WEB TOKENS.
    













