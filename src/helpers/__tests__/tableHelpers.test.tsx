import React from "react";

import { renderData } from "../tableHelpers";

describe("tableHelpers", () => {
  describe("renderData", () => {
    const mockMakeRows = jest.fn((dataLines: string[]) => (
      <>
        {dataLines.map((line, index) => (
          <tr key={index}>
            <td>{line}</td>
          </tr>
        ))}
      </>
    ));

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should render data rows when dataLines has content", () => {
      const dataLines = ["Item 1", "Item 2", "Item 3"];
      const noResultsText = "No results found";

      const result = renderData(dataLines, mockMakeRows, noResultsText);

      expect(mockMakeRows).toHaveBeenCalledWith(dataLines);
      expect(result.type).toBe(React.Fragment);
    });

    it("should render no results message when dataLines is empty", () => {
      const dataLines: string[] = [];
      const noResultsText = "No items found";

      const result = renderData(dataLines, mockMakeRows, noResultsText);

      expect(mockMakeRows).not.toHaveBeenCalled();
      expect(result.type).toBe("tr");
      expect(result.props.children.type).toBe("td");
      expect(result.props.children.props.colSpan).toBe(8);
      expect(result.props.children.props.children.type).toBe("h6");
      expect(result.props.children.props.children.props.children).toBe(
        "No items found"
      );
      expect(result.props.children.props.children.props.className).toBe(
        "text-center"
      );
    });

    it("should work with different data types", () => {
      const dataLines = [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ];
      const mockObjectMakeRows = jest.fn(
        (dataLines: { id: number; name: string }[]) => (
          <>
            {dataLines.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
              </tr>
            ))}
          </>
        )
      );
      const noResultsText = "No products found";

      const result = renderData(dataLines, mockObjectMakeRows, noResultsText);

      expect(mockObjectMakeRows).toHaveBeenCalledWith(dataLines);
      expect(result.type).toBe(React.Fragment);
    });

    it("should work with different noResultsText", () => {
      const dataLines: number[] = [];
      const mockNumberMakeRows = jest.fn();
      const noResultsText = "Custom empty message";

      const result = renderData(dataLines, mockNumberMakeRows, noResultsText);

      expect(mockNumberMakeRows).not.toHaveBeenCalled();
      expect(result.props.children.props.children.props.children).toBe(
        "Custom empty message"
      );
    });

    it("should handle single item array", () => {
      const dataLines = ["Single item"];
      const noResultsText = "No results";

      const result = renderData(dataLines, mockMakeRows, noResultsText);

      expect(mockMakeRows).toHaveBeenCalledWith(dataLines);
      expect(result.type).toBe(React.Fragment);
    });

    it("should preserve colspan value of 8", () => {
      const dataLines: string[] = [];
      const noResultsText = "Empty state";

      const result = renderData(dataLines, mockMakeRows, noResultsText);

      expect(result.props.children.props.colSpan).toBe(8);
    });
  });
});
