import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { editComment } from '../actions';
import { connect } from 'react-redux';

class EditDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      body: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount = () => {
    const { comment } = this.props
    this.setState({
      body: comment.body
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault()
    const { editAction, comment, handleClose } = this.props
    editAction(comment.id, this.state)
    handleClose()
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
          <DialogTitle id="form-dialog-title">Edit your comment!</DialogTitle>
          <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="comment-body"
                label="Comment body"
                name='body'
                value={this.state.body}
                type="text"
                onChange={this.handleChange}
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
    editAction: (id, params) => dispatch(editComment(id, params))
  }
}

export default connect(null, mapDispatchToProps)(EditDialog);
