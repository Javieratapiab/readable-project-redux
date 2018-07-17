import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { datetimeFormat } from '../../../utils/helpers';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { newVote } from '../actions';
import { deletePost } from '../actions';
import PostDialog from './dialog';
import { Link } from 'react-router-dom';

// Material UI styles
const materialStyles = {
  card: {
    minWidth: 275,
    borderRadius: '20px',
    margin: '20px'
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

class PostDetail extends Component  {
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

  render () {
    const { post, classes, addNewVote, deletePost, commentsCount } = this.props;
    return (
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
          {/* TODO: THIS SHOULD BE ANOTHER COMPONENT */}
          <CardActions style={{justifyContent: 'center'}}>
            <Link to={`/${post.category}/${post.id}`} style={{ textDecoration: 'none' }}>
              <Button size="small" variant="contained" style= {{ background: '#1fb053', color: 'white', fontWeight: 'bold'}}>
                See details
              </Button>
            </Link>
          </CardActions>
          <CardActions className='post-actions'>
            {/* Comments */}
            <Button size="small">
              <span className='comment-count'>{commentsCount || 0 }</span>
              <span className='message-icon'>
                <i className="material-icons">message</i>
              </span>
            </Button>
            {/* Thumbs up */}
            <Button size="small" onClick={() => addNewVote(post.id, 'upVote') }>
              <span className='thumb-up-icon'>
                <i className="material-icons">thumb_up</i>
              </span>
            </Button>
            {/* Thumbs down */}
            <Button size="small" onClick={() => addNewVote(post.id, 'downVote') }>
              <span className='thumb-down-icon'>
                <i className="material-icons">thumb_down</i>
              </span>
            </Button>
            {/* Remove button */}
            <Button size="small" onClick={() => deletePost(post.id) }>
              <span className='remove-icon'>
                <i className="material-icons">remove_circle</i>
              </span>
            </Button>
            {/* Edit button */}
            <Button size="small" onClick={() => this.toggleModal() }>
              <span className='edit-icon'>
                <i className="material-icons">edit</i>
              </span>
            </Button>
          </CardActions>
        </Card>
        {/* Edit post dialog */}
        <PostDialog open={this.state.open} toggleModal={ this.toggleModal } post = { post } />
      </Grid>
    );
  }
}

PostDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    addNewVote: (id, impression) => dispatch(newVote(id, impression)),
    deletePost: (id) => dispatch(deletePost(id))
  }
}

export default compose(withStyles(materialStyles),
               connect(null, mapDispatchToProps))(PostDetail);
