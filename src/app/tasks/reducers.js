import { combineReducers } from 'redux';
import * as c from './constants';
import orderBy from 'lodash.orderby';

// reducers
// const taskListInit = [];
const taskListInit = {
  items: [
    {
      id: 'HktFvV9OG',
      createDate: '2018-03-05T03:20:33.104Z',
      done: false,
      text: 'Fazer mockup!',
    },
    {
      id: 'PcZ9xr92i',
      createDate: '2018-03-05T03:25:33.104Z',
      done: true,
      text: 'Melhorar documentação',
    },
    {
      id: 'Lcv1c819o',
      createDate: '2018-03-05T03:45:33.104Z',
      done: false,
      text: 'Preparar apresentação',
    },
  ],
  sort: 'recent',
  visibility: 'all'
};


const taskListReducer = (state = taskListInit, action) => {
  switch (action.type) {
    case c.CREATE_TASK:
      return {
        ...state,
        items: state.sort === 'older' ? [action.data, ...state.items] : [...state.items, action.data]
      };
    case c.UPDATE_TASK:
      return {
        ...state,
        items: state.items.map(task => {
          if (task.id === action.id) {
            return { ...task, text: action.text }
          } else {
            return task;
          }
        })
      };
    case c.DONE_TASK:
      return {
        ...state,
        items: state.items.map(task => {
          if (task.id === action.id) {
            return { ...task, done: action.value }
          } else {
            return task;
          }
        })
      };
    case c.REMOVE_TASK:
      return {
        ...state,
        items: state.items.filter(task => task.id !== action.id)
      };
    case c.SORT_BY_RECENT:
      return {
        ...state,
        sort: 'recent',
        items: orderBy(state.items, (o) => {
          return new Date(o.createDate);
        })
      };
    case c.SORT_BY_OLDER:
      return {
        ...state,
        sort: 'older',
        items: orderBy(state.items, (o) => {
          return new Date(o.createDate);
        }, 'desc')
      };
    case c.CHANGE_VISIBILITY:
      return {
        ...state,
        visibility: action.data
      };
    default:
      return state;
  }
};

export default combineReducers({
  taskList: taskListReducer
});
