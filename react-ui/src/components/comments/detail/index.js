import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { datetimeFormat } from '../../../utils/helpers';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { commentVote } from '../actions';
import { deleteComment } from '../actions';
import { connect } from 'react-redux';
import EditDialog from './dialog';

// Material UI styles
const materialStyles = {
  button: {
    color: '#ff3a3a',
    fontWeight: 'bold'
  },
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
    textAlign: 'center',
    marginBottom: 12,
    color: 'textSecondary'
  },
};

class CommentDetail extends Component  {
  state = {
    open: false
  }
  // Open new post modal
  showModal() {
    this.setState({ open: true })
  }

  // Close new post modal
  handleClose = () => {
    this.setState({ open: false })
  }

  render () {
    const { classes, comment, newVote, deleteIt } = this.props;
    return (
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
        <Typography className='centered'>
          { comment.body }
        </Typography>
        <Typography className={classes.pos}>
          Author: { comment.author }
        </Typography>
      </CardContent>
        <CardActions className='post-actions'>
          {/* Thumbs up */}
          <Button size="small" onClick={() => newVote(comment.id, 'upVote') }>
            <span className='thumb-up-icon'>
              <i className="material-icons">thumb_up</i>
            </span>
          </Button>
          {/* Thumbs down */}
          <Button size="small" onClick={() => newVote(comment.id, 'downVote') }>
            <span className='thumb-down-icon'>
              <i className="material-icons">thumb_down</i>
            </span>
          </Button>
          {/* Remove button */}
          <Button size="small" onClick={() => deleteIt(comment.id) } >
            <span className='remove-icon'>
              <i className="material-icons">remove_circle</i>
            </span>
          </Button>
          {/* Edit button */}
          <Button size="small" onClick={() => this.showModal() } >
            <span className='edit-icon'>
              <i className="material-icons">edit</i>
            </span>
          </Button>
        </CardActions>
        {/* Edit post dialog */}
        <EditDialog open={this.state.open} handleClose={ this.handleClose } comment = { comment } />
      </Card>
    );
  }
}

CommentDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    newVote: (id, impression) => dispatch(commentVote(id, impression)),
    deleteIt: (id) => dispatch(deleteComment(id))
  }
}

export default compose(withStyles(materialStyles), connect(null, mapDispatchToProps))(CommentDetail);
