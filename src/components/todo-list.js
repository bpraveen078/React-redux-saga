import React from "react";
import { history } from "../history/history";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {
  getTasksAction,
  deleteTasksAction, 
  completeTasksAction
} from "../actions";
import { Button } from "@material-ui/core";

class TodoList extends React.Component {
  componentDidMount() {
    this.props.getTasksAction();
  }
  handleDelete(id) {
    this.props.deleteTasksAction(id);
  }
  handleComplete(id) {
    this.props.completeTasksAction(id);
  }
  render() {
    const { tasks } = this.props;
    return (
      <div style={dvBorder}>
        <h3>To-Do:</h3>
        <hr />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push("/addedit");
          }}
        >
          Add New To-Do
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title </TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!tasks && (
              <TableRow>
                <TableCell />
              </TableRow>
            )}

            {tasks &&
              tasks.map((o, i) => (
                <TableRow key={i}>
                  <TableCell
                    className={
                      o.completed === true
                        ? "strike input-width"
                        : " input-width"
                    }
                  >
                    <a
                      onClick={() => {
                        history.push("/addedit/" + o.id);
                      }}
                    >
                      {o.title}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={o.completed}
                      onClick={() => {
                        this.handleComplete(o.id);
                      }}
                    >
                      Complete
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="default"
                      disabled={o.completed}
                      onClick={() => {
                        this.handleDelete(o.id);
                      }}
                    >
                      X
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const dvBorder = {
  border: "1px solid lightgray",
  marginLeft: "60px",
  marginRight: "60px"
};

const mapDispatchtoProps = dispatch =>
  bindActionCreators(
    {
      getTasksAction: getTasksAction,
      deleteTasksAction: deleteTasksAction,
      completeTasksAction: completeTasksAction
    },
    dispatch
  );

function mapStateToProps(state) {
  const { tasks } = state;
  return {
    tasks
  };
}

const connectedTodoList = connect(
  mapStateToProps,
  mapDispatchtoProps
)(TodoList);
export { connectedTodoList as TodoList };
