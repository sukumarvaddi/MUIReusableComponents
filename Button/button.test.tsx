import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "./index";

describe("Renders the button label As per FindHelp style guide", () => {
  it("renders button", () => {
    render(<Button variant="contained">Button</Button>);
    expect(screen.queryByText("Button")).not.toBeNull();
    //Material UI right out of box makes the button label uppercase. But find help button component does not change the case
    expect(screen.queryByText("BUTTON")).toBeNull();
  });
});
