import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('api')
export class AppController {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private notificationsClient: ClientProxy,
  ) {}

  @Get('notifications')
  getNotificationsHello(): Observable<string> {
    return this.notificationsClient.send({ cmd: 'get_hello' }, {});
  }
}
