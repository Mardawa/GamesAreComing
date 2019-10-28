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
import moment from 'moment';

const Timer = ({ name, date }) => {
  const getDuration = date => {
    const now = moment();
    date = moment(date);
    return date.diff(now);
  };

  const [duration, setDuration] = useState(getDuration(date));

  useEffect(() => {
    const intervalID = setInterval(() => setDuration(getDuration(date)), 30000);
    return function cleanup() {
      clearInterval(intervalID);
    };
  });

  const displayDate = date => {
    return moment(date).format('D MMMM YYYY');
  };

  return (
    <Card inverse style={{ maxWidth: '450px' }}>
      <CardImg width="100%" src="http://placekitten.com/g/318/250" />
      <CardImgOverlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <CardTitle className="text-center">
          <h1>{name}</h1>
          <h2>{displayDate(date)}</h2>
        </CardTitle>
        <Container className="text-center">
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
      </CardImgOverlay>
    </Card>
  );
};

export default Timer;
