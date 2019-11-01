import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';

class Logout extends Component {
  render() {
    return (
      <Fragment>
        <DropdownItem onClick={this.props.logout}>Sign out</DropdownItem>
      </Fragment>
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(
  null,
  { logout }
)(Logout);
