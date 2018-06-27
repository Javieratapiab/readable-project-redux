import React, { Component } from 'react';
import Navbar from './navbar';
import Posts from '../posts/index';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { fetchAll } from './actions';
import { connect } from 'react-redux';
import './index.css';

class Categories extends Component {
  state = {
    open: false
  }

  componentDidMount = () => {
    const { fetchCategories } = this.props;
    fetchCategories()
  }

  // Open new post modal
  showModal() {
    this.setState(() => ({
      open: true
    }))
  }

  // Close new post modal
  handleClose() {
    this.setState(() => ({
      open: false
    }))
  }

  render() {
    const { categories } = this.props;
    return(
      <div>
        <Navbar categories={categories} />
        <Grid container spacing={24}>
          <Grid item xs={7} align="right">
            <h2>POSTS DASHBOARD</h2>
          </Grid>
          <Grid item xs={5} align="center">
            <div className="valign-center">
              <Button size="medium" onClick={() => this.showModal()}>
                <span>New post</span>
                <i className="material-icons add-post-icon">add_circle</i>
              </Button>
            </div>
          </Grid>
        </Grid>
        <Posts {...this.props}/>
        {/* TODO: MOVE THIS DIALOG TO ANOTHER COMPONENT */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose.bind(this)} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchAll())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
