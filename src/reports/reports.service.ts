import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { User } from '../users/user.entity';
import { CreateReportDto } from './dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepo: Repository<Report>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createReport(userId: number, dto: CreateReportDto) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const report = this.reportRepo.create({
      problems: dto.problems,
      address: dto.address,
      observation: dto.observation,
      image: dto.image,
      date: dto.date || new Date().toLocaleDateString('pt-BR'),
      user,
    });

    return this.reportRepo.save(report);
  }

  async getReports(userId: number) {
    return this.reportRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async deleteReport(userId: number, reportId: number) {
    const report = await this.reportRepo.findOne({
      where: { id: reportId, user: { id: userId } },
    });
    if (!report) throw new NotFoundException('Denúncia não encontrada');

    return this.reportRepo.remove(report);
  }

  async clearAllReports(userId: number) {
    const reports = await this.reportRepo.find({
      where: { user: { id: userId } },
    });
    if (reports.length > 0) {
      await this.reportRepo.remove(reports);
    }
    return { message: 'Histórico de denúncias limpo com sucesso' };
  }
}
