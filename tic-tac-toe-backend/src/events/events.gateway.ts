import { ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MoveDTO } from 'src/dto/move.dto';

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private board: string[][];
  private clients: Socket[] = [];
  private played: string = '';

  @WebSocketServer()
  server: Server;

  constructor() {
    this.initGame();
  }

  initGame() {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  }

  handleDisconnect() {
    console.log('User disconnected');
    this.clients.pop();

    if (this.clients.length === 0) this.initGame();
  }

  handleConnection(client: Socket) {
    if (this.clients.length < 2) {
      console.log('User connected');
      this.clients.push(client);
      this.server.emit('connectionState', this.clients.length);
    } else {
      client.emit('error', 'Game already running.');
      client.disconnect();
    }
  }

  @SubscribeMessage('move')
  handleEvent(
    @ConnectedSocket() client: Socket,
    @MessageBody(new ValidationPipe()) moveDto: MoveDTO,
  ) {
    const { row, col } = moveDto;
    if (this.board[row][col] === '' && this.played != client.id) {
      this.board[row][col] = client.id;
      this.played = client.id;
      this.server.emit('gameState', {
        board: this.board,
        played: this.played,
      });
    }

    console.log(this.board);
  }
}
