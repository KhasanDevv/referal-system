import * as bcrypt from 'bcryptjs';

export class PasswordService {
  async comparePassword(password: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  }
}
