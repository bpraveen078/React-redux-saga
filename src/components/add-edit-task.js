import React from "react";
import { bindActionCreators } from "redux";
import { history } from "../history/history";
import { connect } from "react-redux";
import {
  getTasksAction,
  editTasksAction,
  createTasksAction,
  deleteTasksAction,
  completeTasksAction,
  updateTasksAction
} from "../actions";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

class TaskAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        title: "",
        description: "",
        completed: false
      }
    };
  }

  componentDidMount() {
    if (this.props.match.params.id)
      this.props.editTasksAction(parseInt(this.props.match.params.id, 10));
  }

  componentWillReceiveProps(props) {
    if (props.match.params.id) {
      const { task } = props;
      this.setState({
        task: {
          ...task
        }
      });
    }
  }
  handleSave = e => {
    if (this.props.match.params.id) {
      const { task } = this.state;
      task.id = parseInt(this.props.match.params.id, 10);
      this.props.updateTasksAction(task);
      history.push("/todolist");
    } else {
      const { task } = this.state;

      this.props.createTasksAction(task.title);
      history.push("/todolist");
    }
    this.reset();
  };

  handleChange = e => {
    const { task } = this.state;
    const { name, value } = e.target;
    this.setState({
      task: {
        ...task,
        [name]: value
      }
    });
  };
  handleDelete(id) {
    this.props.deleteTasksAction(id);
    history.push("/todolist");
  }
  handleComplete(id) {
    this.props.completeTasksAction(id);
    history.push("/todolist");
  }
  handleReset = e => {
    this.reset();
  };

  reset() {
    if (this.props.match.params.id) {
      const { task } = this.props;
      debugger;
      this.setState({
        task: {
          ...task
        }
      });
    }
  }

  render() {
    const { task } = this.state;
    return (
      <div>
        <Link to="/todolist"> Back to Tasks</Link>
        <form>
          <TextField
            name="title"
            placeholder="Title*"
            label="Title*"
            value={task.title}
            onChange={this.handleChange}
          />
          {
            //  this.props.match.params.id&&
            <Button
              color="default"
              variant="contained"
              onClick={() => {
                this.handleComplete(this.props.match.params.id);
              }}
            >
              Complete
            </Button>
          }
          <br />
          <TextField
            name="description"
            placeholder="Description"
            label="Description"
            onChange={this.handleChange}
            value={task.description}
          />{" "}
          <br />
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleSave}
            disabled={task.title === ""}
          >
            Save
          </Button>
          &nbsp;
          <Button
            color="default"
            variant="contained"
            onClick={this.handleReset}
          >
            Cancel
          </Button>
          &nbsp;
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              this.handleDelete(this.props.match.params.id);
            }}
          >
            Delete
          </Button>
          &nbsp;
        </form>
      </div>
    );
  }
}

const mapDispatchtoProps = dispatch =>
  bindActionCreators(
    {
      getTasksAction: getTasksAction,
      editTasksAction: editTasksAction,
      createTasksAction: createTasksAction,
      deleteTasksAction: deleteTasksAction,
      completeTasksAction: completeTasksAction,
      updateTasksAction: updateTasksAction
    },
    dispatch
  );

function mapStateToProps(state) {
  const { task } = state;
  return {
    task
  };
}

const connectedTodTask = connect(
  mapStateToProps,
  mapDispatchtoProps
)(TaskAddEdit);
export { connectedTodTask as TaskAddEdit };
