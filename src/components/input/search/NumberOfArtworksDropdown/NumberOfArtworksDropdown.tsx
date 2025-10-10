"use client";

import React from "react";

import { Col, Dropdown } from "react-bootstrap";

import { SearchFormikInstance, SearchParams } from "@/fetching/types";

import useNumberOfArtworksDropdown from "./useNumberOfArtworksDropdown";

type NumberOfArtworksDropdownProps = {
  formik: SearchFormikInstance;
  triggerSearchWithUpdatedValues: (
    updatedValues: Partial<SearchParams>
  ) => void;
};

function NumberOfArtworksDropdown({
  formik,
  triggerSearchWithUpdatedValues,
}: NumberOfArtworksDropdownProps) {
  const { handleNumberOfArtworksSelect, t } = useNumberOfArtworksDropdown({
    formik,
    triggerSearchWithUpdatedValues,
  });

  return (
    <Col className="mb-3">
      <Dropdown onSelect={handleNumberOfArtworksSelect}>
        <Dropdown.Toggle variant="outilne-dark">
          {t("common.search.number_of_artworks_shown")}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="5" href="">
            5
          </Dropdown.Item>

          <Dropdown.Item eventKey="10" href="">
            10
          </Dropdown.Item>

          <Dropdown.Item eventKey="20" href="">
            20
          </Dropdown.Item>

          <Dropdown.Item eventKey="30" href="">
            30
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
}

export default NumberOfArtworksDropdown;
