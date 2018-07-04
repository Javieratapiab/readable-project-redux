import React, { Component } from 'react';
import Navbar from '../layout/navbar';
import Posts from '../posts/index';
import Grid from '@material-ui/core/Grid';
import { fetchAll } from './actions';
import { connect } from 'react-redux';
import './index.css';

class Categories extends Component {
  state = {
    open: false
  }

  componentDidMount = () => {
    const { fetchCategories } = this.props;
    fetchCategories()
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
    const { categories } = this.props;
    return(
      <div>
        <Navbar categories={categories} />
        <Grid container spacing={24}>
          <Grid item xs={7} align="right">
            <h2>Posts dashboard</h2>
          </Grid>
          {/* <Grid item xs={5} align="center">
            <div className="valign-center">
              <Button size="medium" onClick={() => this.showModal()}>
                <span>NEW</span>
                <i className="material-icons add-post-icon">add_circle</i>
              </Button>
            </div>
          </Grid> */}
        </Grid>
        <Posts {...this.props}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(fetchAll())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
