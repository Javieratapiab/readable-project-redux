import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NewComment from './form/form';
import CommentDetail from './detail/index';
import FlipMove from "react-flip-move";
import './index.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { empty } from '../../utils/helpers';

// Material UI styles
const materialStyles = {
  button: {
    color: '#ff3a3a',
    fontWeight: 'bold'
  },
};
class CommentsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
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

  renderComment() {
    const { comments } = this.props;
    if (!empty(comments)) {
      return comments.allIds.map((commentId) => {
        let comment = comments.byId[commentId]
        if (comment.deleted) return false
        return <CommentDetail key={comment.id} comment={comment} />
      })
    }
  }

  render() {
    const { classes, post } = this.props;
    return (
      <Grid item xs={12} sm={6}>
        <h2 className='main-title'>Comments</h2>
          <Grid>
              <Button variant="outlined"
                      onClick={() => this.toggleModal()}
                      className={classes.button}>
                      New comment
              </Button>
          </Grid>
          <FlipMove duration={250} easing="ease-out">
            { this.renderComment() }
          </FlipMove>
      <NewComment open={this.state.open}
                  toggleModal={this.toggleModal}
                  postID={post}/>
      </Grid>
    );
  }
}

CommentsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

export default compose(withStyles(materialStyles),
              connect(mapStateToProps, null))(CommentsList);