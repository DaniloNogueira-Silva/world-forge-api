import { IsString, IsOptional, IsIn } from 'class-validator';

const ENTITY_TYPES = ["CHARACTER", "LOCATION", "ITEM", "ORGANIZATION", "FACTION"];

export class UpdateEntityDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @IsIn(ENTITY_TYPES)
  entity_type?: string;
}