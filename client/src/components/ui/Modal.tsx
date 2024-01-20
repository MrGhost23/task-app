import ReactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ isModalOpen, setIsModalOpen, children }) => {
  if (!isModalOpen) return;

  return ReactDOM.createPortal(
    <>
      <div className="absolute inset-0 bg-black bg-opacity-35"></div>
      <div className="absolute top-1/2 left-1/2 w-[80vw] lg:w-[60vw] xl:w-[40vw] h-fit p-10 -translate-y-1/2 -translate-x-1/2 bg-white shadow-md">
        <IoMdClose
          className="absolute top-11 right-10 text-2xl cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        />
        {children}
      </div>
    </>,
    document.getElementById("portal")!
  );
};

export default Modal;
