import { FC } from "react";
import { Table } from "react-bootstrap";
import { ITicket } from "../../types/types";
import TicketPreview from "../TicketPreview/TicketPreview";
import "./style.scss";

type Props = {
  status: string;
  tickets: ITicket[];
};

const TicketTable: FC<Props> = ({ status, tickets }) => {
  return (
    <section>
      <h6 className="ticket-status-header">{status}</h6>
      {tickets.length > 0 ? (
        <Table
          variant="dark"
          hover
          responsive
          className="assign-personnel-table"
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Description</th>
              <th>Assigned to</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketPreview ticket={ticket} />
            ))}
          </tbody>
        </Table>
      ) : (
        <p style={{ borderLeft: "1px solid #08a7f3", paddingLeft: 8 }}>
          There are no tickets in this status!
        </p>
      )}
    </section>
  );
};

export default TicketTable;
