import { FC } from "react";
import { ITicket } from "../../types/types";
import "./style.scss";

type Props = {
  ticket: ITicket;
};

const TicketPreview: FC<Props> = ({ ticket }) => {
  const workers = ticket.assignedTo.map((worker) => worker.username);

  return (
    <tr className="ticket-wrapper">
      <td>{ticket.title}</td>
      <td>{ticket.priority}</td>
      <td>{ticket.status}</td>
      <td>{ticket.description}</td>
      <td>
        {workers.length === 0 ? "no workers assigned" : workers.join(",")}
      </td>
    </tr>
  );
};

export default TicketPreview;
