import styled from "styled-components";
import { Link as PLink } from 'preact-router/match';

interface LinkProps {
    color?: string;
    background?: string;
    bold?: boolean;
    fontSize?: number;
    active?: boolean;
    activeColor?: string;
}
export const Link = styled(PLink)<LinkProps>`
  color: ${props => props.color ? props.color : props.theme.colors.level0};
  text-decoration: none;
  ${props => props.bold ? 'font-weight: bold;' : ''}
  ${props => props.fontSize ? `font-size: ${props.fontSize}px;` : `font-size: ${props.theme.fontSizes.medium};`}
  //padding: 10px;
  ${props => {
      if (props.active) {
          if (props.activeColor) {
            return `border-bottom: 3px solid ${props.activeColor};`
          }
          return `border-bottom: 3px solid ${props.theme.colors.level0};`
      }
  }}
`;