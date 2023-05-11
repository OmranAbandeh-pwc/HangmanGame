import { Request } from "express";


export default interface AuthData extends Request{
    userid:string;
}