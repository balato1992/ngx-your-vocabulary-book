import * as express from 'express';

export interface IGetUserAuthInfoRequest extends express.Request {
    user: any // or any other type
}
