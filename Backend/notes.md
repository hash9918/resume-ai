token blacklisting
when we want to have a logout functionality in our application, we can use token blacklisting. This means that when a user logs out, we add their token to a blacklist, and any subsequent requests with that token will be denied access. While logout if we only delete the token from the client side, the token will still be valid until it expires, which if extracted by an attacker, can be again used to login in to the account.

routes only maps the endpoints to the controllers, it does not contain any logic. The logic is contained in the controllers. This separation of concerns makes the code more organized and easier to maintain.

here in auth.controller.js we have a middleware which does some logic and then next is there to move the request to the next middleware or controller. In this case, we are using the authMiddleware.authUser middleware to check if the user is authenticated before allowing them to access the getMeController. If the user is not authenticated, they will not be able to access the getMeController and will receive an error response.

in the authroute we have setup the two middleware first is authMiddleware.authUser which checks if the user is authenticated and then if the user is authenticated, it will call the getMeController which will return the user details. If the user is not authenticated, it will return an error response.

