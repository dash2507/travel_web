import React from "react";
import { Menu } from "semantic-ui-react";
import { SignOut } from "aws-amplify-react";
function HeaderComponent() {
  return (
    <Menu fixed="top" inverted>
      <Menu.Item as="a" header>
        Canada Travel
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item as={SignOut}>Log out</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
export default HeaderComponent;
