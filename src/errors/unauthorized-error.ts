import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedErrorResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
