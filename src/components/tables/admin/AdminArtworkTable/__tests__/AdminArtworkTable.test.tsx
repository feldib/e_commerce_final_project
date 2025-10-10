import React from "react";
import { render } from "@testing-library/react";

import AdminArtworkTable from "../AdminArtworkTable";

// Mock providers
jest.mock("../../../../providers/I18nProvider/I18nProvider", () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

describe("AdminArtworkTable", () => {
  const mockArtworks = [
    {
      id: 1,
      title: "Test Artwork 1",
      artist_name: "Test Artist 1",
      price: 100,
      quantity: 5,
      category_id: 1,
      date_added: "2023-01-01",
      description: "Test description",
      stored_amount: 5,
    },
    {
      id: 2,
      title: "Test Artwork 2",
      artist_name: "Test Artist 2",
      price: 200,
      quantity: 3,
      category_id: 2,
      date_added: "2023-01-02",
      description: "Test description 2",
      stored_amount: 3,
    },
  ];

  const mockProps = {
    dataLines: mockArtworks,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<AdminArtworkTable {...mockProps} />);

    expect(document.body).toBeTruthy();
  });

  it("should handle empty artwork list", () => {
    const emptyProps = { dataLines: [] };
    render(<AdminArtworkTable {...emptyProps} />);

    expect(document.body).toBeTruthy();
  });

  it("should handle multiple artworks", () => {
    const multipleArtworks = [
      ...mockArtworks,
      {
        id: 3,
        title: "Test Artwork 3",
        artist_name: "Test Artist 3",
        price: 300,
        quantity: 2,
        category_id: 3,
        date_added: "2023-01-03",
        description: "Test description 3",
        stored_amount: 2,
      },
    ];

    const multipleProps = { dataLines: multipleArtworks };
    render(<AdminArtworkTable {...multipleProps} />);

    expect(document.body).toBeTruthy();
  });
});
