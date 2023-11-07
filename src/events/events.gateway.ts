
import { Logger } from "@nestjs/common";
import { WebSocketGateway, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "dgram";
import { Server } from "ws";

@WebSocketGateway(8080, {
    namespace: 'chat',
    cors: { origin: '*' },
  })
  export class EventsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    constructor() {}
    
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('EventsGateway');
  
    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: string): string {
      return data;
    }
  
    afterInit(server: Server) {
      this.logger.log('웹소켓 서버 초기화 ✅');
    }
  
    handleDisconnect(client: Socket) {
      this.logger.log(`Client Disconnected : ${client}`);
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      this.logger.log(`Client Connected : ${client}`);
    }
  }