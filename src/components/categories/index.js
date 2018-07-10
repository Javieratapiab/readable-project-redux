import React, { Component } from 'react';
import Navbar from '../layout/navbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Posts from '../posts/index';
import NewPost from '../posts/form/form';
import './index.css';
class Categories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleClose = this.handleClose.bind(this)
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
                    onClick={() => this.showModal()}
                    className='new-post-button'
                    style = {{ color: '#ff3a3a', fontWeight: 'bold' }}>New post
            </Button>
          </Grid>
        </Grid>
        <NewPost open={this.state.open}  handleClose={this.handleClose} />
        <Posts {...this.props}/>
      </div>
    )
  }
}

export default Categories
