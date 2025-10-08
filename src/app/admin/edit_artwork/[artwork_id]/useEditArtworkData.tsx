"use client";
import React from "react";
import { Tag as ReactTag } from "react-tag-input";

import { useParams, useRouter } from "next/navigation";

import { useFormik } from "formik";

import { SERVER_URL } from "@/utils/constants";

import { useI18n } from "@/components/providers/I18nProvider";

import { updateArtworkData } from "@/fetching/fetching";
import { Artwork, Category } from "@/fetching/types";

import { createHandleAddition, createHandleDelete } from "@/helpers/tagHelpers";
import useAxios from "@/hooks/useAxios";
import { useCategories } from "@/hooks/useCategories";
import { useEditArtworkSchema } from "@/hooks/useValidationSchemas";

const useEditArtworkData = () => {
  interface EditArtworkFormValues extends Record<string, unknown> {
    title: string;
    artist_name: string;
    price: string;
    tags: ReactTag[];
    quantity: string;
    category_id: string;
    thumbnail: string;
    other_pictures: string[];
    description: string;
  }

  const { t, locale } = useI18n();
  const { artwork_id: artworkIdString } = useParams();
  const artworkId = Number(artworkIdString);
  const artworkData = useAxios(`/artwork?id=${artworkId}`) as Artwork;

  const categories = useAxios("/categories") as Category[];
  const { getCategoryNameById } = useCategories(locale);

  const router = useRouter();

  const formik = useFormik<EditArtworkFormValues>({
    initialValues: {
      title: "",
      artist_name: "",
      price: "",
      tags: [] as ReactTag[],
      quantity: "",
      category_id: "",
      thumbnail: "",
      other_pictures: [] as string[],
      description: "",
    },

    validationSchema: useEditArtworkSchema(),
    onSubmit: () => {
      // there is no single submission
      return;
    },
  });

  const [tags, setTags] = React.useState<ReactTag[]>([]);

  React.useEffect(() => {
    if (artworkData) {
      const transformedTags =
        artworkData.tags?.map((obj: { tname: string }) => ({
          id: obj.tname,
          text: obj.tname,
          className: "",
        })) || [];

      formik.setValues({
        title: artworkData.title,
        artist_name: artworkData.artist_name,
        price: artworkData.price.toString(),
        tags: transformedTags,
        quantity: artworkData.quantity.toString(),
        category_id: artworkData.category_id.toString(),
        thumbnail: `${SERVER_URL}/${artworkData.thumbnail}`,
        other_pictures:
          artworkData.other_pictures?.map((pic: string) => {
            return `${SERVER_URL}/${pic}`;
          }) || [],
        description: artworkData.description || "",
      });
      setTags(transformedTags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artworkData, categories]);

  const [initialTagsLoaded, setInitialTagsLoaded] = React.useState(false);

  React.useEffect(() => {
    formik.setFieldValue("tags", tags);
    // Only update server if this is not the initial load and tags have actually changed
    if (initialTagsLoaded && tags.length >= 3) {
      updateArtworkData(
        artworkId,
        "tags",
        tags.map((tag: ReactTag) => {
          return { tname: tag.text };
        })
      );
    }
    // Mark that initial tags have been loaded after first render
    if (!initialTagsLoaded && tags.length > 0) {
      setInitialTagsLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags, artworkId]);

  return {
    formik,
    tags,
    setTags,
    createHandleDelete,
    createHandleAddition,
    categories,
    artworkId,
    t,
    router,
    getCategoryNameById,
  };
};

export default useEditArtworkData;
