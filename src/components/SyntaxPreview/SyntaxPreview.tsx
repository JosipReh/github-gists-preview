import {Component, h, JSX} from "preact";
import HoverableContainer from "../HoverableContainer/HoverableContainer";
import {Icon} from "@rmwc/icon";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {mapToSupportedLang} from "../../utils/language-mapper";
import {vs} from "react-syntax-highlighter/dist/esm/styles/prism";
import {DisabledContainer, ExternalLink, FileContainer} from "../FilePreview/FilePreview";

interface PreviewBoundaryProps {
    language: string;
    codeString: string;
    rawUrl: string;
    fileName: string;
}
/*
    Preview boundary uses componentDidCatch in case of SyntaxHighlighter is unable to parse the file
 */
class SyntaxPreview extends Component<PreviewBoundaryProps, { error: unknown }> {
    state = {
        error: null,
    };

    static getDerivedStateFromError(error: Error): { error: string } {
        return {error: error.message}
    }

    componentDidCatch(error: Error): void {
        console.warn('[SyntaxPreview] - Could not parse given code string!')
        this.setState({error: error.message})
    }

    render(): JSX.Element {
        if (this.state.error) {
            return (
                <DisabledContainer>
                    <span>Unable to preview file!</span>
                    <HoverableContainer hoverContent={
                        <ExternalLink href={this.props.rawUrl} target='_blank'>
                            {/*
                            // @ts-ignore */ }
                            <Icon icon={'link'} /> <span>View raw file</span>
                        </ExternalLink>}
                    />
                </DisabledContainer>
            )
        }
        return (
            <FileContainer style={{position: 'relative'}}>
                <HoverableContainer hoverContent={
                    <ExternalLink href={this.props.rawUrl} target='_blank'>
                        {/*
                            // @ts-ignore */ }
                        <Icon icon={'link'} /> <span>View raw file</span>
                    </ExternalLink>

                }
                />
                <SyntaxHighlighter language={mapToSupportedLang(this.props.language)} style={vs}>
                    {this.props.codeString}
                </SyntaxHighlighter>
            </FileContainer>
        )
    }
}

export default SyntaxPreview