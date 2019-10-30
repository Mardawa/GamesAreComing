import React, { useState, useEffect } from 'react';
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
import UpdateItemModal from '../updateItemModal';

const Timer = ({ name, date, onDeleteClick, id }) => {
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
      style={{ maxWidth: '450px', maxHeight: '250px' }}
      onMouseEnter={setHovered}
      onMouseLeave={switchHover}
    >
      <CardImg width="100%" src="http://placekitten.com/450/249" />
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
                <UpdateItemModal id={id} />
              </Col>
              <Col>
                <Fab
                  color="secondary"
                  aria-label="delete"
                  onClick={onDeleteClick}
                >
                  <DeleteIcon />
                </Fab>
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

export default Timer;
