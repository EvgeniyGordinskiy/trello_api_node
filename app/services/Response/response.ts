import {Response} from "express";

class ResponseApi extends Response
{
  withSuccess = (status: number = 200, msg: String = "ok", data: Array<any> = [], resp: Response) :any => {
  resp.status(status).send({message: msg, data: data});
};
}

export default(ResponseApi);