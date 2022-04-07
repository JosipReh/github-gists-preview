import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Notfound: FunctionalComponent = () => {
    return (
        <Root>
            <h1>Error 404</h1>
            <p>That page doesn&apos;t exist.</p>
            <Link href="/">
                <h4>Back to Home</h4>
            </Link>
        </Root>
    );
};

export default Notfound;
