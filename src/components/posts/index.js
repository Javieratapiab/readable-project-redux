import React, { Component } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import * as PostsAPI from '../../utils/postsAPI';
import { datetimeFormat } from '../../utils/helpers';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchAll } from './actions';

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
  state = {
    posts: []
  }

  componentWillMount() {
    const { fetchAllPosts } = this.props;
    fetchAllPosts();
  }

  render () {
    const { classes, posts } = this.props;
    return (
      <Grid
        container spacing={16}
        alignItems='center'
        direction='row'
        justify='space-around'
      >
      {posts.map((post) => (
        <Grid key={post.id}>
            <Card className={classes.card}>
              <CardContent>
                <div className="post-header">
                  <Typography className={classes.title}
                              color="textSecondary">
                    { datetimeFormat(post.timestamp) }
                  </Typography>
                  <span>
                    <span className='post-votescore'>{ post.voteScore }</span>
                    <i className="material-icons star-icon">star</i>
                  </span>
                </div>
                <Typography variant="headline"
                            component="h2"
                            style= {{ textAlign: 'center' }}>
                  { post.title }
                </Typography>
                <Typography className={classes.pos}
                            color="textSecondary"
                            style= {{ textAlign: 'center' }}>
                  Author: { post.author }
                </Typography>
                <Typography component="p"
                            style= {{ textAlign: 'center' }}>
                  { post.body }
                </Typography>
              </CardContent>
              <CardActions className='post-actions'>
                {/* Comments */}
                <Button size="small">
                  <span className='comment-count'>{ post.commentCount }</span>
                  <span className='message-icon'>
                    <i className="material-icons">message</i>
                  </span>
                </Button>
                {/* Thumbs up */}
                <Button size="small">
                  <span className='thumb-up-icon'>
                    <i className="material-icons">thumb_up</i>
                  </span>
                </Button>
                {/* Thumbs down */}
                <Button size="small">
                  <span className='thumb-down-icon'>
                    <i className="material-icons">thumb_down</i>
                  </span>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
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
  }
}

export default compose(withStyles(materialStyles),
               connect(mapStateToProps, mapDispatchToProps))(PostIndex);
