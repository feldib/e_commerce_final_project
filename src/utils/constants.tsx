// Image upload constraints
export const MAX_IMAGE_SIZE = 102400; //100KB

export const VALID_IMAGE_EXTENSIONS = [
  "jpg",
  "gif",
  "png",
  "jpeg",
  "svg",
  "webp",
];

// Tag related constants
const KeyCodes = {
  comma: 188,
  enter: 13,
  space: 32,
};

export const TAG_DELIMITERS = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space];
