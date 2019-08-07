import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import OnBoardForm from "./components/OnBoardForm";
import Users from "./components/Users";

export default class App extends Component {
  constructor() {
    super();
    this.state = { users: [] };
  }

  addUser = newUser => {
    this.setState({ users: [...this.state.users, newUser] });
  };
  render() {
    return (
      <div className="add">
        <Grid centered container>
          <Grid.Column style={{ marginTop: "5rem" }} computer={5} mobile={16}>
            <OnBoardForm addUser={this.addUser} />
          </Grid.Column>
          <Grid.Column>
            {this.state.users.length > 0 && <Users users={this.state.users} />}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
