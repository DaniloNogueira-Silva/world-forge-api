import { IsObject, IsString, ValidateNested } from 'class-validator';

export class UpdateAttributesDto {
  @IsObject()
  attributes: Record<string, string>;
}