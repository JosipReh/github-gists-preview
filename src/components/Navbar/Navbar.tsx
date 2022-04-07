import { Icon } from '@rmwc/icon';
import { FunctionalComponent, h } from 'preact';
import styled from 'styled-components';
import {IconPropT} from "@rmwc/types";
import {Link} from "../Link/Link";

const Root = styled.nav`
  background: ${props => props.theme.colors.brand2};
  border-bottom: 5px solid ${props => props.theme.colors.brand2};
  width: 100%;
  padding: 20px 20px 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
`;

const LinkContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  & > i {
    padding: 5px;
  }
`;
const NavItems = styled.div`
  display: flex;
`;

interface Props {
    activeUrl: string;
}
interface RouteConfig {
    url: string;
    iconProps?: IconPropT;
    matchUrls?: string[];
    title: string;
}
const Navbar: FunctionalComponent<Props> = ({ activeUrl }) => {

    const routes: RouteConfig[] = [{
        url: '/explore',
        iconProps: { icon: 'explore' },
        matchUrls: ['/explore', '/', ''],
        title: 'All gists',
    }
    ]
    return (
        <Root>
            <NavItems>
                {routes.map(route => {
                    const matchUrls = Array.from(new Set([route.url, ...(route.matchUrls || [])]));
                    const isActive = !!matchUrls.find(url => {
                        return url === activeUrl
                    });
                    return (
                        <Link bold={true} key={`${route.url}-${route.title}`} active={isActive} href={route.url} style={{padding: '10px', letterSpacing: '1px'}}>
                            <LinkContent>
                            {/*
                            // @ts-ignore */ }
                            {route.iconProps && <Icon icon={route.iconProps} /> }
                            {route.title}
                            </LinkContent>
                        </Link>
                    )
                })}
            </NavItems>
            <div id="sort-dropdown" />
        </Root>
    );
};

export default Navbar;
