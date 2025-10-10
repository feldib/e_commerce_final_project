import React from "react";
import { render, screen } from "@testing-library/react";

import ArtworkReview from "../ArtworkReview";

// Mock I18n provider
jest.mock("@/components/providers/I18nProvider/I18nProvider", () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

const mockReview = {
  id: 1,
  user_id: 1,
  time_review_posted: "2023-01-01",
  title: "Great artwork!",
  review_text: "This is an excellent piece of art. Highly recommended!",
  name: "John Doe",
};

describe("ArtworkReview", () => {
  const defaultProps = {
    review: mockReview,
    index: 0,
  };

  it("should render without crashing", () => {
    render(<ArtworkReview {...defaultProps} />);
    expect(document.body).toBeTruthy();
  });

  it("should render review title", () => {
    render(<ArtworkReview {...defaultProps} />);
    expect(screen.getByText(/Great artwork!/)).toBeTruthy();
    expect(screen.getByText(/components.review.title_label/)).toBeTruthy();
  });

  it("should render reviewer name", () => {
    render(<ArtworkReview {...defaultProps} />);
    expect(screen.getByText(/John Doe/)).toBeTruthy();
    expect(screen.getByText(/common.fields.by/)).toBeTruthy();
  });

  it("should render review text", () => {
    render(<ArtworkReview {...defaultProps} />);
    expect(
      screen.getByText("This is an excellent piece of art. Highly recommended!")
    ).toBeTruthy();
  });

  it("should render card structure", () => {
    const { container } = render(<ArtworkReview {...defaultProps} />);

    const card = container.querySelector(".card");
    const cardTitle = container.querySelector(".card-title");
    const cardSubtitle = container.querySelector(".card-subtitle");
    const cardText = container.querySelector(".card-text");

    expect(card).toBeTruthy();
    expect(cardTitle).toBeTruthy();
    expect(cardSubtitle).toBeTruthy();
    expect(cardText).toBeTruthy();
  });

  it("should handle different review props", () => {
    const differentReview = {
      ...mockReview,
      id: 2,
      title: "Different Review",
      review_text: "Different content",
      name: "Jane Smith",
    };

    render(<ArtworkReview index={1} review={differentReview} />);

    expect(screen.getByText(/Different Review/)).toBeTruthy();
    expect(screen.getByText("Different content")).toBeTruthy();
    expect(screen.getByText(/Jane Smith/)).toBeTruthy();
  });

  it("should apply floating element class", () => {
    const { container } = render(<ArtworkReview {...defaultProps} />);

    const floatingElement = container.querySelector(".floating-element");
    expect(floatingElement).toBeTruthy();
  });
});
