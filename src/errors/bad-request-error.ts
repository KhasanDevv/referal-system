import { ApiProperty } from '@nestjs/swagger';

export class BadRequestErrorResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
