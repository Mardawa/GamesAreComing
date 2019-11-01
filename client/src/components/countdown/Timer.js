import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Card,
  CardTitle,
  CardImg,
  CardImgOverlay,
  Container,
  Row,
  Col
} from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import UpdateItemModal from './updateItemModal';

const Timer = ({ name, date, onDeleteClick, id, isAuthenticated }) => {
  const getDuration = date => {
    const now = moment();
    date = moment(date);
    return date.diff(now);
  };

  const [duration, setDuration] = useState(getDuration(date));
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const intervalID = setInterval(() => setDuration(getDuration(date)), 1000);
    return function cleanup() {
      clearInterval(intervalID);
    };
  });

  const displayDate = date => {
    return moment(date).format('D MMMM YYYY');
  };

  const switchHover = () => {
    setHovered();
  };

  return (
    <Card
      className="text-center"
      inverse
      style={{
        minWidth: '450px',
        maxWidth: '450px',
        height: '250px'
      }}
      onMouseEnter={setHovered}
      onMouseLeave={switchHover}
    >
      <CardImg
        width="100%"
        height="100%"
        src="http://placekitten.com/1920/1080"
      />
      <CardImgOverlay
        style={
          hovered
            ? { backgroundColor: 'rgba(240, 240, 240, 0.9)' }
            : { backgroundColor: 'rgba(0, 0, 0, 0.6)' }
        }
      >
        <CardTitle>
          <h3>{name}</h3>
          <h4>{displayDate(date)}</h4>
        </CardTitle>
        <Container>
          {hovered ? (
            <Row>
              <Col>
                {isAuthenticated ? (
                  <UpdateItemModal id={id} />
                ) : (
                  <UpdateItemModal id={id} disabled={true} />
                )}
              </Col>
              <Col>
                {isAuthenticated ? (
                  <Fab
                    color="secondary"
                    aria-label="delete"
                    onClick={onDeleteClick}
                  >
                    <DeleteIcon />
                  </Fab>
                ) : (
                  <Fab
                    disabled
                    color="secondary"
                    aria-label="delete"
                    onClick={onDeleteClick}
                  >
                    <DeleteIcon />
                  </Fab>
                )}
              </Col>
            </Row>
          ) : (
            <br />
          )}
          {duration > 0 ? (
            <Container>
              <Row>
                <Col>{Math.floor(moment.duration(duration).asDays())} </Col>
                <Col>
                  {moment
                    .duration(duration)
                    .hours()
                    .toString()
                    .padStart(2, '0')}
                </Col>
                <Col>
                  {moment
                    .duration(duration)
                    .minutes()
                    .toString()
                    .padStart(2, '0')}
                </Col>
              </Row>
              <Row>
                <Col> Days </Col>
                <Col> Hours </Col>
                <Col> Minutes</Col>
              </Row>
            </Container>
          ) : (
            <Container>
              <h4>The Game is out</h4>
            </Container>
          )}
        </Container>
      </CardImgOverlay>
    </Card>
  );
};

Timer.propTypes = {
  isAuthenticated: PropTypes.bool
};

function mapStateToProps(state) {
  const { isAuthenticated } = state.auth;
  return { isAuthenticated };
}

export default connect(
  mapStateToProps,
  null
)(Timer);
