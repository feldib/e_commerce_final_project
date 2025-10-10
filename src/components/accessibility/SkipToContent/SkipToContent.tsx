"use client";
import React from "react";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

const SkipToContent = () => {
  const { t } = useI18n();

  return (
    <a className="skip-to-content" href="#main" tabIndex={0}>
      {t("common.actions.skip_to_content")}
    </a>
  );
};

export default SkipToContent;
