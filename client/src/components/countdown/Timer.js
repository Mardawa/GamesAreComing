import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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

const getDuration = date => {
  const now = moment();
  date = moment(date);
  return date.diff(now);
};

const displayDate = date => {
  return moment(date).format('D MMMM YYYY');
};

const Timer = ({ name, date, soon, onDeleteClick, id, filePath }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [duration, setDuration] = useState(getDuration(date));
  const [hovered, setHovered] = useState(false);
  const img = `/api/images/${filePath}`;

  useEffect(() => {
    const intervalID = setInterval(() => setDuration(getDuration(date)), 1000);
    return function cleanup() {
      clearInterval(intervalID);
    };
  });

  const switchHover = () => {
    setHovered();
  };

  return (
    <div className="d-flex justify-content-center">
      <Card
        className="text-center"
        inverse
        style={{
          width: '450px',
          height: '250px'
        }}
        onMouseEnter={setHovered}
        onMouseLeave={switchHover}
      >
        <CardImg width="100%" height="100%" src={img} />
        <CardImgOverlay
          style={
            hovered
              ? { backgroundColor: 'rgba(250, 250, 250, 0.9)' }
              : { backgroundColor: 'rgba(51, 51, 51, 0.6)' }
          }
        >
          <CardTitle>
            <h3>{name}</h3>
            <h4>{!soon ? displayDate(date) : <br />}</h4>
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
            {!soon && duration > 0 ? (
              <Container className="font-weight-bold">
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
                  <Col> DAYS </Col>
                  <Col> HOURS </Col>
                  <Col> MIN.</Col>
                </Row>
              </Container>
            ) : (
              <Container>
                <h4>{!soon ? 'The game is out' : 'Coming soon'}</h4>
              </Container>
            )}
          </Container>
        </CardImgOverlay>
      </Card>
    </div>
  );
};

Timer.propTypes = {
  isAuthenticated: PropTypes.bool
};

export default Timer;
