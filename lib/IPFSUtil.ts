import { NFTStorage } from 'nft.storage';

export async function storeNFT(blob: Blob): Promise<string> {
  const nftstorage = new NFTStorage({ token: `${process.env.NFT_STORAGE_KEY}` });
  const cid = await nftstorage.storeBlob(blob);
  return cid
}

export async function getNFT(cid: string): Promise<Blob> {
  const url = `https://ipfs.io/ipfs/${cid}`;

  const res = await fetch(url);
  const blob = await res.blob();

  if (res.status === 200) return blob;
  return new Blob([]);
}
