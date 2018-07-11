import React, { Component } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchAll } from './actions';
import { reorder } from './actions';
import NativeSelect from '@material-ui/core/NativeSelect';
import { fetchPostsByCategory } from '../../utils/postsAPI';
import PostDetail from './detail/index';
import FlipMove from "react-flip-move";
import { empty } from '../../utils/helpers';
import { mapKeys } from '../../utils/helpers';

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
  componentWillMount() {
    const { fetchAllPosts, fetchByCategory, match } = this.props;
    if (match.params.category) {
      fetchByCategory(match.params.category)
    } else if (match.params.id) {
      return
    } else {
     fetchAllPosts();
    }
  }

  renderPosts() {
    const { posts, match, sort } = this.props;
    if (!empty(posts)) {
      const ordered = sort !== '' ? this.orderPosts(sort, posts) : posts
      return ordered.allIds.map((postId) => {
        let post = ordered.byId[postId]
        let postCategory = post.category
        let categoryUrl = match.params.category
        if (post.deleted || (categoryUrl && categoryUrl !== postCategory)) return false
        return <PostDetail key={postId} post={post} />
      })
    }
  }

  orderPosts(sort, posts) {
    // Order posts by date
    if (sort === 'date') {
      const orderByDate = Object.values(posts.byId).reverse((a,b) => {
        return new Date(a.timestamp) - new Date(b.timestamp);
      })
      return (mapKeys(orderByDate, {}))
    // Order posts by score
    } else if (sort === 'score') {
      const orderByScore = Object.values(posts.byId).sort((b,a) => {
        return a.voteScore - b.voteScore
      })
      return (mapKeys(orderByScore, {}))
    }
  }

  render () {
    const { sortPosts } = this.props;
    return (
      <div>
         <Grid container item spacing={0} justify="center" >
            <Grid item xs={4}>
              <NativeSelect
                    className='categories-selector'
                    name='sortBy'
                    onChange={event => sortPosts(event.target.value)}
                    fullWidth
                >
                  <option value="" disabled>Sort by: </option>
                  <option value='date' key='date'>Date</option>
                  <option value='score' key='score'>Score</option>
              </NativeSelect>
            </Grid>
        </Grid>
        <Grid container spacing={16}
              alignItems='center'
              direction='row'
              justify='space-around'>
          <FlipMove duration={250} easing="ease-out">
            { this.renderPosts() }
          </FlipMove>
        </Grid>
      </div>
    );
  }
}

PostIndex.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    sort: state.postsSorted
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sortPosts: (sortBy) => dispatch(reorder(sortBy)),
    fetchAllPosts: () => dispatch(fetchAll()),
    fetchByCategory: (category) => dispatch(fetchPostsByCategory(category)),
  }
}

export default compose(withStyles(materialStyles),
              connect(mapStateToProps, mapDispatchToProps))(PostIndex);
