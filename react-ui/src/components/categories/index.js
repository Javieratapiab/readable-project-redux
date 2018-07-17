import React, { Component } from 'react';
import Navbar from '../layout/navbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Posts from '../posts/index';
import NewPost from '../posts/form/form';
import './index.css';

/* It good practice to bind event handlers in the constructor
as binding in the render method results in memory leaks. */
class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal = () => {
    this.setState(prevState => {
      return {
        open: !prevState.open
      }
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return(
      <div>
        <Navbar />
        <Grid container spacing={16}
              alignItems='center'
              direction='row'
              justify='space-around'>
          <Grid item xs={8}>
            <h2 className='main-title'>Posts dashboard</h2>
          </Grid>
          <Grid item xs={4}>
            <Button variant="outlined"
                    onClick={() => this.toggleModal()}>New post
            </Button>
          </Grid>
        </Grid>
        <NewPost open={this.state.open} toggleModal={this.toggleModal} />
        <Posts {...this.props} />
      </div>
    )
  }
}

export default Categories
