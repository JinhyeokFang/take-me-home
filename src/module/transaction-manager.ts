import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';

@Injectable()
export class TransactionManager {
  private queryRunner: QueryRunner | null = null;

  constructor(private readonly dataSource: DataSource) {}

  start() {
    this.queryRunner = this.dataSource.createQueryRunner();
    this.queryRunner.startTransaction();
  }

  commit() {
    this.queryRunner.commitTransaction();
  }

  rollback() {
    this.queryRunner.rollbackTransaction();
  }

  get manager() {
    return this.queryRunner.manager;
  }
}
