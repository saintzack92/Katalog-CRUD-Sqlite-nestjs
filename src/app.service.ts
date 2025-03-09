import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<div> <b>Hello World!</b> </div>';
  }
}
