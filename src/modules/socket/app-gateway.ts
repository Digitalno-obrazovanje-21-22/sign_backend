import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'
import { Socket, Server } from 'socket.io'
import { AuthService } from '../auth/auth.service'
import { RoomParticipantService } from '../room-participant/roomParticipant.service'
import { RoomService } from '../room/room.service'

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly authService: AuthService,
    private readonly roomParticipantService: RoomParticipantService,
    private readonly roomService: RoomService,
  ) {}

  @WebSocketServer() server: Server
  private logger: Logger = new Logger('AppGateway')

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload)
  }

  @SubscribeMessage('startGame')
  handleStart(client: Socket, payload: string): void {
    this.server.emit('startGame', 'game started')
  }

  @SubscribeMessage('userJoin')
  async userJoin(client: Socket, payload: any): Promise<void> {
    const user = await this.authService.getUserByToken(payload.token)
    await this.roomParticipantService.joinRoom({
      isOwner: false,
      roomId: payload.roomId,
      userId: user.id,
      score: 0,
    })
  }

  @SubscribeMessage('leaveRoom')
  async userLeave(client: Socket, payload: any): Promise<void> {
    const user = await this.authService.getUserByToken(payload.token)
    await this.roomParticipantService.leaveRoom(user.id, payload.roomId)
  }

  @SubscribeMessage('playGame')
  async playGame(client: Socket, payload: any): Promise<any> {
    const participants = await this.roomParticipantService.findAllByRoomId(payload.roomId)
    const user = await this.authService.getUserByToken(payload.token)
    client.emit(
      'setStep',
      participants[payload.index || 0].userId == user.id
        ? { recording: true }
        : { waiting: true, user: participants[payload.index || 0].user },
    )
  }

  @SubscribeMessage('endGame')
  async endGame(client: Socket, payload: any): Promise<any> {
    const room = await this.roomService.findOneById(payload.roomId)
    room.isOver = true
    await room.save()
    client.emit('endGame')
  }

  @SubscribeMessage('startGuessing')
  async startGuess(client: Socket, payload: any): Promise<any> {
    this.server.emit('setStep', { guessing: true, ...payload })
  }

  @SubscribeMessage('setPoints')
  async setPoints(client: Socket, payload: any): Promise<any> {
    const user = await this.authService.getUserByToken(payload.token)
    const roomParticipant = await this.roomParticipantService.findOneByRoomIdAndUserId(payload.roomId, user.id)
    roomParticipant.score = roomParticipant.score + payload.guessed ? 1 : 0
    await roomParticipant.save()
  }

  @SubscribeMessage('changePlayer')
  async changePlayer(client: Socket, payload: any): Promise<any> {
    const user = await this.authService.getUserByToken(payload.token)
    const roomParticipant = await this.roomParticipantService.findAllByRoomId(payload.roomId)
    const roomParticipantIndex = roomParticipant.findIndex(val => val.userId == user.id)
    if (roomParticipantIndex + 1 == roomParticipant.length) {
      this.server.emit('endRound', roomParticipant[0].userId)
    }
    this.server.emit('nextPlayer', roomParticipantIndex + 1)
  }

  afterInit(server: Server) {
    console.log('Init')
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`)
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`)
  }
}
