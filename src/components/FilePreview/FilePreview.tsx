import {FunctionalComponent, h} from 'preact';
import {useCallback, useMemo, useState} from "preact/compat";
import axios from "axios";
import {mapToSupportedLang} from "../../utils/language-mapper";
import styled from "styled-components";
import {Icon} from "@rmwc/icon";
import HoverableContainer from "../HoverableContainer/HoverableContainer";
import Loading from "../Loading/Loading";
import SyntaxPreview from "../SyntaxPreview/SyntaxPreview";
import {humanFileSize} from "../../utils/human-filesize";
import {Link} from "../Link/Link";
import {useAsync} from "../../hooks/use-async";

export const ExternalLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-decoration: none;
`;

export const DisabledContainer = styled.div`
  background: white;
  border-radius: 5px;
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
  position: relative;
`;
export const FileContainer = styled.div`
  position: relative;
  max-height: 300px;

  & > pre {
    max-height: inherit;
    overflow: hidden !important;
    margin: 0 !important;
    box-sizing: border-box;
  }
  
  & > pre:hover {
      border: 1px solid ${props => props.theme.colors.brand1} !important;
  }
`;
const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;
const FileInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background: ${props => props.theme.colors.level2};
  padding: 2px 5px;
`;
const FileTitle = styled.span`
  font-size: ${props => props.theme.fontSizes.large};
  color: ${props => props.theme.colors.brand2};

  &:hover {
    color: ${props => props.theme.colors.brand1};
  }
`;
const FileDetails = styled.span`
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.level3};
  margin: 0 5px;
`;
interface Props {
    filename: string;
    type: string;
    language: string;
    rawUrl: string;
    size: number;
}

const FilePreview: FunctionalComponent<Props> = ({filename, language, rawUrl, size}) => {

    const [codeString, setCodeString] = useState('');
    const [inProgress, setInProgress] = useState(false);
    const [error, setError] = useState<unknown>(undefined);
    const [previewDisabled, setPreviewDisabled] = useState(false);

    const getCodeString = useCallback(() => {
        if (codeString.length === 0) {
            if (size > 100000) {// limit of 100kb
                setPreviewDisabled(true);
            } else {
                return axios.get(rawUrl);
            }
        }
    }, [codeString.length, rawUrl, size]);

    useAsync({
        handler: getCodeString,
        onProgress: setInProgress,
        onFailure: setError,
        onSuccess: setCodeString
    }, [getCodeString])


    const previewText = useMemo(() => {
        if (error) {
            return `Preview error occured!`
        } else if (previewDisabled) {
            return 'File is too big! Preview is disabled.';
        }
    }, [previewDisabled, error])

    const humanSize = useMemo(() => {
        return humanFileSize(size, true)
    }, [size]);


    return (
        <Root>
            <FileInfo>
                <Link as={'a'} href={rawUrl} target={"_blank"}><FileTitle>{filename}</FileTitle></Link>
                {language && <FileDetails>Language: {language}</FileDetails> }
                <FileDetails>Size: {humanSize}</FileDetails>
            </FileInfo>
            {previewDisabled ? (
                <FileContainer>
                    <DisabledContainer><span>{previewText}</span>
                        <HoverableContainer hoverContent={
                            <ExternalLink href={rawUrl} target='_blank'>
                                <span>View raw file</span>
                                {/*
                                // @ts-ignore */ }
                                <Icon icon={'link'} />
                            </ExternalLink>
                        } />
                    </DisabledContainer>
                </FileContainer>
            ) : (
                <FileContainer>
                    {inProgress ? (// Request is still in progress, show Loading
                        <DisabledContainer>
                            <Loading />
                        </DisabledContainer>
                    ) : (//File is loaded, show preview boundary
                        <SyntaxPreview language={mapToSupportedLang(language)} codeString={codeString} rawUrl={rawUrl} fileName={filename} />
                    )}
                </FileContainer>
            )}
        </Root>
    )
}

export default FilePreview;