import { CircularProgress } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { getUsers } from "../../api/user";
import AssignPersonnel from "../../components/AssignPersonnel/AssignPersonnel";
import InputField from "../../components/Inputs/TextField";

import { IProject, IUser } from "../../types/types";

type Props = {
  user: IUser;
};

const NewProjectPage: FC<Props> = ({ user }) => {
  const [newProjectData, setNewProjectData] = useState<IProject>({
    title: "",
    description: "",
    assignedTo: [],
    tickets: [],
  });
  const [users, setUsers] = useState<IUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);

  const fetchUsers = async () => {
    try {
      const result = await getUsers();
      setUsers(result.map((user) => ({ ...user, isSelected: false })));
      setLoadingUsers(false);
    } catch (e) {
      toast.error("Couldn't fetch users!");
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const genericInputHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setNewProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const assignToProject = (selectedWorker: IUser) => {
    // add selected worker to the assignedTo array
    setNewProjectData((prev) => {
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
    setUsers((prevUsers) =>
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
    <section>
      <div className="row mb-3">
        <h1>Create new project</h1>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="row mb-3">
            <InputField
              value={newProjectData.title}
              name="title"
              label="title"
              required
              changeHandler={genericInputHandler}
            />
          </div>
          <div className="row">
            <InputField
              value={newProjectData.description}
              name="description"
              label="description"
              required
              changeHandler={genericInputHandler}
            />
          </div>
          <div className="row d-flex" style={{ gap: 15 }}>
            {loadingUsers ? (
              <div className="col-6 offset-3">
                <CircularProgress />
              </div>
            ) : (
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
                  {users.map((user) => (
                    <AssignPersonnel
                      key={user.username}
                      user={user}
                      assignToProject={assignToProject}
                    />
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewProjectPage;
