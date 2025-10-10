import { Tag } from "react-tag-input";

import { createHandleAddition, createHandleDelete } from "../tagHelpers";

// Mock Tag interface
interface MockTag extends Tag {
  id: string;
  text: string;
  className: string;
}

describe("tagHelpers", () => {
  describe("createHandleDelete", () => {
    it("should create a function that removes tag at specified index", () => {
      const mockTags: MockTag[] = [
        { id: "1", text: "tag1", className: "" },
        { id: "2", text: "tag2", className: "" },
        { id: "3", text: "tag3", className: "" },
      ];
      const mockSetTags = jest.fn();

      const handleDelete = createHandleDelete(mockTags, mockSetTags);
      handleDelete(1); // Remove second tag

      expect(mockSetTags).toHaveBeenCalledWith([
        { id: "1", text: "tag1", className: "" },
        { id: "3", text: "tag3", className: "" },
      ]);
    });

    it("should remove the first tag", () => {
      const mockTags: MockTag[] = [
        { id: "1", text: "tag1", className: "" },
        { id: "2", text: "tag2", className: "" },
      ];
      const mockSetTags = jest.fn();

      const handleDelete = createHandleDelete(mockTags, mockSetTags);
      handleDelete(0);

      expect(mockSetTags).toHaveBeenCalledWith([
        { id: "2", text: "tag2", className: "" },
      ]);
    });

    it("should remove the last tag", () => {
      const mockTags: MockTag[] = [
        { id: "1", text: "tag1", className: "" },
        { id: "2", text: "tag2", className: "" },
      ];
      const mockSetTags = jest.fn();

      const handleDelete = createHandleDelete(mockTags, mockSetTags);
      handleDelete(1);

      expect(mockSetTags).toHaveBeenCalledWith([
        { id: "1", text: "tag1", className: "" },
      ]);
    });

    it("should handle empty array", () => {
      const mockTags: MockTag[] = [];
      const mockSetTags = jest.fn();

      const handleDelete = createHandleDelete(mockTags, mockSetTags);
      handleDelete(0);

      expect(mockSetTags).toHaveBeenCalledWith([]);
    });

    it("should handle out of bounds index", () => {
      const mockTags: MockTag[] = [{ id: "1", text: "tag1", className: "" }];
      const mockSetTags = jest.fn();

      const handleDelete = createHandleDelete(mockTags, mockSetTags);
      handleDelete(5); // Out of bounds

      expect(mockSetTags).toHaveBeenCalledWith([
        { id: "1", text: "tag1", className: "" },
      ]);
    });
  });

  describe("createHandleAddition", () => {
    it("should create a function that adds a new tag", () => {
      const mockTags: MockTag[] = [{ id: "1", text: "tag1", className: "" }];
      const mockSetTags = jest.fn();
      const newTag: MockTag = { id: "2", text: "tag2", className: "" };

      const handleAddition = createHandleAddition(mockTags, mockSetTags);
      handleAddition(newTag);

      expect(mockSetTags).toHaveBeenCalledWith([
        { id: "1", text: "tag1", className: "" },
        { id: "2", text: "tag2", className: "" },
      ]);
    });

    it("should add tag to empty array", () => {
      const mockTags: MockTag[] = [];
      const mockSetTags = jest.fn();
      const newTag: MockTag = { id: "1", text: "tag1", className: "" };

      const handleAddition = createHandleAddition(mockTags, mockSetTags);
      handleAddition(newTag);

      expect(mockSetTags).toHaveBeenCalledWith([
        { id: "1", text: "tag1", className: "" },
      ]);
    });

    it("should add multiple tags sequentially", () => {
      const mockTags: MockTag[] = [{ id: "1", text: "tag1", className: "" }];
      const mockSetTags = jest.fn();

      const handleAddition = createHandleAddition(mockTags, mockSetTags);

      const newTag1: MockTag = { id: "2", text: "tag2", className: "" };
      handleAddition(newTag1);

      expect(mockSetTags).toHaveBeenCalledWith([
        { id: "1", text: "tag1", className: "" },
        { id: "2", text: "tag2", className: "" },
      ]);
    });

    it("should preserve existing tags when adding new one", () => {
      const mockTags: MockTag[] = [
        { id: "1", text: "existing1", className: "" },
        { id: "2", text: "existing2", className: "" },
      ];
      const mockSetTags = jest.fn();
      const newTag: MockTag = { id: "3", text: "new tag", className: "" };

      const handleAddition = createHandleAddition(mockTags, mockSetTags);
      handleAddition(newTag);

      expect(mockSetTags).toHaveBeenCalledWith([
        { id: "1", text: "existing1", className: "" },
        { id: "2", text: "existing2", className: "" },
        { id: "3", text: "new tag", className: "" },
      ]);
    });
  });
});
