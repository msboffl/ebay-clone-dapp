import React from "react";
import { useMetamask, useAddress, useDisconnect } from "@thirdweb-dev/react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/EBay_logo.png";

import {
  ChevronDownIcon,
  BellIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Head from "next/head";

type Props = {};
const Header = (props: Props) => {
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();

  return (
    <div className="max-w-7xl mx-auto p-2">
      <nav className="flex justify-between">
        <div className="flex items-center space-x-4 text-sm">
          {address ? (
            <button onClick={disconnect} className="connectWalletBtn">
              Hi, {address.slice(0, 4) + "..." + address.slice(-4)}
            </button>
          ) : (
            <button onClick={connectWithMetamask} className="connectWalletBtn">
              Connect to your wallet
            </button>
          )}
          <p className="headerLinks">Daily Deals</p>
          <p className="headerLinks">Help & Contact</p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <p className="headerLinks">Sell</p>
          <p className="headerLinks">Watchlist</p>
          <p className="headerLinks">My eBay</p>

          <Link href="/additem" className="flex items-center hover:link">
            Add to Inventory
            <ChevronDownIcon className="h-4" />
          </Link>
          <BellIcon className="w-6 h-6 hover:link " />
          <ShoppingCartIcon className="W-6 h-6 hover:link " />
        </div>
      </nav>
      <hr className="mt-2 p-2" />

      <section className="flex items-center space-x-2 py-5">
        <div className="h-16 w-16 sm:w-28 md:w-35 cursor-pointer">
          <Link href="/">
            <Image
              className="w-full h-full object-contain"
              src={logo}
              alt="Ebay Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <button className="hidden lg:flex items-center space-x-2 w-20">
          <p className="text-sm text-gray-600">Shop by Category</p>
          <ChevronDownIcon className="h-4 flex-shrink-0" />
        </button>
        <div className="flex items-center space-x-2 px-2 md:px-5 py-2 border-black border-2 flex-1">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
          <input
            className="flex-1 outline-none"
            type="text"
            placeholder="Search for anything"
          />
        </div>
        <button className="hidden sm:inline bg-blue-600 text-white px-5 py-2 border-blue-600 border-2">Search</button>
        <Link href="/create">
          <button className="border-blue-600 border-2 px-5 py-2 hover:bg-blue-300 hover:text-white">List Items</button>
        </Link>
      </section>
      <hr />
      <section className="flex space-x-6 py-4 text-xs md:text-sm justify-center whitespace-nowrap px-6">
        <p className="link">Home</p>
        <p className="link">Electronics</p>
        <p className="link">Computers</p>
        <p className="link hidden sm:inline">Video Games</p>
        <p className="link hidden sm:inline">Home & Garden</p>
        <p className="link hidden md:inline">Health & Beaty</p>
        <p className="link hidden md:inline">Collectibles & Art</p>
        <p className="link hidden lg:inline">Books</p>
        <p className="link hidden lg:inline">Music</p>
        <p className="link hidden xl:inline">Deals</p>
        <p className="link hidden xl:inline">Other</p>
        <p className="link">More</p>

      </section>
    </div>
  );
};

export default Header;
