"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

const ProfileMenu = ({ session }) => {
  const [openModal, setOpenModal] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenModal(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const toggleMenu = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="flexCenter z-10 flex-col relative" ref={menuRef}>
      <Menu as="div">
        <Menu.Button
          className="flexCenter"
          onClick={toggleMenu}
        >
          {session?.user?.image && (
            <Image
              src={session.user.image}
              width={40}
              height={40}
              className="rounded-full"
              alt="user profile image"
            />
          )}
        </Menu.Button>

        <Transition
          show={openModal}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="flexStart profile_menu-items"
          >
            <div className="flex flex-col items-center gap-y-4">
              {session?.user?.image && (
                <Image
                  src={session?.user?.image}
                  className="rounded-full"
                  width={80}
                  height={80}
                  alt="profile Image"
                />
              )}
              <p className="font-semibold">{session?.user?.name}</p>
            </div>

            <div className="flex flex-col gap-3 pt-10 items-start w-full">
              <Menu.Item>
                {({ active }) => (
                  <Link href={`/profilemenu/${session?.user?.id}`}>
                    <div className={`text-sm ${active ? 'text-blue-500' : 'text-black'}`}>
                      Work Preferences
                    </div>
                  </Link>
                )}
              </Menu.Item>
              {/* <Menu.Item>
                {({ active }) => (
                  <Link href={`/profile/${session?.user?.id}`}>
                    <div className={`text-sm ${active ? 'text-blue-500' : 'text-black'}`}>
                      Settings
                    </div>
                  </Link>
                )}
              </Menu.Item> */}
              <Menu.Item>
                <div >

                </div>
                {/* {({ active }) => (
                  <Link href={`/profile/${session?.user?.id}`}>
                    <div className={`text-sm ${active ? 'text-blue-500' : 'text-black'}`}>
                      Profile
                    </div>
                  </Link>
                )} */}
              </Menu.Item>
            </div>
            <div className="w-full flexStart border-t border-nav-border mt-5 pt-5">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={`text-sm ${active ? 'text-blue-500' : 'text-black'}`}
                    onClick={() => signOut()}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
