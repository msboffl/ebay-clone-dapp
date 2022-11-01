import React, { FormEvent, useState } from "react";
import {
  MediaRenderer,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import Header from "../components/Header";
import { NFT } from "@thirdweb-dev/sdk";

type Props = {};

const Create = (props: Props) => {
  const address = useAddress();

  const [selectedNFT, setSelectedNFTselectedNFT] = useState<NFT>();

  const { contract } = useContract(
    process.env.NEXT_PUBLIC_NFT_MARKET_LISTING,
    "marketplace"
  );
  const { contract: NFTCollection } = useContract(
    process.env.NEXT_PUBLIC_NFT_MARKET_MINT,
    "nft-collection"
  );

  const ownedNFTs = useOwnedNFTs(NFTCollection, address);
  //   console.log(ownedNFTs)

  const createListing = async (e: FormEvent<HTMLFormElement>) => {
    

  };
  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto p-10 pt-2">
        <h1 className="text-4xl font-bold">List an Item</h1>
        <h2 className="text-xl font-semibold pt-5">
          Select an item you would like to Sell
        </h2>
        <hr className="" />
        <p>Below you find the NFT's you own in your wallet</p>

        <div className="flex overflow-x-scroll space-x-2 p-4">
          {ownedNFTs.data?.slice(2).map((nft) => (
            <div
              key={nft.metadata.id}
              onClick={() => setSelectedNFTselectedNFT(nft)}
              className={`flex flex-col space-y-2 card min-w-fit bg-gray-100
                ${
                  nft.metadata.id === selectedNFT?.metadata.id
                    ? "border-green-500 border-4"
                    : "border-transparent"
                }
              `}
            >
              <MediaRenderer
                className="h-48 rounded-lg"
                src={nft.metadata.image}
              />
              <p className="text-xl truncate font-bold">{nft.metadata.name}</p>
              <p className="text-xs truncate">{nft.metadata.description}</p>
            </div>
          ))}
        </div>
        {selectedNFT && (
          <form onSubmit={createListing}>
            <div className="grid grid-cols-2 p-10">
              <div className="grid grid-cols-2 gap-5">
                <label className="border-r font-light">Direct Listing</label>
                <input
                  className="ml-auto h-10 w-10"
                  type="radio"
                  name="listingType"
                  value="directLisitng"
                />

                <label className="border-r font-light">Auction Listing</label>
                <input
                  className="ml-auto h-10 w-10"
                  type="radio"
                  name="listingType"
                  value="auctionListing"
                />

                <label className="border-r font-light">Price</label>
                <input
                  type="text"
                  placeholder="0.05"
                  className="bg-gray-100 p-5"
                  name="price"
                />
                <button
                  className="p-4 mt-8 bg-blue-600 text-white rounded-lg"
                  type="submit"
                >
                  Create Listing
                </button>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default Create;
