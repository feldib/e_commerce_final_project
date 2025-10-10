"use client";
import { useEffect, useState } from "react";

import { useI18n } from "@/components/providers/I18nProvider/I18nProvider";

import { Artwork } from "@/fetching/types";

interface UseReceiptReturn {
  t: (key: string) => string;
  currentOrderData: {
    items: Artwork[];
    totalCost: number;
  };
  handleBackToShopClick: () => void;
}

function useReceipt(): UseReceiptReturn {
  const { t } = useI18n();
  const [currentOrderData, setCurrentOrderData] = useState<{
    items: Artwork[];
    totalCost: number;
  }>({ items: [], totalCost: 0 });

  const handleBackToShopClick = () => {
    localStorage.removeItem("currentOrder");
  };

  useEffect(() => {
    const currentOrderString = localStorage.getItem("currentOrder");
    setCurrentOrderData(
      currentOrderString
        ? JSON.parse(currentOrderString)
        : { items: [], totalCost: 0 }
    );
  }, []);

  return {
    t,
    currentOrderData,
    handleBackToShopClick,
  };
}

export default useReceipt;
