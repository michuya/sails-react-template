/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React, { Component, PropTypes } from 'react';
import HeaderBar from '../lib/HeaderBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import Dialog from 'material-ui/Dialog';
import { deepOrange500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as MainActions from '../../redux/actions/Main';

const styles = {
  body: {
    width: '100%',
    height: '100%',
  },
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

export class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        secondary
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme} style={styles.body}>
        <div>
          <HeaderBar />
          <div style={styles.container}>
            <Dialog
              open={this.state.open}
              title="Super Secret Password"
              actions={standardActions}
              onRequestClose={this.handleRequestClose}
              contentStyle={{
                padding: '0',
                height: '100px',
              }}
            >
              <span
                style={{
                  height: '24px',
                  lineHeight: '24px',
                  float: 'left',
                }}
              >
                {this.props.sample.password}
              </span>
              <IconButton
                onTouchTap={this.props.mainActions.regeneratePassword}
                style={{
                  width: '24px',
                  height: '24px',
                  padding: '0px 4px',
                  marginLeft: '8px',
                }}
              >
                <NavigationRefresh />
              </IconButton>
            </Dialog>
            <h1>material-ui</h1>
            <h2>example project</h2>
            <RaisedButton
              label="Super Secret Password"
              primary
              onTouchTap={this.handleTouchTap}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Main.propTypes = {
  sample: PropTypes.objects,
  mainActions: PropTypes.objects,
};

function mapStateToProps(state) {
  return {
    sample: state.main.sample,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mainActions: bindActionCreators(MainActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

