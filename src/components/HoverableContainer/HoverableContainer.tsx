import {FunctionalComponent, h, JSX} from 'preact';
import {useState} from "preact/compat";
import styled from "styled-components";

const Root = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  
  &:hover {
    border: 1px solid ${props => props.theme.colors.brand1};
  }
`;
const HoverContent = styled.div`
`;

interface Props {
    hoverContent: JSX.Element;
    onClick?: () => void;
    onMouseLeave?: () => void;
    onMouseEnter?: () => void;
}
const HoverableContainer: FunctionalComponent<Props> = ({ children, hoverContent, onClick, onMouseEnter, onMouseLeave }) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
        onMouseEnter && onMouseEnter();
    }
    const handleMouseLeave = () => {
        setIsHovered(false);
        onMouseLeave && onMouseLeave();
    }
    const handleClick = () => {
        onClick && onClick();
    }
    return (
        <Root onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {children}
            {isHovered && <HoverContent>{hoverContent}</HoverContent> }
        </Root>
    )
}

export default HoverableContainer;