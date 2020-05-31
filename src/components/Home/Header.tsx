import React, { useContext } from "react";
import { Email } from "@material-ui/icons";
import { ThemeContext } from "../../styles/GlobalUserTheme";
import {
    Button, Wrapper, Container, Subtitle, Title, Input, Form,
} from "./styles/HeaderStyle";
import Wave from "../../assets/svgs/curve.svg";

interface Props {

}

function Header(props: Props): React.ReactElement {
    let theme = useContext(ThemeContext);
    const WAVE_HEIGHT = "150px";

    return (
        <>
            <Wrapper theme={theme}>
                <Container>
                    <Title>A platform for sharing condensed thoughts and lessons from books, podcasts and more...</Title>
                    <Subtitle>Currently in development! We will release more info closer to release, just enter your email below:</Subtitle>
                    <Form>
                        <Input id="email-input" label="email@example.com" variant="filled" />
                        <Button>Submit  <Email /></Button>
                    </Form>
                </Container>
            </Wrapper>
            <Wave fill="#eee" height={WAVE_HEIGHT} width="100%" style={{ top: `-${WAVE_HEIGHT}`, position: "relative" }} />
        </>
    );
}

export default Header;
