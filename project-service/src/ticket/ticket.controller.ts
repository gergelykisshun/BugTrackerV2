import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { createTicketDto } from './dto/create-ticket.dto';
import { updateTicketDto } from './dto/update-ticket.dto';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Post()
  async create(@Body() createTicketDto: createTicketDto) {
    console.log('inside creating ticket');
    return this.ticketService.createTicket(createTicketDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: updateTicketDto,
  ) {
    console.log(id);
    return this.ticketService.updateTicket(id, updateTicketDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ticketService.deleteTicket(id);
  }
}
