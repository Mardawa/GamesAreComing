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
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { updateItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class UpdateItemModal extends Component {
  state = {
    modal: false,
    name: this.props.item[0].name,
    r_date: this.props.item[0].rdate,
    id: this.props.id
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

    const rdate = moment.isMoment(this.state.r_date)
      ? this.state.r_date.format('YYYY-MM-DD')
      : this.state.r_date;

    const updatedItem = {
      name: this.state.name,
      rdate: rdate
    };

    this.props.updateItem(this.props.id, updatedItem);
    this.toggle();
  };

  render() {
    return (
      <div>
        <Fab color="primary" aria-label="edit" onClick={this.toggle}>
          <EditIcon />
        </Fab>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader
            toggle={this.toggle}
          >{`Update ${this.props.item[0].name}`}</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder={this.props.item[0].name}
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
                  Update Game
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

UpdateItemModal.propTypes = {
  updateItem: PropTypes.func.isRequired,
  item: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  const id = ownProps.id;
  const { items } = state.item;
  const item = items.filter(item => item._id === id);
  return { item };
}

export default connect(
  mapStateToProps,
  { updateItem }
)(UpdateItemModal);
