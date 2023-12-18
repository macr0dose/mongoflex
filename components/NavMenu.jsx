import { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NavMenu = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggleDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const navigateTo = (path) => {
    router.push(path);
    setToggleDropdown(false);
  };

  if (!session?.user) return null;

  return (
    <div className="flex relative" ref={dropdownRef}>
      <div className="flex">
        <Image
          src={session.user.image}
          width={37}
          height={37}
          className="rounded-full"
          alt="profile"
          onClick={() => setToggleDropdown((prev) => !prev)}
        />
        {toggleDropdown && (
          <div className="dropdown z-20">
            <div className="flex flex-col items-center gap-y-4 w-full">
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

            <div className="dropdown_link" onClick={() => navigateTo("/profile")}>
              My Profile
            </div>
            <div className="dropdown_link" onClick={() => navigateTo("/create-project")}>
              Create Project
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-5 w-full rounded-full border border-primary-purple bg-primary-purple py-1.5 px-5 text-white transition-all text-center text-sm items-center justify-center"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavMenu;