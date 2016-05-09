/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import AppBar from 'material-ui/AppBar';

const styles = {
  appBar: {
    position: 'fixed',
    top: 0,
  },
};

class HeaderBar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      title: "Sample",
    };
  }

  render() {
    return (
      <AppBar title={this.state.title} />
    );
  }
}

export default HeaderBar;
