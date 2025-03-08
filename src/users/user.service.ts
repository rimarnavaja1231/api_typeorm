import bcrypt from "bcryptjs";
import { AppDataSource } from "../data-source";
import { User } from "./entity/user.entity";
import { CreateUserDto, UpdateUserDto } from "./user.dto";

const userRepository = AppDataSource.getRepository(User);

export const userService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll(): Promise<User[]> {
  return await userRepository.find();
}

async function getById(id: number): Promise<User> {
  const user = await userRepository.findOneBy({ id });
  if (!user) throw "User not found";
  return user;
}

async function create(params: CreateUserDto): Promise<void> {
  // validate
  const existingUser = await userRepository.findOneBy({ email: params.email });
  if (existingUser) {
    throw `Email "${params.email}" is already registered`;
  }

  const user = userRepository.create({
    email: params.email,
    title: params.title,
    firstName: params.firstName,
    lastName: params.lastName,
    role: params.role,
    passwordHash: await bcrypt.hash(params.password, 10),
  });

  // save user
  await userRepository.save(user);
}

async function update(id: number, params: UpdateUserDto): Promise<void> {
  const user = await getById(id);

  // validate email if changed
  const emailChanged = params.email && user.email !== params.email;
  if (emailChanged) {
    const existingUser = await userRepository.findOneBy({
      email: params.email,
    });
    if (existingUser) {
      throw `Email "${params.email}" is already taken`;
    }
  }

  // update user
  Object.assign(user, {
    ...params,
    // hash password if it was entered
    ...(params.password && {
      passwordHash: await bcrypt.hash(params.password, 10),
    }),
  });

  await userRepository.save(user);
}

async function _delete(id: number): Promise<void> {
  const user = await getById(id);
  await userRepository.remove(user);
}
