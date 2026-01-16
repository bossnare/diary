/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class CreateNoteDto {
  @ValidateIf((o) => !o.title || o.title.trim() === '')
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ValidateIf((o) => !o.content || o.content.trim() === '')
  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsString()
  @IsOptional()
  color?: string;
}
