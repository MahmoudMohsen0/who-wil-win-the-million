/// <reference types="vite-plugin-svgr/client" />
import Logo from "/src/assets/logo.svg?react";
function Header() {
    return (
        <header className="header">
            <Logo />
        </header>
    );
}

export default Header;
