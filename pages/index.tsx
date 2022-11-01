import Header from "../components/Header";
import {
  useContract,
  useActiveListings,
  MediaRenderer,
} from "@thirdweb-dev/react";
import { ListingType } from "@thirdweb-dev/sdk";
import { BanknotesIcon, ClockIcon } from "@heroicons/react/24/outline";
import Head from "next/head";

const Home = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_NFT_MARKET_LISTING,
    "marketplace"
  );
  const { data: listings, isLoading: loadingListings } =
    useActiveListings(contract);

  console.log(listings);
  return (
    <>
    <Head>
      <link rel="shortcut icon" href="https://pages.ebay.com/favicon.ico" type="image/x-icon" />
      <title>Ebay Clone App - Electronics, Cars, Fashion, Collectibles & More | eBay</title>
    </Head>
    <div className=".">
      <Header />

      <main className="max-w-6xl mx-auto p-5">
        {loadingListings ? (
          <p className="animate-pulse text-center text-blue-500">
            Loading Listings...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto">
            {listings?.slice(2)?.map((listing) => (
              <div
                className="flex flex-col card hover:scale-105 transition-all duration-150 ease-out"
                key={listing.id}
              >
                <div className="flex-1 flex flex-col pb-2 items-center">
                  <MediaRenderer className="h-32" src={listing.asset.image} />
                </div>
                <div className="pt-2 space-y-3">
                  <div>
                    <h2 className="text-lg truncate">{listing.asset.name}</h2>
                    <hr />
                    <p className="text-sm truncate text-gray-600">
                      {listing.asset.description}
                    </p>
                  </div>
                  <p className="">
                    <span className="font-bold mr-2">
                      {listing.buyoutCurrencyValuePerToken.displayValue}
                    </span>
                    {listing.buyoutCurrencyValuePerToken.symbol}
                  </p>

                  <div
                    className={`flex items-center space-x-1 justify-end text-xs w-fit ml-auto p-2 rounded-lg
                     text-white ${
                       listing.type === ListingType.Direct
                         ? "bg-blue-500"
                         : "bg-red-500"
                     }
                  `}
                  >
                    <p>
                      {listing.type === ListingType.Direct
                        ? "Buy Now"
                        : "Auction"}
                    </p>
                    {listing.type === ListingType.Direct ? (
                      <BanknotesIcon className="h-4" />
                    ) : (
                      <ClockIcon className="h-4" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  </>
  );
};

export default Home;
