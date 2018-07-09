import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import NativeSelect from '@material-ui/core/NativeSelect';
import { capitalize } from '../../../utils/helpers'
import { createPost } from '../actions';
import { connect } from 'react-redux';
import '../index.css';

class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      author: '',
      category: ''
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
    const { createPost, handleClose } = this.props
    createPost(this.state)
    handleClose()
  }

  renderCategoriesOptions() {
    const { categories } = this.props
    return categories.map((category) => {
      const categoryName = capitalize(category.name)
      return <option value={category.name} key={category.name}>{categoryName}</option>
    })
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
          <DialogTitle id="form-dialog-title">Create a new post here! :)</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name='title'
              label="Title"
              value={this.state.title}
              onChange={this.handleChange}
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              name="body"
              label="Content"
              value={this.state.body}
              type="text"
              onChange={this.handleChange}
              fullWidth
            />
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
            <NativeSelect
              className='categories-selector'
              value={this.state.category}
              name='category'
              onChange={this.handleChange}
              fullWidth
            >
              <option value="" disabled>Select a category</option>
              { this.renderCategoriesOptions() }
            </NativeSelect>
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

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createPost: (params) => dispatch(createPost(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
