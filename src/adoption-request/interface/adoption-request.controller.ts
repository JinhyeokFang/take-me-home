import { Controller, Post } from '@nestjs/common';
import { AdoptionRequestService } from '../business/adoption-request.service';

@Controller('adoption-request')
export class AdoptionRequestController {
  constructor(
    private readonly adoptionRequestService: AdoptionRequestService,
  ) {}

  @Post('/')
  async createRequest() {
    return 'OK';
  }
}
