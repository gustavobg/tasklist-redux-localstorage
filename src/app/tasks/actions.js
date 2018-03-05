import * as c from './constants';
import shortid from 'shortid';

// actions
export const createTask = (text) => {
  return {
    type: c.CREATE_TASK,
    data: {
      id: shortid.generate(),
      createDate: new Date(),
      done: false,
      text
    }
  }
};

export const updateTask = (id, text) => ({
  type: c.UPDATE_TASK,
  id,
  text
});

export const removeTask = (id) => ({
  type: c.REMOVE_TASK,
  id
});

export const doneTask = (id, value) => ({
  type: c.DONE_TASK,
  id,
  value
});

export const sortByRecent = () => ({
  type: c.SORT_BY_RECENT
});

export const sortByOlder = () => ({
  type: c.SORT_BY_OLDER
});

export const changeVisibility = (data) => ({
  type: c.CHANGE_VISIBILITY,
  data
});



