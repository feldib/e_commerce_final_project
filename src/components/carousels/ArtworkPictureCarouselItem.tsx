import { Card, Carousel } from "react-bootstrap";

import { SERVER_URL } from "@/utils/constants";

const ArtworkPictureCarouselItem = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <Carousel.Item className="mb-5 px-3">
      <Card className="mx-5 p-2" border="secondary">
        <Card.Img
          src={`${SERVER_URL}/${imageUrl}`}
          width="500px"
          height="300px"
          style={{ objectFit: "contain" }}
        />
      </Card>
    </Carousel.Item>
  );
};

export default ArtworkPictureCarouselItem;
