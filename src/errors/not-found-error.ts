import { ApiProperty } from '@nestjs/swagger';

export class NotFoundErrorResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
