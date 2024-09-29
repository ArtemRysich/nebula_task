import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@ApiTags('Offer')
@Controller()
export class OfferController {
  constructor(private readonly offerService: OfferService) {}
  @Get('expert/:id')
  @ApiOperation({ summary: 'Get offer by ID' })
  @ApiResponse({ status: 200, description: 'Offer found.' })
  @ApiResponse({ status: 404, description: 'Offer not found.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique identifier of the offer',
  })
  find(@Param('id') id: string) {
    return this.offerService.getOffer(id);
  }

  @Get('experts')
  @ApiOperation({ summary: 'Get all offers' })
  @ApiResponse({ status: 200, description: 'List of offers retrieved.' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of offers per page',
    example: 10,
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.offerService.getAllOffers(page, limit);
  }

  @UsePipes(new ValidationPipe())
  @Post('expert')
  @ApiOperation({ summary: 'Create a new offer' })
  @ApiResponse({ status: 201, description: 'Offer created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  create(@Body() offerDto: CreateOfferDto) {
    return this.offerService.createOffer(offerDto);
  }

  @UsePipes(new ValidationPipe())
  @Put('expert/:id')
  @ApiOperation({ summary: 'Update an existing offer' })
  @ApiResponse({ status: 200, description: 'Offer updated successfully.' })
  @ApiResponse({ status: 404, description: 'Offer not found.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique identifier of the offer to update',
  })
  update(@Param('id') id: string, @Body() offerDto: UpdateOfferDto) {
    return this.offerService.updateOffer(id, offerDto);
  }

  @Delete('expert/:id')
  @ApiOperation({ summary: 'Delete an offer' })
  @ApiResponse({ status: 200, description: 'Offer removed successfully.' })
  @ApiResponse({ status: 404, description: 'Offer not found.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique identifier of the offer to delete',
  })
  remove(@Param('id') id: string) {
    return this.offerService.removeOffer(id);
  }
}
