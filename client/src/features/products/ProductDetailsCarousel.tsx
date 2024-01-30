import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { server } from "../../redux/store";

const ProductDetailsCarousel = ({ photos }: { photos: string[] }) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {photos?.map((img) => (
          <img
            key={img}
            src={`${server}/uploads/${img}`}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
