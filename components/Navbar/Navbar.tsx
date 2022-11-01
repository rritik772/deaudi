import { useState } from "react"

enum SearchCategory {
    Tracks = "Track",
    Artists = "Artist"
}

export default function Navbar() {
    const [dropdownCat, setDropdownCat] = useState<SearchCategory>(SearchCategory.Tracks);

    return (
        <nav className="navbar navbar-expand-lg fixed-top bg-light m-3 shadow rounded-2">
            <div className="container-fluid">

                <a className="navbar-brand rig fs-3" href="#">DeAudi</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse robo" id="navbarNav">
                    <ul className="navbar-nav text-muted">
                        <li className="nav-item">
                            <a className="nav-link" href="">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">Logout</a>
                        </li>
                    </ul>
                </div>

                <form className="d-flex robo" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search..." aria-label="Search" />

                    <div className="dropdown me-2">
                        <button className="btn btn-outline-secondary dropdown-toggle robo" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {dropdownCat}
                        </button>
                        <ul className="dropdown-menu shadow">
                            {
                                (Object.keys(SearchCategory) as Array<keyof typeof SearchCategory>).map((key) => (

                                    <li onClick={() => setDropdownCat(SearchCategory[key])} key={key}>
                                        <a className="dropdown-item">{SearchCategory[key]}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <button className="btn btn-outline-primary" type="submit">&#128269;</button>
                </form>

            </div>
        </nav>
    )
}
