import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class TaskNewItem extends React.Component {

  state = {
    text: '',
    error: false,
    helperText: ''
  };

  static propTypes = {
    createTask: PropTypes.func.isRequired
  };

  validate = () => {
    if (this.state.text.length > 0) {
      return true;
    }
    this.setState({ helperText: 'Informe a tarefa!', error: true });
    return false;
  };

  clearValidate = () => {
    this.setState({ helperText: '', error: false });
  };

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.getAttribute('name');
    this.setState({
      [name]: value
    });
    if (this.state.error) {
      this.clearValidate();
    }
  };

  clearText = () => {
    this.setState({ text: '' });
  };

  handleFinishEdit = () => {
    if (this.validate()) {
      this.clearText();
      this.props.createTask(this.state.text);
    }
  };

  handleKeyUp = (e) => {
    const key = e.keyCode;
    if (key === 13) {
      e.preventDefault();
      this.handleFinishEdit();
    }
  };

  render() {
    return (
      <div className="task-new-item">
        <TextField
          name="text"
          autoFocus
          placeholder="O que vai fazer hoje?"
          fullWidth={true}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          value={this.state.text}
          helperText={this.state.helperText}
          error={this.state.error}
          helperTextClassName="helper-text"
          InputProps={{
            disableUnderline: true
          }}
        />
      </div>
    )
  }
}

export default TaskNewItem;
