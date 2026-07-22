import { Controller, Get, Post, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateReportDto } from './dto';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  async findAll(@Req() req: any) {
    return this.reportsService.getReports(req.user.id);
  }

  @Post()
  async create(@Req() req: any, @Body() dto: CreateReportDto) {
    return this.reportsService.createReport(req.user.id, dto);
  }

  @Delete(':id')
  async remove(@Req() req: any, @Param('id') id: number) {
    return this.reportsService.deleteReport(req.user.id, id);
  }

  @Delete()
  async clearAll(@Req() req: any) {
    return this.reportsService.clearAllReports(req.user.id);
  }
}
