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
import { capitalize } from '../../utils/helpers';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAll } from '../categories/actions';
import { fetchPostsByCategory } from '../../utils/postsAPI';

const materialStyles = {
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
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  };

  componentDidMount = () => {
    const { fetchCategories } = this.props;
    fetchCategories()
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, fetchPosts, categories } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className='navbar-toolbar'>
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
            {/* Dropdown categories */}
            <MenuItem>
              <Link to="/" onClick={this.handleClose} style={{ textDecoration: 'none', color: 'black' }}>All</Link>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.name} onClick={this.handleClose}>
                <Link to={`/${category.path}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                      onClick={() => fetchPosts(category.path)}>
                  {capitalize(category.name)}
                </Link>
              </MenuItem>
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

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (data) => dispatch(fetchPostsByCategory(data)),
    fetchCategories: () => dispatch(fetchAll())
  }
}

export default compose(withStyles(materialStyles), connect(mapStateToProps, mapDispatchToProps))(CategoriesNavbar);
