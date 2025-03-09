import { NestMiddleware, Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';



@Injectable()
export class ValidateProductAcccountMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction ):void {
        const {valid}=req.headers;
        console.log('middleware logs');
        
        if(valid==='true'){
            console.log('valid account');
            
            next()
        }else{
            console.log('invalid account');
            
            res.status(401).send({message:'error',errors:'invalid account'})
        }
    }
}