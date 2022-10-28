import React from "react";
import { useMetamask, useAddress, useDisconnect } from "@thirdweb-dev/react";
import Link from "next/link";
import {
  ChevronDownIcon,
  BellIcon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

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

          <Link href="/addItem" className="flex items-center hover:link">
            Add to Inventory
            <ChevronDownIcon className="h-4" />
          </Link>
          <BellIcon className="w-6 h-6 hover:link " />
          <ShoppingCartIcon className="W-6 h-6 hover:link " />
        </div>
      </nav>
      <hr className="mt-2 p-2" />

      <section>
        <div></div>
      </section>
    </div>
  );
};

export default Header;
