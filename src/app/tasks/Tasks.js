import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { changeVisibility, createTask, doneTask, removeTask, sortByOlder, sortByRecent, updateTask } from './actions';
import TaskItem from './TaskItem';
import TaskNewItem from './TaskNewItem';
import Fade from 'material-ui/transitions/Fade';
import Slide from 'material-ui/transitions/Slide';
import withStyles from 'material-ui/styles/withStyles';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import './Tasks.scss';
import Logo from '../../images/iclinic-logo.png';
import ButtonRounded from '../shared/ButtonRounded';
import classNames from 'classnames';

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit,
    width: '16px',
    height: '16px'
  },
  buttonSort: {
    marginLeft: 'auto'
  }
});

class TasksContainer extends React.Component {

  render() {
    const {
      classes,
      updateTask,
      removeTask,
      createTask,
      doneTask,
      items,
      sort,
      sortBy,
      visibility,
      changeVisibility
    } = this.props;

    return (
      <Fragment>
        <Fade in={true} timeout={1500}>
          <div className="logo">
            <img src={Logo} width="30" alt="iClinic" />
            <span>iTask</span>
          </div>
        </Fade>
        <Slide in={true} timeout={700}>
        <section id="task-wrapper">
          <header>
            <TaskNewItem createTask={createTask} />
          </header>
          <section className="task-list">
            {items.map((task, index) => {
              if (visibility === 'done' && !task.done) {
                return null;
              } else {
                return (
                  <TaskItem
                    key={task.id}
                    {...task}
                    removeTask={removeTask}
                    updateTask={updateTask}
                    doneTask={doneTask}
                  />
                )
              }
            })}
          </section>
          <footer>
            <ButtonRounded className={classNames((visibility === 'all' ? 'active' : ''), 'm-r-5')} onClick={() => changeVisibility('all')}>Todos</ButtonRounded>
            <ButtonRounded className={visibility === 'done' ? 'active' : ''} onClick={() => changeVisibility('done')}>Realizados</ButtonRounded>
            <ButtonRounded className={classes.buttonSort} onClick={() => { sortBy(sort) }}>
              {sort === 'recent' ? (
                <ExpandMore className={classes.leftIcon} />
              ) : (
                <ExpandLess className={classes.leftIcon} />
              )}
              {sort === 'recent' ? 'Mais antigos' : 'Mais recentes'}
            </ButtonRounded>
          </footer>
        </section>
        </Slide>
      </Fragment>
    )
  }
}

const mapStateToProps = (store) => {
  const {
    items,
    sort,
    visibility
  } = store.tasks.taskList;

  return {
    items,
    sort,
    visibility
  }
};

const mapDispatchToProps = (dispatch) => ({
  removeTask: (id) => {
    dispatch(removeTask(id));
  },
  createTask: (text) => {
    dispatch(createTask(text))
  },
  updateTask: (id, text) => {
    dispatch(updateTask(id, text));
  },
  doneTask: (id, value) => {
    dispatch(doneTask(id, value));
  },
  changeVisibility: (visibility) => {
    dispatch(changeVisibility(visibility));
  },
  sortBy: (sort) => {
    if (sort === 'recent') {
      dispatch(sortByOlder());
    } else {
      dispatch(sortByRecent());
    }
  }
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TasksContainer));
