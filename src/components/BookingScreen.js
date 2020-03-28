import React, { useState, useEffect } from "react";
import { BOOKING_API } from "../constants/urls";
import HeaderComponent from "./HeaderComponent";
import { Auth } from "aws-amplify";
import { encrypt, decrypt } from "../constants/ceaser_cipher";
import { useHistory, useParams } from "react-router-dom";
import {
  Container,
  Header,
  Grid,
  Segment,
  Form,
  Input,
  Select,
  Button,
  GridColumn
} from "semantic-ui-react";

const options = [
  { text: "1", value: 1 },
  { text: "2", value: 2 },
  { text: "3", value: 3 },
  { text: "4", value: 4 },
  { text: "5", value: 5 }
];

const BookingScreen = props => {
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
  const [passengers, setPassengers] = useState(1);
  const [basePrice, setBasePrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [card, setCard] = useState({ cardNumber: "", mm: "", yy: "", cvv: "" });
  const [email, setEmail] = useState("");
  const { placeId } = useParams();
  const history = useHistory();
  useEffect(() => {
    console.log(card);
    async function loadBaseprice() {
      await setBasePrice(12);
      await setTotal(12);
    }
    loadBaseprice();
    Auth.currentUserInfo().then(user => {
      setEmail(user.attributes.email);
    });
  }, []);

  const setCardNumber = number => {
    return number
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };
  const bookTicket = () => {
    let token = "";

    Auth.currentSession().then(sess => {
      token = sess.getIdToken().getJwtToken();
      console.log(token);
      console.log(card);
      fetch(BOOKING_API + "/verify_payment", {
        method: "post",
        body: encrypt(JSON.stringify({ ...card, token: token }))
      })
        .then(response => response.text())
        .then(responseText => JSON.parse(decrypt(responseText)))
        .then(responseJson => {
          if (responseJson.code == 0) {
            alert("Invalid Card Details");
            return;
          } else if (responseJson.code == 1) {
            const data = {
              userID: email,
              placeID: placeId,
              passengers: passengers,
              journeyDate: date,
              cardEnding: card.cardNumber.split(" ")[3],
              basePrice: basePrice,
              totalPrice: total,
              token: token
            };
            console.log(data);
            fetch(BOOKING_API + "/book", {
              method: "post",
              body: encrypt(JSON.stringify(data))
            })
              .then(response => response.text())
              .then(responseText => JSON.parse(decrypt(responseText)))
              .then(responseJson => {
                console.log(responseJson);
                history.replace("/confirm/" + responseJson.booking_id);
              });
          }
        });
    });
  };
  return (
    <Container>
      <HeaderComponent screenName="Booking" />

      <Grid padded centered>
        <Grid.Row>
          <Header style={{ padding: 10 }}>Booking: </Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <Form>
              <Form.Group widths="equal">
                <Form.Field
                  control={Select}
                  label="Passengers"
                  options={options}
                  placeholder="Gender"
                  value={passengers}
                  onChange={(e, { value }) => {
                    setPassengers(value);
                    setTotal(basePrice * value);
                  }}
                />
                <Form.Field>
                  <label>Journey Date</label>
                  <input
                    type="date"
                    placeholder="Select Date"
                    value={date}
                    onChange={e => {
                      setDate(e.target.value);
                    }}
                  />
                </Form.Field>
              </Form.Group>
              <Header size="small">Card Details:</Header>

              <Form.Field
                control={Input}
                maxLength={19}
                label="Card Number"
                placeholder="1111 1111 1111 1111"
                value={card.cardNumber}
                onChange={(e, { value }) => {
                  setCard({
                    ...card,
                    cardNumber: setCardNumber(value)
                  });
                }}
              />
              <Form.Group widths="2">
                <Form.Field
                  control={Input}
                  maxLength={2}
                  label="MM"
                  placeholder="MM"
                  value={card.mm}
                  onChange={(e, { value }) => {
                    setCard({
                      ...card,
                      mm: value
                    });
                  }}
                />
                <Form.Field
                  control={Input}
                  maxLength={2}
                  label="YY"
                  placeholder="YY"
                  value={card.yy}
                  onChange={(e, { value }) => {
                    setCard({
                      ...card,
                      yy: value
                    });
                  }}
                />
                <Form.Field
                  control={Input}
                  maxLength={3}
                  label="CVV"
                  placeholder="XXX"
                  value={card.cvv}
                  onChange={(e, { value }) => {
                    setCard({
                      ...card,
                      cvv: value
                    });
                  }}
                />
              </Form.Group>
            </Form>
            <Header as="h4">Total Amount: ${total}</Header>
            <Grid>
              
              <Grid.Column width={8}>
                <Button primary onClick={() => bookTicket()} fluid>
                  Submit
                </Button>
              </Grid.Column>
              <Grid.Column width={8}>
                <Button negative onClick={() => history.replace('/')} fluid>
                  Cancel
                </Button>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export { BookingScreen };
