import {FunctionalComponent, h} from 'preact';
import styled from "styled-components";
import FilePreview from "../FilePreview/FilePreview";
import TimeAgo from 'timeago-react';
import { Icon } from '@rmwc/icon';
import {Link} from "../Link/Link";
import {themeConfig} from "../../theme";

const GistContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 20px 10px;
  box-sizing: border-box;
  border-radius: 5px;
  background: ${props => props.theme.colors.level1};
  box-shadow: 0px 0px 5px 0px ${props => props.theme.colors.level3};
`;

const GistDetails = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.brand2};
  
  & span {
    padding-right: 10px;
  }
`;
const AuthorText = styled.span`
  font-size: ${props => props.theme.fontSizes.large};
  color: ${props => props.theme.colors.brand2};
  
  &:hover {
    color: ${props => props.theme.colors.brand1};
  }
`;
const HoverableText = styled.span`
  &:hover {
    color: ${props => props.theme.colors.brand1};
  }
`;
const CreatedAtText = styled.span`
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.level3};
`;
const DescriptionText = styled.div`
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.level3};
  margin: 10px 0 0;
`;

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 5px;
`;
const GistInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 10px;
`;
const GistHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  border-bottom: 1px solid ${props => props.theme.colors.level2};
`;

interface Props {
    gist: GistDto;
}

const GistPreview: FunctionalComponent<Props> = ({gist}) => {
    return (
        <GistContainer>
            <GistHeader>
                <Link as={'a'} target={"_blank"} href={gist.owner.html_url}><Avatar src={gist.owner.avatar_url} /></Link>
                <GistInfo>
                    <Link as={'a'} target={"_blank"} href={gist.owner.html_url}><AuthorText>{gist.owner.login}</AuthorText></Link>
                    <CreatedAtText>
                        <TimeAgo opts={{minInterval: 10}} datetime={gist.created_at} />
                    </CreatedAtText>
                </GistInfo>
            </GistHeader>
            {gist.description && <DescriptionText>{gist.description}</DescriptionText> }
            <GistDetails>
                {/*
                 // @ts-ignore */ }
                <Icon icon={{ icon: 'article', size: 'xsmall' }} /><Link as={'a'} color={themeConfig.colors.brand2} href={gist.html_url} target="_blank"><HoverableText>{Object.keys(gist.files).length} files</HoverableText></Link>
                {/*
                 // @ts-ignore */ }
                <Icon icon={{ icon: 'comment', size: 15 }} /> <span>{gist.comments} comments</span>
            </GistDetails>
            {Object.keys(gist.files).map(fileName => {
                const file = gist.files[fileName];
                return (
                    <FilePreview
                        key={file.raw_url}
                        filename={file.filename}
                        type={file.type}
                        language={file.language}
                        rawUrl={file.raw_url}
                        size={file.size}
                    />
                )
            })}
        </GistContainer>
    )
}

export default GistPreview;