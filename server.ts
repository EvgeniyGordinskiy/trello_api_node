import express,{Response, Request} from 'express';
const app = express();
import mongoose from 'mongoose';

let uri = '';
if (process.env.NODE_ENV === 'production') {
  uri = process.env.MONGOLAB_URI || '';
  console.log('===PRODUCTION===');
} else {
  uri = '127.0.0.1/trello_api_node';
  console.log('===DEVELOPMENT===');
}

mongoose.connect(uri, {}, (err: any)=> {
  if (err) {
    console.log('Connection Error: ', err);
  } else {
    console.log('Successfully Connected');
  }
});



/**
 * Express routing
 * Refers to how an application’s endpoints (URIs) respond to client requests.
 * @see https://expressjs.com/en/guide/routing.html
 */
import routes from './routes';
app.use("", routes);

let port = process.env.PORT || 4000;
app.listen(port, ()=> {
  console.log('Server started at port number: ', port);
});
