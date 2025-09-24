// Image upload constraints
export const MAX_IMAGE_SIZE = 102400; //100KB

export const VALID_IMAGE_EXTENSIONS = [
  "jpg",
  "gif",
  "png",
  "jpeg",
  "svg",
  "webp",
] as const;

// UI Dimensions
export const UI_DIMENSIONS = {
  THUMBNAIL_SIZE: 100,
  CARD_IMAGE_WIDTH: 500,
  CAROUSEL_INTERVAL: 3000,
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Tag related constants
const KEY_CODES = {
  comma: 188,
  enter: 13,
  space: 32,
} as const;

export const TAG_DELIMITERS = [
  KEY_CODES.comma,
  KEY_CODES.enter,
  KEY_CODES.space,
] as const;
