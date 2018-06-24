import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { connect } from 'react-redux';
import * as CategoriesAPI from '../../../utils/categoriesAPI';
import { fetchAll } from '../actions';
import { compose } from 'redux';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class CategoriesNavbar extends Component {
  state = {
    categories: [],
    anchorEl: null,
  };

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

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, categories } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className="categoriesToolbar">
            <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                aria-owns={ open ? 'menu-appbar' : null }
                aria-haspopup="true"
                onClick={this.handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
            {categories.map((category) => (
              <MenuItem key={category.name} onClick={this.handleClose}>{category.name}</MenuItem>
            ))}
          </Menu>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Categories
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

CategoriesNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

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

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(CategoriesNavbar);
