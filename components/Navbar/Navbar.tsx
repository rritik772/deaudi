import { useState } from "react"
import { useContractContext } from "../../context/BlockchainContext";

enum SearchCategory {
    Tracks = "Track",
    Artists = "Artist"
}

export default function Navbar() {
    const [dropdownCat, setDropdownCat] = useState<SearchCategory>(SearchCategory.Tracks);
    const { connectWallet, isWalletConnected } = useContractContext();

    const handleToggleDropdown = () => {
        switch (dropdownCat) {
            case SearchCategory.Tracks:
                setDropdownCat(SearchCategory.Artists);
                break;
            default:
                setDropdownCat(SearchCategory.Tracks);
                break;
        }
    }

    return (
        <nav className="container bg-white px-2 py-4 rounded-lg border-1 hover:shadow-none mx-auto mt-5 sticky top-0 duration-300">
            <div className="flex gap-4 items-center justify-between mx-4">

                <div className="flex gap-5 items-center">
                    <a className="text-2xl rig decoration-none" href="/">DeAudi</a>
                    <div className="" id="navbarNav">
                        <ul className="flex gap-4 robo text-gray-700">
                            <a href='/profile'>
                                <button className="hover:(border-blue-500) border-b border-dashed border-transparent px-1 py-2 duration-300">
                                    Profile
                                </button>
                            </a>
                            {
                                !isWalletConnected &&
                                <button className="hover:(border-blue-500) border-b border-dashed border-transparent px-1 py-2 duration-300" onClick={connectWallet}>
                                    Connect Wallet
                                </button>
                            }
                        </ul>
                    </div>
                </div>


                <form className="robo flex items-center gap-4" role="search">
                    <input className="input hover:w-64 focus:w-64 w-44" type="search" placeholder="Search..." aria-label="Search" />

                    <button type="button" className="hover:(shadow-lg border-gray-400) px-4 py-2  border-1 rounded-lg duration-300" onClick={handleToggleDropdown}>{dropdownCat}</button>

                    <button className="submit-button" type="button">&#128269;</button>
                </form>

            </div>
        </nav>
    )
}
