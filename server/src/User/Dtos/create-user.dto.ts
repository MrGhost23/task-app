export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly image?: string;
  readonly fullName: string;
}
