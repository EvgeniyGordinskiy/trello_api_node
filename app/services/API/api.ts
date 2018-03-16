import express, {Request, Response} from 'express';
import ResponseApi from './../Response/response';

class Api
{
  private router: any;
  private response: any;

  constructor()
  {
    this.router = express.Router();
    this.response = new ResponseApi();
  }


}