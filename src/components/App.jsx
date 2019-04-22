import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import MessageList from './MessageList';
import NewMessageForm from './NewMessageForm';
import Alert from './Alert';
import ModalCustom from './Modal';
import runSockets from '../sockets';
import connect from '../connect';
import Header from './Header';
import Drawer from './Drawer';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'auto',
    padding: 0,
    flexGrow: 1,
  },
});

const mapStateToProps = ({ error: { errorState }, modal: { modalState } }) => (
  { errorState, modalState }
);

@connect(mapStateToProps)
class App extends React.Component {
  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
    runSockets(this.props);
  }

  render() {
    const { errorState, modalState, classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        {errorState !== 'none' ? <Alert /> : null}
        {modalState !== 'none' ? <ModalCustom /> : null}
        <Header />
        <Drawer />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <MessageList />
          <NewMessageForm />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
