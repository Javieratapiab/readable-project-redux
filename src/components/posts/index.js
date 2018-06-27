import React, { Component } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchAll } from './actions';
import { fetchPostsByCategory } from '../../utils/postsAPI';
import PostDetail from './detail/index'
import { empty } from '../../utils/helpers';

// Material UI styles
const materialStyles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};
class PostIndex extends Component  {
  componentDidMount() {
    const { fetchAllPosts, fetchByCategory, match } = this.props;
    if (match.params.category) {
      fetchByCategory(match.params.category)
    } else {
      fetchAllPosts();
    }
  }

  // Render PostDetail component
  renderPosts() {
    const { posts } = this.props;
    if (!empty(posts)) {
      return posts.allIds.map((postId) => {
        let post = posts.byId[postId]
        return <PostDetail key={post.id} post={post} />
      })
    }
  }

  render () {
    return (
      <Grid container spacing={16}
            alignItems='center'
            direction='row'
            justify='space-around'>
        { this.renderPosts() }
      </Grid>
    );
  }
}

PostIndex.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllPosts: () => dispatch(fetchAll()),
    fetchByCategory: (category) => dispatch(fetchPostsByCategory(category))
  }
}

export default compose(withStyles(materialStyles),
               connect(mapStateToProps, mapDispatchToProps))(PostIndex);
