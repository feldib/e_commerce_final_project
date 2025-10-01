import { Card, Carousel } from "react-bootstrap";

import { useI18n } from "@/components/providers/I18nProvider";

import { Review } from "@/fetching/types";

const ArtworkReviewCarouselItem = ({ review }: { review: Review }) => {
  const { t } = useI18n();
  return (
    <Carousel.Item className="mb-5 px-5">
      <Card className="mx-5 p-3" border="secondary">
        <Card.Title className="mb-2">{review.title}</Card.Title>

        <Card.Subtitle className="mb-2 custom-muted">
          {t("common.by")} {review.name}
        </Card.Subtitle>

        <Card.Text className="mb-2">{review.review_text}</Card.Text>
      </Card>
    </Carousel.Item>
  );
};

export default ArtworkReviewCarouselItem;
