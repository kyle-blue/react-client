import React, { useContext } from "react";
import {
    Button, Container, Spacer, Logo, LogoText, Wrapper,
} from "./styles/NavBarStyles";
// @ts-ignore
import logo from "../../assets/images/logo.png";
import { ThemeContext, ThemeType } from "../../styles/GlobalUserTheme";

interface Props {
    height: number;
}

function Navbar(Props: props): React.ReactElement {
    let theme: ThemeType["navbar"] = useContext(ThemeContext).navbar;

    const navItems = [
        <Button key="NavHome">Home</Button>,
        <Button key="NavAbout">About</Button>,
        <Button key="NavContact">Contact</Button>,
        <Button key="NavSearch">Search</Button>,
    ];

    return (
        <Wrapper>
            <Container theme={theme}>
                <Logo src={logo} />
                <LogoText>BitMemo</LogoText>
                <Spacer />
                {
                    navItems
                }
            </Container>
        </Wrapper>
    );
}

export default Navbar;
