import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  trade(message: string) {
    this.logger.log(message, 'Trade');
  }

  webhook(message: string) {
    this.logger.log(message, 'Webhook');
  }
}
