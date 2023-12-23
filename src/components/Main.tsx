import React from "react";

function Main({ children }: { children: React.ReactNode }) {
    return <main className="container relative">{children}</main>;
}

export default Main;
