import React, { useState } from "react";
import { PLACES_API } from "../constants/urls";
import { Container, Grid, Segment, List, Input } from "semantic-ui-react";
import HeaderComponent from "./HeaderComponent";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

const HomeScreen = props => {
  const [state, setState] = useState({
    isLoading: false,
    search: "",
    dataSource: []
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
    console.log(text);
    setState({ ...state, search: text, isLoading: true });
    if (text.trim() !== "") {
      //passing the inserted text in textinput
      fetch(PLACES_API + "/search?q=" + text)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          if (responseJson.code === 1) {
            setDataSource(responseJson.data);
          }
          setState({
            ...state,
            isLoading: false
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  const renderList = () => {
    if (state.isLoading) {
      return <div />;
    }
    return (
      <List divided relaxed>
        {dataSource.map(element => {
          console.log(element);
          return (
            <List.Item
              key={element.id}
              onClick={e => {
                history.replace("/booking/" + element.id);
              }}
            >
              <List.Content>
                <List.Header>{element.title}</List.Header>
                <List.Description>{element.description}</List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    );
  };

  return (
    <Container>
      <HeaderComponent screenName="Search Places" />

      <Grid as={Segment}>
        <Grid.Row>
          {/* <Search
              loading={this.state.isLoading}
              onSearchChange={(e, { value }) => {
                this.SearchFilterFunction(value);
              }}
              results={this.state.dataSource}
              resultRenderer={this.renderList}
              value={this.state.search}
            /> */}
          <Input
            icon="search"
            iconPosition="left"
            placeholder="Search"
            action="Search"
            onChange={(e, { value }) => {
              SearchFilterFunction(value);
            }}
          />
        </Grid.Row>
      </Grid>
      {renderList()}
    </Container>
  );
};
export { HomeScreen };
