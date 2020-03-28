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
          <Card.Header style={{ padding: 10 }}>Booking Confirmed</Card.Header>
          <Card.Content>
            Congratulations! <br />
            Your tickets are booked successfully!
            <br />
            <span>Booking ID: {booking_id}</span>
            <br />
          </Card.Content>
          <Button
            onClick={() => {
              history.replace("/");
            }}
          >
            Go To Home
          </Button>
        </Card>
      );
    } else {
      return <h2>Booking Not Successful</h2>;
    }
  };
  return (
    <Container>
      <HeaderComponet screenName="Booking Status" />
      <Grid padded centered>
        <Grid.Row>{printStatus()}</Grid.Row>
      </Grid>
    </Container>
  );
};
export { BookingConfirm };
