"use client";

import React from "react";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { approveReview, disapproveReview } from "@/fetching/fetching";
import { Review } from "@/fetching/types";

type UseUserReviewProps = {
  review: Review;
};

type UseUserReviewReturn = {
  handleApproveClick: () => void;
  handleDisapproveClick: () => void;
  showReview: boolean;
  t: (key: string) => string;
};

function useUserReview({ review }: UseUserReviewProps): UseUserReviewReturn {
  const { t } = useI18n();
  const [showReview, setShowReview] = React.useState(true);

  const handleApproveClick = () => {
    approveReview(review.id);
    setShowReview(false);
  };

  const handleDisapproveClick = () => {
    disapproveReview(review.id);
    setShowReview(false);
  };

  return {
    handleApproveClick,
    handleDisapproveClick,
    showReview,
    t,
  };
}

export default useUserReview;
