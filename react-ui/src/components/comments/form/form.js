import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { createComment } from '../actions';
import '../index.css';

class NewComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: '',
      author: '',
      parentId: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Handle title input
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { create, toggleModal, postID } = this.props
    this.setState({ parentId: postID }, function() {
      create(this.state)
      toggleModal()
    });
  }

  render() {
    const { open, toggleModal } = this.props;
    return (
      <Dialog
        open={open}
        onClose={toggleModal}
        aria-labelledby="form-dialog-title"
        >
        <form onSubmit={this.handleSubmit}>
          <DialogTitle id="form-dialog-title">Create a new comment here</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="author"
              label="Author"
              value={this.state.author}
              type="text"
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin='dense'
              name='body'
              label='Body'
              value={this.state.body}
              onChange={this.handleChange}
              type='text'
              fullWidth
            />
          </DialogContent>
          <DialogActions style= {{ justifyContent: 'center' }}>
            <Button onClick={ toggleModal } color="primary">
              Cancel
            </Button>
            <Button type='submit' value='Submit' color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    create: (params) => dispatch(createComment(params))
  }
}

export default connect(null, mapDispatchToProps)(NewComment);
