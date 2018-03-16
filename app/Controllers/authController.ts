import {Response, Request} from 'express';
import passport  from 'passport';
import bcrypt    from 'bcrypt';

import _passport from '../passport/passport';
_passport(passport);

import User from '../models/user';
import validations from '../helpers/validations';


let auth = {
  // Render register page
  getRegister(req: Request, res: Response) {
    res.status(200).send();
  },

  /**
   * Handle user registration process.
   * 1. Check if user is already registered by checking email
   * 2. Encrypt password
   * 3. Save user information in MongoDB
   * 4. Create a customer on Stripe with Free Plan
   **/
  register(req: Request, res: Response) {
    let name      = req.query.registerName;
    let email     = req.query.registerEmail;
    let password  = req.query.registerPassword;

    if (name.trim().length === 0) {
      return res.status(400).send('Name cannot be empty');
    }

    if (!validations(email)) {
      return res.status(400)
      .send('Email cannot be empty & should be valid format');
    }

    if (password.trim().length < 6) {
      return res.status(400).send('Password should be at least 6 characters');
    }

    let hashedPassword = null;

    User.findOne(
      {'email': email}
      , (err0, user: any)=> {
        if (err0) {
          return res.status(400).send('Error on finding user');
        }
        if (user && user.email === email) {
          return res.status(400).send('This email is already registered');
        }
        // Encrypt user password
        bcrypt.genSalt(10, (err, salt)=> {
          bcrypt.hash(password, salt, (err1, hash)=> {
            if (err1) {
              return res.status(400).send('Error on hashing password');
            }
            hashedPassword = hash;
            // User object to be saved in MongoDB
            let newUser = new User({
              'name': name,
              'email': email,
              'password': hashedPassword
            });

            newUser.save((err2, theUser)=> {
              if (err) {
                return res.status(500).send('Could not save user');
              }
              req.login(theUser, (err3)=> {
                if (err3) {
                  return res.status(400).send('Something went wrong. Try again.');
                }
                return res.status(200).send('Welcome to Meetup Event Planner!');
              });
            });
          });
        });
      });
  },

  // Render login page
  getLogin(req: Request, res: Response) {
    return res.status(200);
  },

  /**
   * Handle user login process via Passport
   **/
  login(req: Request, res: Response) {
    let email    = req.query.loginEmail;
    let password = req.query.loginPassword;

    if (!validations(email)) {
      return res.status(400).send('Please enter the correct email');
    }

    if (password.trim().length < 8) {
      return res.status(400).send('Please enter the correct password');
    }

    passport.authenticate('local', (err0, user, info)=> {
      if (err0) {
        return res.status(400).send('Cannot login. Try again.');
      }

      if (!user) {
        return res.status(400).send('User Not Found / Password is incorrect');
      }

      req.logIn(user, (err1)=> {
        if (err1) {
          return res.status(400).send('Cannot login. Try again.');
        }
        return res.status(200).send('Logged in');
      });
    })(req, res);
  },

  // Render Forgot Password page
  getForgotPassword(req: Request, res: Response) {
    res.status(200);
  },

  // Logout
  logout(req: Request, res: Response) {
    req.logout();
    return res.status(200).send('You are logged out');
  }
};

export default auth;
