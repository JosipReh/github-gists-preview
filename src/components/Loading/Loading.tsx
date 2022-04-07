import {FunctionalComponent, h} from 'preact';
import styled, { keyframes } from "styled-components";

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;
const DotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;
const Dot = styled.div`
  background-color: ${props => props.theme.colors.brand2};
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${props => props.delay};
`;
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const LoadingText = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: ${props => props.theme.colors.brand2};
`;

interface Props {
    text?: string;
}
const Loading: FunctionalComponent<Props> = ({ text = 'Loading' }) => {
    return (
        <LoadingContainer>
            <LoadingText>{text}</LoadingText>
        <DotWrapper>
            <Dot delay="0s" />
            <Dot delay=".1s" />
            <Dot delay=".2s" />
        </DotWrapper>
        </LoadingContainer>
    )
}
export default Loading;