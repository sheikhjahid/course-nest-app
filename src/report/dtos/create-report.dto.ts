import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  @Max(1000)
  price: number;
}
