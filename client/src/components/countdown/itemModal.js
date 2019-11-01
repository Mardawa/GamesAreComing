import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
  FormGroup
} from 'reactstrap';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import moment from 'moment';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { addItem } from '../../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
    r_date: moment()
  };

  toggle = () => {
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

    const newItem = {
      name: this.state.name,
      rdate: this.state.r_date.format('YYYY-MM-DD')
    };

    this.props.addItem(newItem);
    this.toggle();
  };

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        {isAuthenticated ? (
          <Button
            variant="contained"
            color="default"
            startIcon={<AddIcon />}
            onClick={this.toggle}
          >
            Add Game
          </Button>
        ) : (
          <Button
            variant="contained"
            color="default"
            startIcon={<AddIcon />}
            disabled
          >
            Add Game
          </Button>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add a new Game</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Enter Game's Title"
                  onChange={this.onChange}
                />
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="DD/MM/YYYY"
                    margin="normal"
                    id="date-picker-inline"
                    label="Release date"
                    value={this.state.r_date}
                    onChange={this.onDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </MuiPickersUtilsProvider>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '0.5rem' }}
                  fullWidth={true}
                  type="submit"
                >
                  Add Game
                </Button>
              </FormGroup>
            </Form>
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

ItemModal.propTypes = {
  addItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { item } = state;
  const { isAuthenticated } = state.auth;
  return { item, isAuthenticated };
}

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);