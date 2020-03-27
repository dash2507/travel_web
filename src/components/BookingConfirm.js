import React, { useState } from "react";
import HeaderComponet from "./HeaderComponent";
import { Container, Card, Button, Grid } from "semantic-ui-react";
import { useParams, useHistory } from "react-router-dom";

const BookingConfirm = ({ props }) => {
  const { booking_id } = useParams();

  const history = useHistory();
  // const { bookingStatus } = route.params;

  const printStatus = () => {
    if (booking_id !== undefined) {
      return (
        <Card padded>
          <Card.Header>Booking Confirmed</Card.Header>
          <Card.Content>
            Congratulations! Your tickets are booked successfully!
            <br />
            <span>Booking ID: {booking_id}</span>
            <br />
            <Button
              onClick={() => {
                history.replace("/");
              }}
            >
              Go To Home
            </Button>
          </Card.Content>
        </Card>
      );
    } else {
      return <h2>Booking Not Successful</h2>;
    }
  };
  return (
    <Container>
      <HeaderComponet screenName="Booking Status" />
      <Grid padded>{printStatus()}</Grid>
    </Container>
  );
};
export { BookingConfirm };
