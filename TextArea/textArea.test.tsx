import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { TextArea } from ".";

describe("Test TextArea", () => {
  it("Test without any preassigned value", () => {
    render(<TextArea maxLength={20} variant="outlined" />);
    expect(screen.queryByText("0/20")).not.toBeNull();
    expect(screen.queryByText("*/20")).toBeNull();
  });
  it("Test without any preassigned maxLength and value", () => {
    render(<TextArea variant="outlined" />);
    expect(screen.queryByText("0/20")).not.toBeNull();
    expect(screen.queryByText("*/20")).toBeNull();
  });

  it("Test negative maxLength value (should default to 20)", () => {
    render(<TextArea maxLength={-1} variant="outlined" />);
    expect(screen.queryByText("0/20")).not.toBeNull();
  });

  it("Test max length value set to 0 (should default to 20)", () => {
    render(<TextArea maxLength={0} variant="outlined" />);
    expect(screen.queryByText("0/20")).not.toBeNull();
  });

  it("Test default character count when maxLength is invalid value (negative)", () => {
    render(<TextArea maxLength={-4} value="hello" variant="outlined" />);
    expect(screen.queryByText("5/20")).not.toBeNull();
    expect(screen.queryByText("5/-4")).toBeNull();
  });

  it("Test with preassigned valid maxLength and valid value", () => {
    render(<TextArea maxLength={20} value="hello" variant="outlined" />);
    expect(screen.queryByText("5/20")).not.toBeNull();
    expect(screen.queryByText("10/20")).toBeNull();
  });

  it("Test if character count/maximumLength is in right format", () => {
    render(<TextArea maxLength={20} value="hello" variant="outlined" />);
    //Makes sure there are no spaces before and after "/" in the format "CharacterCount/Maximum Character count"
    expect(screen.queryByText(/(?!\s)\/(?!\s)/)).not.toBeNull();
    expect(screen.queryByText(/\s+\/\s+/)).toBeNull();
  });

  it("Test to make sure characters in the text field do not exceed maxLength", async () => {
    render(<TextArea maxLength={4} variant="outlined" />);
    const textArea: HTMLTextAreaElement = screen.getByRole("textbox");
    await act(async () => {
      await userEvent.type(textArea, "Hello world");
    });
    expect(textArea.value).toBe("Hell");
    expect(textArea.value).not.toBe("Hello world");
  });

  it("Test to make sure the value is trimmed on Blur", async () => {
    render(<TextArea value="Hello " variant="outlined" />);
    const textArea: HTMLTextAreaElement = screen.getByRole("textbox");
    await act(async () => {
      await fireEvent.blur(textArea);
    });
    expect(textArea.value).toBe("Hello");
    expect(screen.queryByText("5/20")).not.toBeNull();
    expect(screen.queryByText("6/20")).toBeNull();
  });
});
