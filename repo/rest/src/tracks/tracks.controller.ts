import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  ParseUUIDPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard.jwt';

@ApiTags('track')
@ApiBearerAuth('JWT')
@Controller('track')
@UseGuards(JwtAuthGuard)
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.tracksService.findOne(id);
  }

  @ApiBody({ type: CreateTrackDto })
  @Post()
  @HttpCode(201)
  create(@Body(new ValidationPipe()) createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @ApiBody({ type: UpdateTrackDto })
  @Put(':id')
  @HttpCode(200)
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(new ValidationPipe()) updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.tracksService.remove(id);
  }
}
