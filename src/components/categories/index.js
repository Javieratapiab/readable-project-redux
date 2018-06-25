import React, { Component } from 'react';
import Navbar from './navbar';
import Posts from '../posts/index';
import * as CategoriesAPI from '../../utils/categoriesAPI';
import Grid from '@material-ui/core/Grid';
import { fetchAll } from './actions';
import { connect } from 'react-redux';

class Categories extends Component {
  state = {
    categories: []
  }

  componentDidMount = () => {
    const { fetchCategories } = this.props;
    CategoriesAPI.fetchAll()
    .then((response) => {
      this.setState(() => ({
        categories: response.categories
      }))
      fetchCategories(response)
    })
  }

  render() {
    return(
      <div>
        <Navbar categories={this.state.categories} />
        <Grid container>
          <Grid item xs={12}>
            <h2 style={{ textAlign: 'center' }}>Posts dashboard</h2>
          </Grid>
        </Grid>
        <Posts/>
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
    fetchCategories: (data) => dispatch(fetchAll(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
