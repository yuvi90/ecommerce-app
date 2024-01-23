import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slide1 from "../../assets/images/slide-1.png";
import slide2 from "../../assets/images/slide-2.png";
import slide3 from "../../assets/images/slide-3.png";

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
];

const Slides = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showIndicators={false}
      showStatus={false}
      thumbWidth={60}
      className="productCarousel"
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
export default Slides;
