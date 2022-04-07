import {FunctionalComponent, h, VNode} from 'preact';
import {useEffect, createPortal} from "preact/compat";

interface Props {
    id: string;
}
const Portal: FunctionalComponent<Props> = ({children, id}) => {
    const mount = document.getElementById(id);
    const el = document.createElement("div");

    useEffect(() => {
        mount?.appendChild(el);
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        return () => mount?.removeChild(el);
    }, [el, mount]);

    return createPortal(children as VNode, el)
};

export default Portal;