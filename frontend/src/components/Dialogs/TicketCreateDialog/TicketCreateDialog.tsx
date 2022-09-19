import { FC, useState } from "react";
import { Modal } from "react-bootstrap";
import { TicketPriority, TicketStatus } from "../../../types/enums";
import { ITicket } from "../../../types/types";
import DropdownSelect from "../../Inputs/DropdownSelect/DropdownSelect";
import InputField from "../../Inputs/InputField";
import "./style.scss";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const TicketCreateDialog: FC<Props> = ({ isOpen, handleClose }) => {
  const [newTicket, setNewTicket] = useState<ITicket>({
    title: "",
    description: "",
    priority: TicketPriority.LOW,
    status: TicketStatus.TODO,
    assignedTo: [],
    owner: 0,
  });

  const genericInputHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));

    console.log(newTicket);
  };

  return (
    <Modal backdrop={true} show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>Create new ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputField
          name="title"
          value={newTicket.title}
          changeHandler={genericInputHandler}
        />
        <InputField
          name="description"
          value={newTicket.description}
          changeHandler={genericInputHandler}
        />
        <DropdownSelect
          name="priority"
          value={newTicket.priority}
          elements={Object.values(TicketPriority)}
          changeHandler={genericInputHandler}
        />
        <InputField
          name="priority"
          value={newTicket.priority}
          changeHandler={genericInputHandler}
        />
        <InputField
          name="status"
          value={newTicket.status}
          changeHandler={genericInputHandler}
        />
      </Modal.Body>
      <Modal.Footer>
        <div className="col-12 col-sm-3">
          <button className="secondary-btn" onClick={handleClose}>
            Close
          </button>
        </div>
        <div className="col-12 col-sm-3">
          <button className="primary-btn" onClick={handleClose}>
            Create
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default TicketCreateDialog;
