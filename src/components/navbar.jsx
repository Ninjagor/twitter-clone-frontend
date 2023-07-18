import TwitterLogo from "../twitter-logo.png"


const Navbar = () => {
    return (
        <>
        <nav className="flex w-full items-center justify-center max-h-14 h-14 gap-3 border-b-2 border-neutral-800">
            <img src={TwitterLogo} alt="twitter logo" className="w-8"/>
            <h1>Badly Made Twitter</h1>
        </nav>
        </>
    )
}

export default Navbar;