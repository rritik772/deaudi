import { NFTStorage, File } from 'nft.storage';

export async function storeNFT(track: Blob): Promise<string> {
  const nftstorage = new NFTStorage({ token: `${process.env.NFT_STORAGE_KEY}` });
  const cid = await nftstorage.storeBlob(track);
  return cid
}

// async function fileFromPath(trackPath: string) {
//   const content = await fs.promises.readFile(trackPath);
//   const type = mime.contentType(path.extname(trackPath)) as string;
//   return new File([content], path.basename(trackPath), { type });
// }
