import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import Timer from './countdown/Timer';
import Grid from '@material-ui/core/Grid';

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;
    return (
      <div>
        <Container>
          <ListGroup>
            {items.map(({ _id, name, rdate }) => {
              return (
                <ListGroupItem key={_id}>
                  <IconButton onClick={this.onDeleteClick.bind(this, _id)}>
                    <DeleteIcon />
                  </IconButton>
                  {name} {rdate}
                </ListGroupItem>
              );
            })}
          </ListGroup>
          <br />
        </Container>
        <Grid container justify="center" spacing={3}>
          {items.map(({ _id, name, rdate }) => {
            return (
              <Grid key={_id} item lg={4}>
                <Timer name={name} date={rdate} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
