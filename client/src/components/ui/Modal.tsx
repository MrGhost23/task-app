import useScrollBlock from "@/hooks/useScreollBlock";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ isModalOpen, setIsModalOpen, children }) => {
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    if (isModalOpen) {
      blockScroll();
    } else {
      allowScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  if (!isModalOpen) return;

  const closeModal = () => {
    allowScroll();
    setIsModalOpen(false);
  };

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed inset-0 h-screen bg-black bg-opacity-35 cursor-pointer"
        onClick={closeModal}
      ></div>
      <div className="fixed top-1/2 left-1/2 w-[80vw] lg:w-[60vw] xl:w-[40vw] h-fit p-10 -translate-y-1/2 -translate-x-1/2 bg-white shadow-md">
        <IoMdClose
          className="absolute top-11 right-10 text-2xl cursor-pointer"
          onClick={closeModal}
        />
        {children}
      </div>
    </>,
    document.getElementById("portal")!
  );
};

export default Modal;
