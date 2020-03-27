import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { config } from "./constants/amplify-config";
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});

function App() {
  return (
    <BrowserRouter>
      <Routes />;
    </BrowserRouter>
  );
}

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 1,
      type: "string"
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 2,
      type: "password"
    }
  ]
};
const usernameAttributes = "email";
export default withAuthenticator(App, {
  signUpConfig,
  usernameAttributes
});

