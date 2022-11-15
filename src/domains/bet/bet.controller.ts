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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BetService } from './bet.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { FindBetDto } from './dto/find-bet.dto';

@Controller('bet')
@UseGuards(JwtAuthGuard)
export class BetController {
  constructor(private readonly betService: BetService) {}

  @Post()
  async create(@Body() createBetDto: CreateBetDto, @Request() req) {
    return this.betService.create(req.userId, createBetDto);
  }

  @Get()
  async find(@Query() findBetDto: FindBetDto) {
    return this.betService.find(findBetDto);
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
