import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomeScreen, BookingScreen, BookingConfirm } from "./components";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomeScreen} />
    <Route path="/booking/:placeId" component={BookingScreen} />
    <Route path="/confirm/:booking_id" component={BookingConfirm} />
  </Switch>
);

export default Routes;
