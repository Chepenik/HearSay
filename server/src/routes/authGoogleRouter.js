import express from "express";
import passport from "passport";

const authGoogleRouter = new express.Router();


// when a user clicks on the google login button, it will issue a request to this route.
// passport.authenticate will redirect the user to Google to allow the sharing of their information. 
// The "scope" tells google what pieces of information we wish to retrieve
authGoogleRouter.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

authGoogleRouter.get('/callback', passport.authenticate('google', 
  { 
    successRedirect: "/profile",
    failureRedirect: "/auth/failure"
  })
)

export default authGoogleRouter;