import { MdError } from "react-icons/md";

const NotFound = () => {
  return (
    <div className="w-full max-w-[1280px] mx-auto flex flex-col justify-center items-center gap-5 h-[70vh]">
      <MdError size={40} />
      <h1 className="text-3xl">Page Not Found</h1>
    </div>
  );
};

export default NotFound;
