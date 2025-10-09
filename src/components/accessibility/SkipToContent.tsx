"use client";
import React from "react";

import { useI18n } from "../providers/I18nProvider";

const SkipToContent = () => {
  const { t } = useI18n();

  return (
    <a className="skip-to-content" href="#main" tabIndex={0}>
      {t("common.skip_to_content")}
    </a>
  );
};

export default SkipToContent;
