import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { datetimeFormat } from '../../utils/helpers';
// import { compose } from 'redux';
// import { connect } from 'react-redux';

// Material UI styles
const materialStyles = {
  card: {
    minWidth: 275,
    borderRadius: '20px',
    margin: '20px',
    background: '#deff80'
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

class CommentsList extends Component {
  render() {
    const { classes, comments } = this.props;
    return (
      <Grid item xs={12} sm={6}>
        <h2 className='main-title'>Comments</h2>
          <Grid>
              <Button variant="outlined"
                      /* onClick={() => this.showModal()}*/
                      className='new-post-button'
                      style = {{ color: '#ff3a3a', fontWeight: 'bold' }}>New comment
              </Button>
          </Grid>
          { comments.map((comment) => (
          <Card className={classes.card} key={comment.id}>
            <CardContent>
              <div className="post-header">
                <Typography className={classes.title}>
                  { datetimeFormat(comment.timestamp) }
                </Typography>
                <span>
                  <span className='post-votescore'>{ comment.voteScore }</span>
                  <i className="material-icons star-icon">star</i>
                </span>
              </div>
              <Typography style= {{ textAlign: 'center' }}>
                { comment.body }
              </Typography>
              <Typography className={classes.pos}
                          color="textSecondary"
                          style= {{ textAlign: 'center' }}>
                Author: { comment.author }
              </Typography>
            </CardContent>
            <CardActions className='post-actions'>
              {/* Comments */}
              <Button size="small">
                <span className='comment-count'>{ comment.commentCount }</span>
                <span className='message-icon'>
                  <i className="material-icons">message</i>
                </span>
              </Button>
              {/* Thumbs up */}
              <Button size="small" /* onClick={() => addNewVote(comment.id, 'upVote') }*/>
                <span className='thumb-up-icon'>
                  <i className="material-icons">thumb_up</i>
                </span>
              </Button>
              {/* Thumbs down */}
              <Button size="small" /* onClick={() => addNewVote(comment.id, 'downVote') }*/>
                <span className='thumb-down-icon'>
                  <i className="material-icons">thumb_down</i>
                </span>
              </Button>
              {/* Remove button */}
              <Button size="small" /* onClick={() => deletePost(comment.id) }*/>
                <span className='remove-icon'>
                  <i className="material-icons">remove_circle</i>
                </span>
              </Button>
              {/* Edit button */}
              <Button size="small" /* onClick={() => this.showModal() }*/>
                <span className='edit-icon'>
                  <i className="material-icons">edit</i>
                </span>
              </Button>
            </CardActions>
          </Card>
        ))}
      </Grid>
    );
  }
}

CommentsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(materialStyles)(CommentsList);
