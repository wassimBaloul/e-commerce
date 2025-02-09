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
        <div className="h-20 bg-white flex items-center justify-between px-6 max-w-screen-2xl mx-auto relative">
          {/* MOBILE MENU BUTTON (Left) */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>

          {/* LOGO (Centered) */}
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src="/logo v1 svg.svg"
              width={120} // Smaller logo for mobile
              height={120}
              alt="logo"
              className="max-md:w-32" // Adjust logo size for mobile
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

          {/* RIGHT SIDE ICONS (Cart and Login/Register) */}
          <div className="flex gap-x-4 items-center">
            {/* Cart Icon (Resized for mobile) */}
            <div className="max-md:scale-75">
              <CartElement />
            </div>

            {/* Login/Register Icons (Resized for mobile) */}
            {!session ? (
              <div className="flex gap-x-2 max-md:scale-75">
                <Link href="/login" className="flex items-center gap-x-1 font-semibold">
                  <FaRegUser className="text-black" />
                  <span className="max-lg:hidden">Login</span> {/* Hide text on mobile */}
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-x-2 max-md:scale-75">
                <span className="text-base max-md:hidden">{session.user?.email}</span> {/* Hide email on mobile */}
                <button onClick={handleLogout} className="flex items-center gap-x-1 font-semibold">
                  <FaRegUser className="text-black" />
                  <span className="max-md:hidden">Logout</span> {/* Hide text on mobile */}
                </button>
              </div>
            )}
          </div>

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
        </div>
      )}
    </header>
  );
};

export default Header;