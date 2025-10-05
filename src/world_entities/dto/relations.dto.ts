import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RelationsType } from "../enums/relations_type.enum";

export class CreateRelationsDto {

    @IsString()
    @IsNotEmpty()
    targetEntityId: string;

    @IsEnum(RelationsType)
    @IsNotEmpty()
    type: RelationsType
}

export class RemoveRelationDto {
    @IsString()
    @IsNotEmpty()
    type: string;
    @IsString()
    @IsNotEmpty()
    targetEntityId: string;
}