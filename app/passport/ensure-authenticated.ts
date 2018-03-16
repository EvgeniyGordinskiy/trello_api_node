import {Request, Response} from 'express';

// Check if user is authenticated via Passport's method
export default function(req: Request, res: Response, next: any) {
  if (req.hasOwnProperty('user')) {
    return next();
  }
  return res.redirect('/');
}
