import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  approved: boolean;

  @Transform(({ obj }) => obj?.user.id)
  @Expose()
  userId: number;
}
