import { FC, useState } from "react";
import { Modal } from "react-bootstrap";
import { TicketStatus } from "../../../types/enums";
import { ITicket } from "../../../types/types";
import InputField from "../../Inputs/TextField";
import "./style.scss";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const TicketCreateDialog: FC<Props> = ({ isOpen, handleClose }) => {
  const [newTicket, setNewTicket] = useState<ITicket>({
    title: "",
    description: "",
    priority: "LOW",
    status: TicketStatus.TODO,
    assignedTo: [],
    owner: 0,
  });

  const genericInputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal backdrop={true} show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
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
