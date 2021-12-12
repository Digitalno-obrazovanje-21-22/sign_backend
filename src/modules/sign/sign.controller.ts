import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { Sign } from 'src/entities/sign.entity';
import { SignService } from '../sign/sign.service'
import { CreateSignDto, UpdateSignDto } from './sign.dto'

@Controller('/sign')
export class SignController {
  constructor(private readonly signService: SignService) {}

  @Get()
  async getAll() {
    return this.signService.findAll()
  }

  @Get('/random')
  async getRandomSign(){
    const signs = await this.signService.findAll();
    return signs[Math.floor(Math.random()*(signs).length)];
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    const sign = await this.signService.findOne(id)
    if (!sign) {
      throw new HttpException('No such sign', HttpStatus.BAD_REQUEST)
    }
    return sign
  }

  @Post()
  async create(@Body() data: CreateSignDto) {
    return this.signService.create(data)
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() data: UpdateSignDto) {
    const sign = await this.signService.findOne(id)
    if (!sign) {
      throw new HttpException('No such sign', HttpStatus.BAD_REQUEST)
    }
    return this.signService.update(sign.id, data)
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const sign = await this.signService.findOne(id)
    if (!sign) {
      throw new HttpException('No such sign', HttpStatus.BAD_REQUEST)
    }
    return this.signService.remove(sign.id)
  }
}
