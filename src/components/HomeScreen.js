import PropTypes from "prop-types";
import React, { useState } from "react";
import { PLACES_API } from "../constants/urls";
import {
  Container,
  Grid,
  Segment,
  List,
  Input,
  Image,
  Search,
  Label
} from "semantic-ui-react";
import FRONT_IMAGE from "./front-image.jpg";
import HeaderComponent from "./HeaderComponent";
import { useHistory } from "react-router-dom";

const HomeScreen = props => {
  const [state, setState] = useState({
    isLoading: false,
    search: ""
  });
  const [dataSource, setDataSource] = useState([]);
  // Auth.currentSession()
  // .then(session => console.log(session))
  // .catch(err => console.error(err));
  const history = useHistory();

  // clickPlace = id => {
  //   this.navigation.navigate("BookingScreen", {
  //     placeId: id
  //   });
  // };

  function SearchFilterFunction(text) {
    setState({ search: text, isLoading: true });
    if (text.trim() !== "") {
      //passing the inserted text in textinput
      fetch(PLACES_API + "/search?q=" + text.trim())
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.code === 1) {
            setDataSource(
              responseJson.data.map(s => ({ ...s, key: s.id, price: s.id }))
            );
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
    setState({
      ...state,
      isLoading: false
    });
  }

  const resultRenderer = element => {
    console.log(element);
    return (
      <List.Item
        key={element.key}
        onClick={e => {
          history.replace("/booking/" + element.price);
        }}
      >
        <List.Content>
          <List.Header>{element.title}</List.Header>
          <List.Description>{element.description}</List.Description>
        </List.Content>
      </List.Item>
    );
  };

  resultRenderer.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string
  };
  return (
    <div>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <HeaderComponent screenName="Search Places" />
        <Image
          src={FRONT_IMAGE}
          fluid
          style={{
            maxHeight: "100vh",
            /* Center and scale the image nicely */
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        />
        <div
          style={{
            width: "30%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <Grid fluid>
            <Grid.Column>
              <Search
                input={{ fluid: true }}
                loading={state.isLoading}
                onSearchChange={(e, { value }) => {
                  SearchFilterFunction(value);
                }}
                results={dataSource}
                resultRenderer={resultRenderer}
              />
            </Grid.Column>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export { HomeScreen };
