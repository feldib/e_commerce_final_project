import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import UnansweredMessage from "../UnansweredMessage";

// Use reusable mocks
jest.mock("@/components/providers/I18nProvider/I18nProvider");
jest.mock("@/components/input/ErrorAsterisk/ErrorAsterisk");
jest.mock("@/components/input/InputComponent/InputComponent");
jest.mock("@/fetching/messages");
jest.mock("@/utils/toastUtils");

jest.mock("@/helpers/formValidationHelpers", () => ({
  createHandleSubmitClick: () => jest.fn(),
}));

jest.mock("@/hooks/useValidationSchemas", () => ({
  useMessageReplySchema: () => ({}),
}));

const mockMessage = {
  id: 1,
  email: "test@example.com",
  message_title: "Test Message Title",
  message_txt: "This is a test message content.",
};

describe("UnansweredMessage", () => {
  it("should render without crashing", () => {
    render(<UnansweredMessage message={mockMessage} />);
    expect(document.body).toBeTruthy();
  });

  it("should render message details", () => {
    render(<UnansweredMessage message={mockMessage} />);

    expect(screen.getByText("Test Message Title")).toBeTruthy();
    expect(screen.getByText("test@example.com")).toBeTruthy();
    expect(screen.getByText("This is a test message content.")).toBeTruthy();
  });

  it("should render reply button initially", () => {
    render(<UnansweredMessage message={mockMessage} />);

    const replyButton = screen.getByRole("button", {
      name: /components.unanswered_message.reply/i,
    });
    expect(replyButton).toBeTruthy();
  });

  it("should show reply form when reply button is clicked", async () => {
    render(<UnansweredMessage message={mockMessage} />);

    const replyButton = screen.getByRole("button", {
      name: /components.unanswered_message.reply/i,
    });
    fireEvent.click(replyButton);

    await waitFor(() => {
      expect(screen.getByTestId("input-component-reply_title")).toBeTruthy();
    });
  });

  it("should render form elements in reply mode", async () => {
    render(<UnansweredMessage message={mockMessage} />);

    const replyButton = screen.getByRole("button", {
      name: /components.unanswered_message.reply/i,
    });
    fireEvent.click(replyButton);

    await waitFor(() => {
      expect(screen.getByText("common.fields.message")).toBeTruthy();
      expect(
        screen.getByRole("button", {
          name: /components.unanswered_message.send_reply/i,
        })
      ).toBeTruthy();
    });
  });

  it("should handle different message props", () => {
    const differentMessage = {
      id: 2,
      email: "different@example.com",
      message_title: "Different Title",
      message_txt: "Different content",
    };

    render(<UnansweredMessage message={differentMessage} />);

    expect(screen.getByText("Different Title")).toBeTruthy();
    expect(screen.getByText("different@example.com")).toBeTruthy();
    expect(screen.getByText("Different content")).toBeTruthy();
  });

  it("should render floating element container", () => {
    const { container } = render(<UnansweredMessage message={mockMessage} />);

    const floatingElement = container.querySelector(".floating-element");
    expect(floatingElement).toBeTruthy();
  });
});
