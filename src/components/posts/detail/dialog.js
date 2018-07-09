import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { editPost } from '../actions';
import { connect } from 'react-redux';

class PostDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      title: '',
      body: ''
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount = () => {
    const { post } = this.props
    this.setState({
      id: post.id,
      title: post.title,
      body: post.body
    });
  }

  // Handle title input
  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  // Handle body input
  handleBodyChange(event) {
    this.setState({body: event.target.value});
  }

  handleSubmit() {
    const { editAction } = this.props
    const params = { title: this.state.title, body: this.state.body }
    editAction(this.state.id, params)
    // handleClose()
  }

  render() {
    const { open, handleClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        >
        <form onSubmit={this.handleSubmit}>
          <DialogTitle id="form-dialog-title">Edit your post post</DialogTitle>
          <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="post-title"
                label="Post title"
                value={this.state.title}
                onChange={this.handleTitleChange}
                type="text"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="post-body"
                label="Post body"
                value={this.state.body}
                type="text"
                onChange={this.handleBodyChange}
                fullWidth
              />
          </DialogContent>
          <DialogActions style= {{ justifyContent: 'center' }}>
            <Button onClick={ handleClose } color="primary">
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
    editAction: (id, params) => dispatch(editPost(id, params))
  }
}

export default connect(null, mapDispatchToProps)(PostDialog);
