import { CSSProperties, useEffect } from "react";
import { returnScreenSize } from "../funciones/helpers";
import { TrashIcon, UserCircleIcon, UserIcon, UserPlusIcon } from "@heroicons/react/24/outline";

interface IModal {
  size?: "xs" | "md" | "lg" | "xl" | "custom" | "sizeDelete";
  title?: string;
  width?: string;
  height?: string;
  closeModal: () => void;
  activeModal?: boolean;
  children?: React.ReactNode;
  onSave?: () => void;
  backgroundAll?: boolean;
  buttonSaveName?: string;
  buttonCerrarName?: string;
  type?:"delete" | "create" | "edit"
}

let modalUID = 1;

const Modal = (props: IModal) => {
  const { type, size, title, activeModal, height, width, backgroundAll } = props;
  const { buttonSaveName, buttonCerrarName } = props;
  const { closeModal, onSave } = props;
  const modalOverlayId = `modal_overlay${modalUID}`;
  const modalId = `modal${modalUID}`;
  modalUID = modalUID + 1;

  const sizes = {
    // xs: { width: "84%", height: "93%" },
    xs: { width: "400px", height: "350px" },
    md: { width: "550px", height: "450px" },
    lg: { width: "690px", height: "80vh" },
    xl: { width: "950px", height: "84vh" },
    custom: { width: width || "550px", height: height || "450px" },
    sizeDelete: {width: "500px", height: "121px"}
  };

  let newSize = size;
  if (!size) {
    const sizeScreen = returnScreenSize()!;
    const sizesModal = {
      phone: "xs",
      tablet: "lg",
      laptop: "lg",
      desktop: "xl",
    };
    newSize = sizesModal[sizeScreen] as "xs" | "md" | "lg" | "xl" | "custom" | "sizeDelete";
  }
  const new_size: CSSProperties = sizes[newSize || "md"];

  const handleChangeActiveModal = () => {
    const modal = document.getElementById(modalId);
    const modal_overlay = document.getElementById(modalOverlayId);

    const modalCl = modal?.classList;
    const overlayCl = modal_overlay;

    if (activeModal && overlayCl && modalCl) {
      overlayCl.classList.remove("hidden");
      setTimeout(() => {
        modalCl.remove("opacity-0");
        modalCl.remove("-translate-y-full");
        modalCl.remove("scale-150");
      }, 100);
    } else {
      if (overlayCl && modalCl) {
        modalCl.add("-translate-y-full");
        setTimeout(() => {
          modalCl.add("opacity-0");
          modalCl.add("scale-150");
        }, 100);
        setTimeout(() => overlayCl.classList.add("hidden"), 300);
      }
    }
  };

  useEffect(() => {
    handleChangeActiveModal();
  }, [activeModal]);

  return (
    
    <div
      id={modalOverlayId}
      className={`${
        backgroundAll == false ? " pl-52 " : ""
      } absolute inset-0 h-full w-full justify-center flex items-start md:items-center pt-20 md:pt-0 z-20 backdrop-blur-sm ${"hidden"}`}
      style={{ backgroundColor: "rgba(24, 24, 24, 0.6)" }}
    >
      
      <div
        id={modalId}
        className=" opacity-0 transform -translate-y-full scale-150 relative  bg-white rounded-xl shadow-lg  transition-transform duration-300  "
        style={new_size}
      >
        <div className=" relative w-full rounded-lg shadow h-full">
            <div className="flex p-4 justify-between border-b rounded-t border-gray-300 items-center gap-2">
              <div className="flex items-center gap-2">
                {size !== "sizeDelete" ? (
                  <UserPlusIcon className="h-5 w-6 text-gray-900 font-bold" />
                ) : (
                  <TrashIcon className="h-5 w-6 text-gray-900" />
                )}
                <span className="text-lg font-semibold text-gray-900 ">
                  {title}
                </span>
              </div>
              
              <button
                className="flex border border-gray-200 rounded-full w-8 h-8 justify-center items-center shadow-xs text-gray-600 font-semibold  hover:bg-gray-200 cursor-pointer"
                onClick={closeModal}
              >
              {buttonCerrarName || "X"}
          </button>
            
          </div>
          


          <div
            className={`${
              newSize === "xs" ? "px-3" : "px-6"
            } py-3 h-full relative`}
          >
            {props.children}
          </div>

          <div className="flex absolute bottom-0 w-full justify-center items-center px-6 py-3 space-x-2 border-t border-gray-300 rounded-b text-xs">
            
            {onSave && (
              <button
                className="flex bg-blue-700 rounded-lg px-4 py-2 shadow-md text-white font-semibold hover:bg-btn-primary-color cursor-pointer"
                onClick={onSave}
              >
                {buttonSaveName || "Guardar"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
