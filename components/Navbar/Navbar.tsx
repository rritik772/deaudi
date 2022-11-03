import { useState } from "react"

enum SearchCategory {
    Tracks = "Track",
    Artists = "Artist"
}

export default function Navbar() {
    const [dropdownCat, setDropdownCat] = useState<SearchCategory>(SearchCategory.Tracks);

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
        <nav className="container bg-gray-100 px-2 py-4 rounded-lg border-2 shadow hover:shadow-lg mx-auto mt-5 sticky top-0 duration-300">
            <div className="flex gap-4 items-center justify-between mx-4">

                <div className="flex gap-5 items-center">
                    <a className="text-2xl rig decoration-none" href="#">DeAudi</a>
                    <div className="" id="navbarNav">
                        <ul className="flex gap-2 robo text-gray-700">
                            <a className="" href="/profile">Profile</a>
                            <a className="" href="/login">Login</a>
                            <a className="" href="/logout">Logout</a>
                        </ul>
                    </div>
                </div>


                <form className="robo flex items-center gap-4" role="search">
                    <input className="input" type="search" placeholder="Search..." aria-label="Search" />

                    <button type="button" className="hover:(shadow border-gray-400) px-2 py-1 border-2 rounded-lg duration-300" onClick={handleToggleDropdown}>{dropdownCat}</button>

                    <button className="submit-button" type="button">&#128269;</button>
                </form>

            </div>
        </nav>
    )
}
