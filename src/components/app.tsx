import { FunctionalComponent, h } from 'preact';
import {Route, Router, RouterOnChangeArgs} from 'preact-router';

import NotFoundPage from '../routes/notfound';
import Header from './Navbar/Navbar';
import Theme from "../theme";
import styled from "styled-components";
import Explore from "../routes/explore/explore";
import {useState} from "preact/compat";


const Body = styled.div`
  background: ${props => props.theme.colors.level1};
  color: ${props => props.theme.colors.level3};
  overflow: auto;
  font-weight: 400;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: ${props => props.theme.fonts[0]}, arial, sans-serif;

  ${Body} {
    flex: 1;
  }
`;


const App: FunctionalComponent = () => {

    const [activeRoute, setActiveRoute] = useState('');

    const handleRouterChange = (routerArgs: RouterOnChangeArgs): void => {
        setActiveRoute(routerArgs.url)
    }
    return (
    <Theme>
        <Container>
            <Header activeUrl={activeRoute} />
            <Body>
                <Router onChange={handleRouterChange}>
                    <Route path="/" component={Explore} />
                    <Route path="/explore" component={Explore} />
                    <NotFoundPage default />
                </Router>
            </Body>
        </Container>
    </Theme>
    );
};

export default App;
