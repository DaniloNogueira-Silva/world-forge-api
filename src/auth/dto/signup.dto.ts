import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    username: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}