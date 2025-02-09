"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons
import { FaRegUser } from "react-icons/fa6";
import CartElement from "./CartElement";
import HeartElement from "./HeartElement";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { wishlist, wishQuantity } = useWishlistStore();
  const [isClient, setIsClient] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Prevent body scroll when sidebar is open
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [sidebarOpen]);

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <header className="bg-white">
      {!pathname.startsWith("/admin") && (
        <div className="h-20 bg-white flex items-center justify-between px-10 max-md:px-6 max-lg:flex-col max-lg:gap-y-5 max-lg:justify-center max-lg:h-40 max-w-screen-2xl mx-auto relative">
          {/* LOGO */}
          <Link href="/">
            <img
              src="/logo v1 svg.svg"
              width={200}
              height={200}
              alt="logo"
              className="max-md:w-40"
            />
          </Link>

          {/* Desktop Menu (Hidden on mobile) */}
          <div className="hidden md:flex gap-x-4">
            <Link href="/shop" className="font-semibold">
              Shop
            </Link>
            <Link href="/shop#on-sale" className="font-semibold">
              On Sale
            </Link>
            <Link href="/shop#new-arrivals" className="font-semibold">
              New Arrivals
            </Link>
            <Link href="/shop#brands" className="font-semibold">
              Brands
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>

          {/* MOBILE SIDEBAR */}
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out md:hidden z-50`}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-2xl"
              onClick={closeSidebar}
            >
              <FaTimes />
            </button>

            {/* Sidebar Links */}
            <nav className="flex flex-col items-center gap-y-4 pt-16">
              <Link href="/shop" className="font-semibold" onClick={closeSidebar}>
                Shop
              </Link>
              <Link href="/shop#on-sale" className="font-semibold" onClick={closeSidebar}>
                On Sale
              </Link>
              <Link href="/shop#new-arrivals" className="font-semibold" onClick={closeSidebar}>
                New Arrivals
              </Link>
              <Link href="/shop#brands" className="font-semibold" onClick={closeSidebar}>
                Brands
              </Link>
            </nav>
          </div>

          {/* Overlay for Sidebar */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={closeSidebar}
            ></div>
          )}

          {/* RIGHT SIDE ICONS */}
          <div className="flex gap-x-6 items-center">
            <HeartElement wishQuantity={wishQuantity} />
            <CartElement />
            {!session ? (
              <div className="flex gap-x-4">
                <Link href="/login" className="flex items-center gap-x-2 font-semibold">
                  <FaRegUser className="text-black" />
                  <span>Login</span>
                </Link>
                <Link href="/register" className="flex items-center gap-x-2 font-semibold">
                  <FaRegUser className="text-black" />
                  <span>Register</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-x-4">
                <span className="text-base">{session.user?.email}</span>
                <button onClick={handleLogout} className="flex items-center gap-x-2 font-semibold">
                  <FaRegUser className="text-black" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;