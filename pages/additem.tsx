import React, { FormEvent, useState } from "react";
import Header from "../components/Header";
import { useContract, useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";

type Props = {};

const AddItem = (props: Props) => {
  const [preview, setPreview] = useState<string>();
  const [image, setImage] = useState<File>();

  const router = useRouter();
  const address = useAddress();
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_NFT_MARKET_MINT,
    "nft-collection"
  );
  //   console.log(contract);

  const mintNFT = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!contract || !address) return;
    if (!image) {
      alert("Please add Image");
      return;
    }
    const target = e.target as typeof e.target & {
      name: { value: string };
      description: { value: string };
    };
    const metadata = {
      name: target.name.value,
      description: target.description.value,
      image: image
    };
    try {
      const tx = await contract.mintTo(address, metadata);
      const receipt = tx.receipt;
      const tokenID = tx.id;
      const nft = await tx.data();
      console.log(receipt, tokenID, nft);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Header />

      <main className="max-w-6xl mx-auto p-10 border">
        <h1 className="text-4xl font-bold">Add item to the Market Place</h1>
        <h2 className="text-xl font-semibold pt-5">Item Details</h2>
        <p className="pb-5">
          By adding item to the market place, You're essentially mint the NFT's
        </p>

        <div className="flex flex-col justify-center items-center md:flex-row md:space-x-5">
          <img
            className="border h-80 w-80"
            src={preview || "https://links.papareact.com/ucj"}
            alt=""
          />

          <form
            onSubmit={mintNFT}
            className="flex flex-col flex-1 p-2 space-y-2"
          >
            <label className="font-light">Name of the Item</label>
            <input
              className="formField"
              type="text"
              placeholder="Name of Item..."
              name="name"
              id="name"
            />
            <label className="font-light">Description</label>
            <input
              className="formField"
              type="text"
              placeholder="Description of Item"
              name="description"
              id="description"
            />
            <label className="font-light">Image of Item</label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setPreview(URL.createObjectURL(e.target.files[0]));
                  setImage(e.target.files[0]);
                }
              }}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-full py-4 px-10 w-56 ml-auto"
            >
              Add/Mint
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddItem;
