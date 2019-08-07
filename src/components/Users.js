import React from "react";
import { List } from "semantic-ui-react";

const Users = ({ users }) => {
  console.log(users);
  return (
    <div>
      <List divided>
        {users.map(user => (
          <List.Item key={user.id}>
            <List.Icon name="user" verticalAlign="middle" />
            <List.Content>
              <List.Header>{user.name}</List.Header>
              <List.Description>{user.email}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default Users;
