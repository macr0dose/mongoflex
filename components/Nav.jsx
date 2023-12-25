"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
import NavMenu from "./NavMenu";
import ProfileMenu from "./ProfileMenu";
import AuthProviders from "./AuthProviders";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flexBetween w-full pt-6 pb-6 border-b border-slate-400">
      <Link href="/">
        <div className="flex gap-2 flex-center">
          <Image
            src="/assets/images/logo.svg"
            alt="Flexibble logo"
            width={125}
            height={125}
            className="object-contain"
            loading="eager"
          />
        </div>
      </Link>
      <p className="logo_text pl-20">Login with Demo Account</p>

      <div className="flex gap-6 cursor-pointer">
        {session?.user ? (
          <>
            <Link href="/create-project">
              <div className="purple_btn sm:hidden md:block">Share work</div>
            </Link>
            {/* Show NavMenu when user is signed in */}
            <NavMenu session={session}/>
          </>
        ) : (
          <>
            {/* Show AuthProviders only when no user is signed in */}
            {!session && <AuthProviders/>}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;