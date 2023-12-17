import { Menu, Transition } from "@headlessui/react";
import Image from "next/image/";
import { categoryFilters } from "/constants";
import { useEffect, useRef, useState } from "react";

const CustomMenu = ({ title, state, setState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const onItemClick = (category) => {
    setState(category);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flexStart flex-col w-full relative bg-slate-50 rounded-xl" ref={menuRef}>
      <label htmlFor={title} className="w-full text-slate-600 font-bold">
        {title}
      </label>
      <Menu as="div" className="self-start relative">
        {({ open }) => (
          <>
            <div>
              <Menu.Button
                className="flexCenter gap-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                {state || "Select Category"}
                <Image
                  src="/assets/images/arrow-down.svg"
                  width={10}
                  height={5}
                  alt="Arrow down"
                />
              </Menu.Button>
            </div>
            <Transition
              show={isOpen}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="flexStart custom_menu-items absolute z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg outline-none"
                style={{ top: "auto", bottom: "100%" }}
              >
                {categoryFilters.map((category) => (
                  <Menu.Item key={category}>
                    {({ active }) => (
                      <button
                        type="button"
                        value={category}
                        className={`custom_menu-item ${
                          active ? " text-primary-orange" : ""
                        }`}
                        onClick={(e) => onItemClick(e.currentTarget.value)}
                      >
                        {category}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export default CustomMenu;