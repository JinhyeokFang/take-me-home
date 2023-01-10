import { Module, ModuleMetadata } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdoptionRequestService } from './business/adoption-request.service';
import { AdoptionRequestEntity } from './infrastructure/adoption-request.entity';
import { AdoptionRequestMysqlRepository } from './infrastructure/adoption-request.mysql.repository';
import { AdoptionRequestController } from './interface/adoption-request.controller';

@Module(AdoptionRequestModule.metaData)
export class AdoptionRequestModule {
  public static metaData: ModuleMetadata = {
    controllers: [AdoptionRequestController],
    providers: [AdoptionRequestService, AdoptionRequestMysqlRepository],
    imports: [TypeOrmModule.forFeature([AdoptionRequestEntity])],
  };
}
