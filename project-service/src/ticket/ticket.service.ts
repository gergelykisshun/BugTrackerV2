import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createTicketDto } from './dto/create-ticket.dto';
import { updateTicketDto } from './dto/update-ticket.dto';
import { Ticket, TicketDocument } from './entity/ticket.model';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
  ) {}

  async createTicket(ticket: createTicketDto) {
    const newTicket = await this.ticketModel.create(ticket);

    if (!newTicket)
      throw new InternalServerErrorException("Couldn't create new ticket!");

    return newTicket;
  }

  async updateTicket(id: string, updateTicketData: updateTicketDto) {
    const ticketToUpdate = await this.ticketModel.findById(id);

    if (!ticketToUpdate) throw new NotFoundException('Ticket not found');

    const fieldsToUpdate = Object.keys(updateTicketData);
    fieldsToUpdate.forEach((keyOfField) =>
      ticketToUpdate.set(keyOfField, updateTicketData[keyOfField]),
    );

    const newTicket = await ticketToUpdate.save();

    return newTicket;
  }

  async deleteTicket(id: string) {
    const deletedTicket = await this.ticketModel.findByIdAndDelete(id);
    if (!deletedTicket)
      throw new InternalServerErrorException("Couldn't delete ticket!");
    return deletedTicket;
  }
}
