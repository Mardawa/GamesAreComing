import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../../actions/itemActions';
import PropTypes from 'prop-types';
import Timer from './Timer';
import Grid from '@material-ui/core/Grid';
import { Spinner } from 'reactstrap';

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items, loading } = this.props.item;
    return (
      <div>
        {!loading ? (
          <Grid container fluid="true" justify="center" spacing={3}>
            {items.map(({ _id, name, rdate, filePath }) => {
              return (
                <Grid key={_id} item xs={12} sm={6} md={6} lg={4} xl={3}>
                  <Timer
                    name={name}
                    date={rdate}
                    filePath={filePath}
                    id={_id}
                    onDeleteClick={this.onDeleteClick.bind(this, _id)}
                  />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Grid container justify="center" spacing={3}>
            <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="primary" />
          </Grid>
        )}
      </div>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { item, loading } = state;
  return { item, loading };
}

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
