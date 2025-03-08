import { Role } from "../helpers/role";

export interface CreateUserDto {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
}

export interface UpdateUserDto {
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: Role;
}
