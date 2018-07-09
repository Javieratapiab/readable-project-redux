import React, { Component } from 'react';
import Navbar from '../../layout/navbar';
import Posts from '../index';
import { fetchAllComments } from '../../comments/actions';
import { connect } from 'react-redux';
import CommentsList from '../../comments/index'
import Grid from '@material-ui/core/Grid';
class Post extends Component  {
  componentDidMount() {
    const { fetchComments, match } = this.props
    fetchComments(match.params.id)
  }

  render () {
    return (
      <div>
        <Navbar />
        <h2 className='main-title'>Post detail</h2>
        <Posts {...this.props}/>
        <Grid container spacing={16}
              alignItems='center'
              direction='row'
              justify='space-around'>
          <CommentsList comments={this.props.comments}/>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComments: (id) => dispatch(fetchAllComments(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);