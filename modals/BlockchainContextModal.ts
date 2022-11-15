export type BlockchainContextModal = {
  connectWallet: () => void
  isWalletConnected: boolean
}

export const BlockchainContextModalDefault: BlockchainContextModal = {
  connectWallet: () => { },
  isWalletConnected: false

}
