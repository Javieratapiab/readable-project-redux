import React, { Component } from 'react';
import Navbar from '../../layout/navbar';
import { fetchAll } from '../../categories/actions';
import { connect } from 'react-redux';

class Post extends Component  {
  componentDidMount = () => {
    const { fetchCategories } = this.props;
    fetchCategories()
  }
  render () {
    const { categories } = this.props;
    return (
      <Navbar categories={categories}/>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);