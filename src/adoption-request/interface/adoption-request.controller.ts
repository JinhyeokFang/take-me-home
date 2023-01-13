import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AdoptionRequestService } from '../business/adoption-request.service';
import { AdoptionRequest } from '../domain/adoption-request';
import { RequestData } from '../domain/request-data';
import { RequestID } from '../domain/request-id';
import { ShelterID } from '../domain/shelter-id';
import { UpdateStateBody } from './body/update-state.body';

@Controller('adoption-request')
export class AdoptionRequestController {
  constructor(
    private readonly adoptionRequestService: AdoptionRequestService,
  ) {}

  @Post('/')
  async createRequest(@Body() requestData: RequestData) {
    const request = await this.adoptionRequestService.create(requestData);
    return {
      success: true,
      request,
    };
  }

  @Get('/:requestId')
  async getRequestById(@Param('requestId') requestId: RequestID) {
    const request = await this.adoptionRequestService.findOneById(requestId);
    return {
      success: true,
      request,
    };
  }

  @Get('/shelter/:shelterId')
  async getRequestsByShelterId(@Param('shelterId') shelterId: ShelterID) {
    const requests: AdoptionRequest[] =
      await this.adoptionRequestService.findByShelterId(shelterId);

    return {
      success: true,
      requests,
    };
  }

  @Patch('/:requestId/state')
  async updateState(
    @Param('requestId') requestId: RequestID,
    @Body() body: UpdateStateBody,
  ) {
    if (body.accept) await this.adoptionRequestService.acceptRequest(requestId);
    else await this.adoptionRequestService.rejectRequest(requestId);

    return {
      success: true,
    };
  }
}
