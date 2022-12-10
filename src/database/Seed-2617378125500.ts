import { AdminEntity } from '../admin/admin.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed2617378125500 implements MigrationInterface {
  name = 'Seed2617378125500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      queryRunner.manager.create<AdminEntity>(AdminEntity, {
        username: 'admin',
        password:
          '$2a$10$mv.a2192W1dsrIqylmX8I.7k0sdflrhmnCb0jHc8.DV/h8IdOYnQm',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM admins`);
  }
}
