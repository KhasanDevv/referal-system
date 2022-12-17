import { ApiProperty } from '@nestjs/swagger';

export class ServerErrorResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
