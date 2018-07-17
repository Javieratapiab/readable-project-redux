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
      title: '',
      body: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount = () => {
    const { post } = this.props
    this.setState({
      title: post.title,
      body: post.body
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault()
    const { editAction, post, toggleModal } = this.props
    editAction(post.id, this.state)
    toggleModal()
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
          <DialogTitle id="form-dialog-title">Edit your post post</DialogTitle>
          <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="post-title"
                label="Post title"
                name='title'
                value={this.state.title}
                onChange={this.handleChange}
                type="text"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="post-body"
                label="Post body"
                name='body'
                value={this.state.body}
                type="text"
                onChange={this.handleChange}
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
    editAction: (id, params) => dispatch(editPost(id, params))
  }
}

export default connect(null, mapDispatchToProps)(PostDialog);
