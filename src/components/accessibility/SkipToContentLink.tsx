"use client";
import { useI18n } from "../providers/I18nProvider";

const SkipToContentLink = () => {
  const { t } = useI18n();
  return (
    <a href="#main" className="skip-to-content">
      {t("common.skip_to_content")}
    </a>
  );
};

export default SkipToContentLink;
