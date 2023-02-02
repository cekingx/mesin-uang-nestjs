import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth() {
    return 'oke';
  }

  @Post()
  getHello(@Body() body: any) {
    console.log(body);
    return 'Oke';
  }
}
