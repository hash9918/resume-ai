token blacklisting
when we want to have a logout functionality in our application, we can use token blacklisting. This means that when a user logs out, we add their token to a blacklist, and any subsequent requests with that token will be denied access. While logout if we only delete the token from the client side, the token will still be valid until it expires, which if extracted by an attacker, can be again used to login in to the account.

routes only maps the endpoints to the controllers, it does not contain any logic. The logic is contained in the controllers. This separation of concerns makes the code more organized and easier to maintain.

