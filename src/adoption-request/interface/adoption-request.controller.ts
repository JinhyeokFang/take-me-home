import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdoptionRequestService } from '../business/adoption-request.service';
import { AdoptionRequest } from '../domain/adoption-request';
import { RequestData } from '../domain/request-data';
import { ShelterID } from '../domain/shelter-id';

@Controller('adoption-request')
export class AdoptionRequestController {
  constructor(
    private readonly adoptionRequestService: AdoptionRequestService,
  ) {}

  @Post('/')
  async createRequest(@Body() requestData: RequestData) {
    const request = await this.adoptionRequestService.create(requestData);
    return request;
  }

  @Get('/shelter/:shelterId')
  async getRequests(@Param('shelterId') shelterId: ShelterID) {
    const requests: AdoptionRequest[] =
      await this.adoptionRequestService.findByShelterId(shelterId);

    return {
      success: true,
      requests,
    };
  }
}
