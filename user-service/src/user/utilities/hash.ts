import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const hashPass = async (password: string) => {
  return bcrypt.hash(password, saltOrRounds);
};

export const comparePass = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
