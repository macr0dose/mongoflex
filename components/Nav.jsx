"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { NavLinks } from "@/constants";
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  const handleSignOut = () => {
    // Redirect to the homepage after signing out
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="flexBetween w-full pt-3 pb-2 border-b border-slate-400">

      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Flexibble logo"
          width={125}
          height={125}
          className="object-contain"
          loading="eager"
        />
      </Link>
      <p className="logo_text pl-20">Login with Demo Account</p>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden pb-6">

        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-project" className="black_btn">
              Share work
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown z-20">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-project"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Project
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
