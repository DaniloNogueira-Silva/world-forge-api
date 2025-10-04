import { IsEnum, IsJSON, IsNotEmpty, IsObject, IsString, MaxLength } from "class-validator";
import { EntityType } from "../enums/entities_type.enum";

export class CreateEntityDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsEnum(EntityType)
    @IsNotEmpty()
    entity_type: EntityType;

    @IsObject()
    attributes: object; 
}