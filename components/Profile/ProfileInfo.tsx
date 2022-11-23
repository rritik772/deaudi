import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useContractContext } from "../../context/BlockchainContext";
import Loading from "../Loading/Loading";
import AddTrack from "./AddTrack";

declare const window: any;

export default function ProfileInfo() {
  const [ethereum, setEthereum] = useState<any>();

  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { createProfile, getProfile } = useContractContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = false;

    if (name.length < 4) {
      toast.error('Name length too short');
      error = true;
    } else if (username.length < 4) {
      toast.error('username length too short');
      error = true;
    } else if (description.length < 10) {
      toast.error('description length too short');
      error = true;
    } else if (!ethereum) {
      toast.error("No ethereum object");
      error = true;
    }

    if (error) {
      setLoading(false);
      return;
    }

    const isAdded = await createProfile!(ethereum, {
      name: name,
      totalTracksAdded: -1,
      description: description,
      username: username
    });

    if (isAdded) {
      toast.success("Created profile successfully.")
      setLoading(false);
      return;
    }

    toast.error("Something went wrong.");
    setLoading(false);
  }

  useEffect(() => { setEthereum(window.ethereum) }, [])

  useEffect(() => {
    async function getProfileData() {
      const data = await getProfile!(ethereum);

      setName(data.name);
      setUsername(data.username);
      setDescription(data.description);
    }

    if (ethereum)
      getProfileData();
  }, [ethereum])


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div className="
        grid grid-cols-1 md:grid-cols-2 gap-5
        robo border-1 p-5 rounded-lg bg-white shadow-sm"
      >

        <span className="text-3xl mb-3 rig uppercase tracking-widest col-spans-2">Profile</span>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" className="input mont" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" className="input mont" value={username} onChange={e => setUsername(e.target.value)} />
        </div>

        <div className="flex flex-col gap-2 col-spans-2">
          <label htmlFor="desc">Description</label>
          <textarea id="desc" className="input" value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        <div />
        {
          loading ?
            <Loading /> :
            <button className="hover:(border-green-500 shadow-xl) text-sm duration-500 rounded-lg px-4 py-2 border justify-self-end" onClick={handleSubmit}>Confirm Edit</button>
        }
      </div>

      <div className="flex flex-col gap-2 border p-5 rounded-lg">
        <span className="text-3xl rig mb-3">Add Track</span>
        <AddTrack />
      </div>
    </div>
  )
}
