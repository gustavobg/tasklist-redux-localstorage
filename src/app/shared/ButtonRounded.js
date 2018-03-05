import React from 'react';
import Button from 'material-ui/Button';
import withStyles from 'material-ui/styles/withStyles';

const styles = {
  root: {
    borderRadius: '30px',
    padding: '0 10px',
    minWidth: '0',
    color: '#666',
    whiteSpace: 'nowrap',
    '&.active': {
      border: 'solid 1px #d2d2d2',
      fontWeight: '500',
      color: '#000'
    }
  },
  label: {
    textTransform: 'none',
    padding: 0
  }
};

const ButtonRounded = (props) => (
  <Button
    {...props}
    classes={{
      root: props.classes.root,
      label: props.classes.label,
    }}>
      {props.children}
    </Button>
);

export default withStyles(styles)(ButtonRounded);

