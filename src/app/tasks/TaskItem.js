import React, { Fragment } from 'react';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import withStyles from 'material-ui/styles/withStyles';
import ClearIcon from 'material-ui-icons/Clear';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const styles = {
  checked: {
    color: '#19c0ff !important',
  },
  default: {
    color: '#ccc'
  }
};

class TaskItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      text: props.text,
      done: props.done,
      editing: false
    }
  }

  static propTypes = {
    removeTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    doneTask: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
  };

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    })
  };

  handleCheck = (e) => {
    const target = e.target;
    const value = target.checked;
    this.setState({
      done: value
    });
    this.props.doneTask(this.state.id, value);
  };

  handleFinishEdit = () => {
    this.setState({
      editing: false
    });
    this.props.updateTask(this.state.id, this.state.text);
  };

  handleKeyUp = (e) => {
    const key = e.keyCode;
    if (key === 13) {
      this.handleFinishEdit();
    }
  };

  handleClick = () => {
    this.setState({
      editing: true
    });
    this.props.doneTask(this.state.id);
  };

  render() {
    const {
      removeTask,
      classes
    } = this.props;

    const editing = this.state.editing;

    return (
      <div className={classNames('task-item-container', editing ? 'editing' : '')}>
        {editing ? (
          <input
            className="task-text task-input"
            name="text"
            type="text"
            autoFocus
            onChange={this.handleChange}
            onBlur={this.handleFinishEdit}
            onKeyUp={this.handleKeyUp}
            value={this.state.text}
          />
        ) : (
          <Fragment>
            <Checkbox
              className="task-checkbox"
              name="done"
              checked={this.state.done}
              onChange={this.handleCheck}
              classes={{
                checked: classes.checked,
                default: classes.default
              }}
            />

            <div className={classNames('task-text', this.state.done ? 'done' : 'todo')} onClick={this.handleClick}>
              {this.state.text}
            </div>

            <IconButton className="task-remove" onClick={() => removeTask(this.state.id)}>
              <ClearIcon/>
            </IconButton>
          </Fragment>
        )}
      </div>)
  }
}

export default withStyles(styles)(TaskItem);
