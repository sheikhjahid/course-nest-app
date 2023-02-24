import { Expose, Transform } from 'class-transformer';
import { report, title } from 'process';
import { Report } from 'src/report/report.entity';

export class User {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Transform(({ obj }) => obj?.reports)
  @Expose()
  reports: Report[];
}
