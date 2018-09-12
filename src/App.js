import React, { Component } from "react";
import "./App.css";
import { Router, Route } from "react-router-dom";
import { history } from "../src/history/history";
import { TodoList } from "./components/todo-list";
import { TaskAddEdit } from "./components/add-edit-task";
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={TodoList} />
          <Route exact path="/todolist" component={TodoList} />
          <Route exact path="/addedit" component={TaskAddEdit} />
          <Route path="/addedit/:id" component={TaskAddEdit} />
        </div>
      </Router>
    );
  }
}

export default App;
