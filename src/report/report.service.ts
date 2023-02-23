import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { EstimateReportDto } from './dtos/estimate-report.dto';
import { Report } from './report.entity';
@Injectable()
export class ReportService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  async create(payload: CreateReportDto, user: User) {
    const report = this.repo.create(payload);
    report.user = user; // gets the value of user.id and places the value for "user"

    return this.repo.save(report);
  }

  async approve(id: number, user: User, approved: boolean) {
    const report = await this.repo.findOne({
      where: { id },
    });
    if (!report) {
      throw new NotFoundException('Report not Found');
    }
    report.user = user;
    report.approved = approved;
    return this.repo.save(report);
  }

  async find({ title, description, price }: EstimateReportDto) {
    return await this.repo
      .createQueryBuilder()
      .select('*')
      .where('title = :title', { title })
      .orWhere('description = :description', { description })
      .orWhere('price = :price', { price })
      .orderBy('id', 'DESC')
      .getRawMany();
  }
}
