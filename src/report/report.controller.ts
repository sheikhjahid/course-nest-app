import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/user.interceptor';
import { currentUser } from 'src/user/decorators/current-user.decorator';
import { AdminGuard } from 'src/user/guards/admin.guard';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { User } from 'src/user/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { EstimateReportDto } from './dtos/estimate-report.dto';
import { ReportDto } from './dtos/report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { ReportService } from './report.service';

@Controller('report')
@Serialize(ReportDto)
@UseGuards(AuthGuard)
export class ReportController {
  constructor(private service: ReportService) {}
  @Post()
  createReport(@Body() body: CreateReportDto, @currentUser() user: User) {
    return this.service.create(body, user);
  }

  @Put('/:id')
  @UseGuards(AdminGuard)
  approveReport(
    @Param('id') id: string,
    @currentUser() user: User,
    @Body() body: UpdateReportDto,
  ) {
    return this.service.approve(+id, user, body.approved);
  }

  @Get()
  getEstimate(@Query() query: EstimateReportDto) {
    return this.service.find(query);
  }
}
