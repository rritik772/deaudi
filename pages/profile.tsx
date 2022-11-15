import ProfileInfo from "../components/Profile/ProfileInfo";
import Tracks from "../components/Tracks/Tracks";
import { useContractContext } from "../context/BlockchainContext";

export default function profile() {
  const { connectWallet } = useContractContext();
  console.log(connectWallet)
  return (
    <div className="mt-10 flex flex-col items-center">
      <ProfileInfo />
      <Tracks />
    </div>
  )
}
