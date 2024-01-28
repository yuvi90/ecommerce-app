import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slide1 from "../assets/images/slide-1.jpg";
import slide2 from "../assets/images/slide-2.jpg";
import slide3 from "../assets/images/slide-3.jpg";
import slide4 from "../assets/images/slide-4.jpg";

const images = [
  {
    id: 1,
    attributes: {
      url: slide1,
      name: "slide1",
    },
  },
  {
    id: 2,
    attributes: {
      url: slide2,
      name: "slide2",
    },
  },
  {
    id: 3,
    attributes: {
      url: slide3,
      name: "slide3",
    },
  },
  {
    id: 4,
    attributes: {
      url: slide4,
      name: "slide4",
    },
  },
];

const HeroSection = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showIndicators={true}
      showStatus={false}
      showThumbs={false}
      showArrows={false}
    >
      {images?.map((img) => (
        <img
          key={img.id}
          src={img.attributes.url}
          alt={img.attributes.name}
        />
      ))}
    </Carousel>
  );
};
export default HeroSection;
