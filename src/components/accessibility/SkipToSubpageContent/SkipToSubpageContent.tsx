"use client";
import React from "react";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

const SkipToSubpageContent = () => {
  const { t } = useI18n();

  return (
    <a className="skip-to-content" href="#subpage" tabIndex={0}>
      {t("common.actions.skip_to_subpage_content")}
    </a>
  );
};

export default SkipToSubpageContent;
