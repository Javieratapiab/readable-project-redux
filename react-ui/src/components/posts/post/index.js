import React, { Component } from 'react';
import Navbar from '../../layout/navbar';
import Posts from '../index';
import { fetchAllComments } from '../../comments/actions';
import { fetchPostById } from '../actions';
import { connect } from 'react-redux';
import CommentsList from '../../comments/index'
import Grid from '@material-ui/core/Grid';
import NotFound from '../../../NotFound';
import { empty } from '../../../utils/helpers';

class Post extends Component  {
  componentDidMount() {
    const { fetchComments, fetchPost, match} = this.props
    fetchComments(match.params.id)
    fetchPost(match.params.id)
  }

  renderContent = () => {
    const { post } = this.props
    if (!empty(post)) {
      let postID = post.allIds[0];
      let postObj = post.byId[postID];
      if (postID === undefined || postObj.deleted) return <NotFound />;
      return (
        <div>
          <h2 className='main-title'>Post detail</h2>
          <Posts {...this.props}/>
          <Grid container spacing={16}
                alignItems='center'
                direction='row'
                justify='space-around'>
            <CommentsList post={postID}/>
          </Grid>
        </div>
      );
    }
  }

  render () {
    return (
      <div>
        <Navbar />
        { this.renderContent() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    post: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (id) => dispatch(fetchPostById(id)),
    fetchComments: (id) => dispatch(fetchAllComments(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);