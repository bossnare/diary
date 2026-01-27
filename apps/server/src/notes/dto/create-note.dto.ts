/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class CreateNoteDto {
  @ValidateIf((o) => !o.title || o.title.trim() === '')
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @ValidateIf((o) => !o.content || o.content.trim() === '')
  @IsString()
  @IsNotEmpty()
  jsonContent!: any;

  @IsString()
  @IsOptional()
  color?: string;
}
