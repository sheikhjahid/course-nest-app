import { IsNumber, IsString, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
export class EstimateReportDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(0)
  @Max(1000)
  price: number;
}
