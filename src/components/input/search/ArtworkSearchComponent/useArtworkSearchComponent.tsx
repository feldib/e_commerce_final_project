"use client";

import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { getArtworkSearchResults } from "@/fetching/fetching";
import { Artwork, Category, SearchParams } from "@/fetching/types";

import useAxios from "@/hooks/useAxios";

type UseArtworkSearchComponentProps = {
  admin?: boolean;
};

type UseArtworkSearchComponentReturn = {
  searchResults: Artwork[] | undefined;
  searchedValues: SearchParams | undefined;
  hasMoreResults: boolean;
  pageNumber: number;
  formik: ReturnType<typeof useFormik<SearchParams>>;
  categories: Category[];
  handleBackClick: () => void;
  handleNextClick: () => void;
  triggerSearchWithUpdatedValues: (
    updatedValues: Partial<SearchParams>
  ) => void;
  results: React.RefObject<HTMLDivElement | null>;
  t: (key: string) => string;
};

function useArtworkSearchComponent({
  admin,
}: UseArtworkSearchComponentProps): UseArtworkSearchComponentReturn {
  const [searchResults, setSearchResults] = React.useState<Artwork[]>();
  const [searchedValues, setSearchedValues] = React.useState<SearchParams>();
  const [hasMoreResults, setHasMoreResults] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(0);

  const { t } = useI18n();

  const handleBackClick = () => {
    const newPageNumber = pageNumber - 1;
    setPageNumber(newPageNumber);
    search(formik.values, newPageNumber);
  };

  const handleNextClick = () => {
    const newPageNumber = pageNumber + 1;
    setPageNumber(newPageNumber);
    search(formik.values, newPageNumber);
  };

  const search = React.useCallback(
    async (values: SearchParams, page: number) => {
      const results = await getArtworkSearchResults(
        values,
        page,
        admin || false
      );
      setSearchResults(results);
      setSearchedValues(values);
      // If we got exactly the requested number of results, there might be more
      setHasMoreResults(results.length === values.n);
    },
    [admin]
  );

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: "",
      artist_name: "",
      category_id: "",
      order: "asc",
      n: 5,
      min: 0,
      max: 0,
      only_featured: false,
    },

    onSubmit: (values) => {
      setPageNumber(1);
      search(values, 1);
    },

    validationSchema: Yup.object().shape({
      min: Yup.number().min(0),
      max: Yup.number().min(1),
    }),
  });

  const categories = useAxios("/categories") as Category[];

  const triggerSearchWithUpdatedValues = React.useCallback(
    (updatedValues: Partial<SearchParams>) => {
      const newValues = { ...formik.values, ...updatedValues };
      setPageNumber(1);
      search(newValues, 1);
    },
    [search, formik.values]
  );

  const results = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    results.current?.scrollIntoView({ behavior: "instant" });
  }, [searchResults]);

  return {
    searchResults,
    searchedValues,
    hasMoreResults,
    pageNumber,
    formik,
    categories,
    handleBackClick,
    handleNextClick,
    triggerSearchWithUpdatedValues,
    results,
    t,
  };
}

export default useArtworkSearchComponent;
