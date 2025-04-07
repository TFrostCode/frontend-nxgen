import { useEffect, useState } from "react";

export interface IDataForDropdown {
  name: string;
  icon?: string;
  className?: string;
  disabled?: boolean;
  onClick: (e: any, item: IDataForDropdown) => void;
}

interface IDropdown {
  label: string;
  icon?: string;
  classNameIcon?: string;
  classNameButton?: string;
  classNameContainerOptions?: string;
  classNameContainerOptionsLi?: string;

  positionList?: "left" | "right";
  data: IDataForDropdown[];
  iconList?: boolean;
}

let instantDropDown = 1;

export const Dropdown = (props: IDropdown) => {
  const { label, icon, classNameIcon, data, classNameButton } = props;
  const { classNameContainerOptions = "", positionList = "left" } = props;
  const { classNameContainerOptionsLi = "", iconList = true } = props;

  const getTime = new Date().getTime();
  const [classItemOption] = useState(
    `custom-select-option-${getTime}-${instantDropDown}`
  );
  const [buttonId] = useState(`button-id-${getTime}-${instantDropDown}`);
  const [classUl] = useState(`custom-ul-${getTime}-${instantDropDown}`);
  const [classText] = useState(`selected-text-${getTime}-${instantDropDown}`);
  const [activeSelect, setActiveSelect] = useState("hidden");

  instantDropDown = instantDropDown + 1;

  const handleChangeClickButton = (event: any) => {
    // if (ulNodo) ulNodo.classList.toggle("hidden");
    event;
    activeSelect == "hidden" ? setActiveSelect("") : setActiveSelect("hidden");
  };

  const handleClickOutside = (e: any) => {
    if (
      !e.target.classList.contains(classItemOption) &&
      !e.target.classList.contains(classText)
    ) {
      setActiveSelect("hidden");
    }
  };

  useEffect(() => {
    if (activeSelect == "hidden")
      document.removeEventListener("mousedown", handleClickOutside);
    else document.addEventListener("mousedown", handleClickOutside);

    const ulNodo = document.querySelector(`.${classUl}`) as HTMLUListElement;
    const button = document.getElementById(buttonId);
    if (button) {
      const rect = button.getBoundingClientRect();
      if (ulNodo && rect.bottom >= 465) {
        ulNodo.classList.remove(positionList == "left" ? "left-0" : "right-0");

        if (ulNodo.offsetHeight > 0) {
          const sizeUp = ulNodo.offsetHeight + 8;
          const sizeWidthUp = ulNodo.offsetWidth;
          ulNodo.style.top = `-${sizeUp}px`;
          ulNodo.style.left = `-${sizeWidthUp - 8}px`;
          // ulNodo.classList.add(`-top-[5.5rem]`);
          // ulNodo.classList.add("-left-28");
        }
      }
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeSelect]);

  return (
    <div className="relative">
      <button
        id={buttonId}
        onClick={handleChangeClickButton}
        className={`${classNameButton} ${classText} relative flex items-center justify-between  py-[5px] px-2 text-gray-800 rounded-md hover:bg-gray-100 bg-gray-200 text-[10px] border border-[#18183233]`}
      >
        {icon && (
          <i className={`${icon} ${classNameIcon} ${classText} text-base `}></i>
        )}
        {label}
        {iconList && (
          <div className="ml-3">
            <svg
              className={"w-2.5 h-2.5 ms-2.5 " + classText}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </div>
        )}
      </button>

      <ListUl
        data={data}
        classItemOption={classItemOption}
        activeSelect={activeSelect}
        classNameContainerOptions={classNameContainerOptions}
        classNameContainerOptionsLi={classNameContainerOptionsLi}
        positionList={positionList}
        classUl={classUl}
        handleChangeClickButton={handleChangeClickButton}
      />
    </div>
  );
};

interface IListUl {
  data: IDataForDropdown[];
  classItemOption?: string;
  classUl?: string;
  activeSelect: string;
  classNameContainerOptions: string;
  classNameContainerOptionsLi: string;

  positionList: "left" | "right";
  handleChangeClickButton: (event: Event) => void;
}

const ListUl = (props: IListUl) => {
  const { data, activeSelect, classItemOption, positionList } = props;
  const { handleChangeClickButton, classNameContainerOptions } = props;
  const { classNameContainerOptionsLi, classUl } = props;

  return (
    <ul
      className={`${classUl} ${activeSelect} ${classNameContainerOptions} ${
        positionList == "left" ? "left-0" : "right-0"
      } absolute z-10 mt-1  bg-white max-h-56 rounded-lg py-1 text-base ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm shadow-custom`}
      role="listbox"
      aria-labelledby="listbox-label"
      aria-activedescendant="listbox-option-3"
      id="list-select"
    >
      {data.map((item: any, index: number) => (
        <ListLi
          key={index * new Date().getTime()}
          classItemOption={classItemOption}
          handleChangeClickButton={handleChangeClickButton}
          classNameContainerOptionsLi={classNameContainerOptionsLi}
          item={item}
        />
      ))}
    </ul>
  );
};

interface IListLi {
  classItemOption?: string;
  item: IDataForDropdown;
  classNameContainerOptionsLi: string;

  handleChangeClickButton: (event: Event) => void;
}

const ListLi = (props: IListLi) => {
  const { classItemOption, handleChangeClickButton } = props;
  const { item, classNameContainerOptionsLi } = props;

  const handleChangeClickItem = (event: any) => {
    if (item.disabled) return;
    if (item.onClick) item.onClick(event, item);
    handleChangeClickButton(event);
  };

  return (
    <li
      className={` ${classNameContainerOptionsLi} ${classItemOption} ${
        item.disabled
          ? "text-gray-500 "
          : `text-[#3A3535] cursor-pointer ${item.className}`
      }   select-none relative  px-3 rounded-md `}
      id="listbox-option-0"
      role="option"
      onClick={handleChangeClickItem}
    >
      <div
        className={`${classItemOption} flex items-center px-2  truncate text-[10px] `}
      >
        {item.icon && (
          <i
            className={`${
              item.disabled ? " text-gray-500 " : ""
            } ${classItemOption} ${item.icon} text-base mr-2 `}
          ></i>
        )}
        {item.name}
      </div>
    </li>
  );
};
