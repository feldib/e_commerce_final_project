import React from "react";
import { Tag } from "react-tag-input";

export const createHandleDelete = <T extends Tag>(
  tags: T[],
  setTags: React.Dispatch<React.SetStateAction<T[]>>,
) => {
  return (i: number) => {
    setTags(tags.filter((_, index) => index !== i));
  };
};

export const createHandleAddition = <T extends Tag>(
  tags: T[],
  setTags: React.Dispatch<React.SetStateAction<T[]>>,
) => {
  return (tag: T) => {
    setTags([...tags, tag]);
  };
};
