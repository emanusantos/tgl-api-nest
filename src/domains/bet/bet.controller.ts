import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { BetService } from './bet.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { FindBetDto } from './dto/find-bet.dto';

@Controller('bet')
export class BetController {
  constructor(private readonly betService: BetService) {}

  @Post()
  async create(@Body() createBetDto: CreateBetDto, @Request() req) {
    return this.betService.create(req.userId, createBetDto);
  }

  @Get()
  async find(@Query() findBetDto: FindBetDto, @Request() req) {
    return this.betService.find(findBetDto, req.userId);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.betService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.betService.delete(id);
  }
}
