import { BadRequestException } from '@nestjs/common';

export class UserPostgresErrors {
  static phoneNumberAlreadyExist(e) {
    if (/(phoneNumber)[\s\S]+(already exists)/.test(e.detail)) {
      throw new BadRequestException('The phone number already exist!');
    }
  }
}
