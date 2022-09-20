import { FC, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { TicketPriority, TicketStatus } from "../../../types/enums";
import { ITicket, IUser } from "../../../types/types";
import AssignPersonnel from "../../AssignPersonnel/AssignPersonnel";
import DropdownSelect from "../../Inputs/DropdownSelect/DropdownSelect";
import InputField from "../../Inputs/InputField";
import "./style.scss";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  workers: IUser[];
};

const TicketCreateDialog: FC<Props> = ({ isOpen, handleClose, workers }) => {
  const [newTicket, setNewTicket] = useState<ITicket>({
    title: "",
    description: "",
    priority: TicketPriority.LOW,
    status: TicketStatus.TODO,
    assignedTo: [],
    owner: 0,
  });

  const [usersOnProject, setUsersOnProject] = useState<IUser[]>(workers);

  // TODO MOVE TO UTILS
  const genericInputHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));

    console.log(newTicket);
  };

  // TODO MAKE TABLE A COMPONENT WITH THIS INCLUDED
  const assignToProject = (selectedWorker: IUser) => {
    setNewTicket((prev) => {
      if (prev.assignedTo.every((worker) => worker.id !== selectedWorker.id)) {
        toast.info(`${selectedWorker.username} assigned to project!`);
        return { ...prev, assignedTo: [...prev.assignedTo, selectedWorker] };
      } else {
        toast.info(`${selectedWorker.username} removed from project!`);
        return {
          ...prev,
          assignedTo: prev.assignedTo.filter(
            (worker) => worker.id !== selectedWorker.id
          ),
        };
      }
    });

    // change selected users isSelected state
    setUsersOnProject((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === selectedWorker.id) {
          return { ...user, isSelected: !user.isSelected };
        } else {
          return user;
        }
      })
    );
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
          utilityClasses="mb-3"
        />
        <InputField
          name="description"
          value={newTicket.description}
          changeHandler={genericInputHandler}
          utilityClasses="mb-3"
        />
        <div className="row mb-3">
          <div className="col">
            <DropdownSelect
              name="priority"
              value={newTicket.priority}
              elements={Object.values(TicketPriority)}
              changeHandler={genericInputHandler}
            />
          </div>
          <div className="col">
            <DropdownSelect
              name="status"
              value={newTicket.status}
              elements={Object.values(TicketStatus)}
              changeHandler={genericInputHandler}
            />
          </div>
        </div>
        <div className="row">
          <Table
            variant="dark"
            hover
            responsive
            className="assign-personnel-table"
          >
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              {usersOnProject.map((user) => (
                <AssignPersonnel
                  key={user.username}
                  user={user}
                  assignToProject={assignToProject}
                />
              ))}
            </tbody>
          </Table>
        </div>
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
