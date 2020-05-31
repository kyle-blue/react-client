import React from "react";
import Navbar from "../General/Navbar";
import Header from "./Header";
import Footer from "../General/Footer";

interface Props {
}

function Home(props: Props): React.ReactElement {
    return (
        <main>
            <Navbar />
            <Header />
            <Footer />
        </main>
    );
}

export default Home;
