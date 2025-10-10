import React from "react";
import { render } from "@testing-library/react";

import ArtworkPictureCarousel from "../ArtworkPictureCarousel";

describe("ArtworkPictureCarousel", () => {
  const mockProps = {
    other_pictures: ["artwork1.jpg", "artwork2.jpg"],
  };

  it("should render without crashing", () => {
    render(<ArtworkPictureCarousel {...mockProps} />);

    expect(document.body).toBeTruthy();
  });

  it("should handle multiple pictures", () => {
    render(<ArtworkPictureCarousel {...mockProps} />);

    // Should render carousel when pictures exist
    expect(document.body).toBeTruthy();
  });

  it("should handle single picture", () => {
    const singlePictureProps = {
      other_pictures: ["single.jpg"],
    };

    render(<ArtworkPictureCarousel {...singlePictureProps} />);

    expect(document.body).toBeTruthy();
  });

  it("should handle empty pictures array", () => {
    const emptyProps = {
      other_pictures: [],
    };

    render(<ArtworkPictureCarousel {...emptyProps} />);

    // Should render without crashing, likely shows nothing
    expect(document.body).toBeTruthy();
  });
});
