import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { createTicketDto } from './dto/create-ticket.dto';
import { updateTicketDto } from './dto/update-ticket.dto';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Post()
  async create(@Body() createTicketDto: createTicketDto) {
    return this.ticketService.createTicket(createTicketDto);
  }

  @Patch()
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: updateTicketDto,
  ) {
    return this.ticketService.updateTicket(id, updateTicketDto);
  }

  @Delete()
  async delete(@Param('id') id: string) {
    return this.ticketService.deleteTicket(id);
  }
}
