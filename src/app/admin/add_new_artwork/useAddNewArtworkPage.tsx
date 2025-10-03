"use client";
import React from "react";
import { Tag as ReactTag } from "react-tag-input";

import { useRouter } from "next/navigation";

import { useFormik } from "formik";

import {
  showArtworkAddErrorToast,
  showArtworkAddSuccessToast,
  showArtworkThumbnailRequiredToast,
} from "@/utils/toastUtils";

import { useI18n } from "@/components/providers/I18nProvider";

import { addNewArtwork } from "@/fetching/fetching";
import { Category } from "@/fetching/types";

import { createHandleAddition, createHandleDelete } from "@/helpers/tagHelpers";
import useAxios from "@/hooks/useAxios";
import { useCategories } from "@/hooks/useCategories";
import { useNewArtworkSchema } from "@/hooks/useValidationSchemas";

const useAddNewArtworkPage = () => {
  interface AddNewArtworkFormValues extends Record<string, unknown> {
    title: string;
    artist_name: string;
    price: number;
    tags: ReactTag[];
    quantity: number;
    category_id: number;
    thumbnail: Blob | undefined;
    other_pictures: Blob[];
    description: string;
  }
  const { t, locale } = useI18n();
  const categories = useAxios("/categories") as Category[];
  const { getCategoryNameById } = useCategories(locale);

  const router = useRouter();

  const formik = useFormik<AddNewArtworkFormValues>({
    initialValues: {
      title: "",
      artist_name: "",
      price: 0,
      tags: [],
      quantity: 0,
      category_id: 0,
      thumbnail: undefined,
      other_pictures: [],
      description: "",
    },

    onSubmit: async (values, actions) => {
      const tags = values.tags.map((obj) => obj.text);

      try {
        // TypeScript check - thumbnail is required by validation but type allows undefined
        if (!values.thumbnail) {
          showArtworkThumbnailRequiredToast(t);
          return;
        }

        const response = await addNewArtwork({
          ...values,
          tags,
          thumbnail: values.thumbnail,
        });
        showArtworkAddSuccessToast(t);

        const artwork_id = response.data;

        router.push(`/artwork_page/${artwork_id}`);

        actions.resetForm();
      } catch {
        showArtworkAddErrorToast(t);
      }
    },

    validationSchema: useNewArtworkSchema(),
  });

  const [tags, setTags] = React.useState<ReactTag[]>([]);

  React.useEffect(() => {
    formik.setFieldValue("tags", tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return {
    t,
    formik,
    tags,
    setTags,
    categories,
    router,
    createHandleDelete,
    createHandleAddition,
    getCategoryNameById,
  };
};

export default useAddNewArtworkPage;
