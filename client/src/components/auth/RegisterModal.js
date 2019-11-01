import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavLink,
  Container,
  Row,
  Col,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { FormControl, Button, Input, InputLabel } from '@material-ui/core/';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (this.state.modal && isAuthenticated) {
      this.toggle();
    }
  }

  toggle = () => {
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onDateChange = date => {
    this.setState({ r_date: date });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;

    //  Creater user object
    const newUser = {
      name,
      email,
      password
    };

    // Attempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <NavLink href="#" onClick={this.toggle}>
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <Container className="text-center">
              <Row>
                <Col sm={{ size: 'auto', offset: 3 }}>
                  Join Wooloo Production
                </Col>
              </Row>
              <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>
                  <h1>Create your account</h1>
                </Col>
              </Row>
            </Container>
          </ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <form onSubmit={this.onSubmit}>
              <Container>
                <Row>
                  <FormControl fullWidth={true}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      fullWidth={true}
                      placeholder="A Man Needs a Name"
                      variant="outlined"
                      className="mb-3"
                      onChange={this.onChange}
                    />
                  </FormControl>
                </Row>

                <Row>
                  <FormControl fullWidth={true}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      fullWidth={true}
                      placeholder="Gunther@woolooproduction.com"
                      variant="outlined"
                      className="mb-3"
                      onChange={this.onChange}
                    />
                  </FormControl>
                </Row>

                <Row>
                  <FormControl fullWidth={true}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      fullWidth={true}
                      placeholder="123456"
                      variant="outlined"
                      className="mb-3"
                      onChange={this.onChange}
                    />
                  </FormControl>
                </Row>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '0.5rem' }}
                  fullWidth={true}
                  type="submit"
                >
                  Register
                </Button>
              </Container>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="contained" color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

RegisterModal.propTypes = {
  isAuthentificated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { isAuthenticated } = state.auth;
  const { error } = state;
  return { isAuthenticated, error };
}

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);
