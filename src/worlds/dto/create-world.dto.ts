import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateWorldDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @MaxLength(500)
    description?: string;
}