import {useEffect} from "preact/compat";
import {AxiosResponse} from "axios";
import {Inputs} from "preact/hooks";

type OnSuccess<T> = (data: T) => void;
type OnFailure = (error: Error) => void;
type OnProgress = (inProgress: boolean) => void;

type UseAsyncParams<T> = {
    asyncFN: () => Promise<AxiosResponse<T>> | void;
    onSuccess: OnSuccess<T>;
    onFailure: OnFailure;
    onProgress: OnProgress;
}

type UseAsync = <T>(params: UseAsyncParams<T>, deps: Inputs) => void;

export const useAsync: UseAsync = ({
    asyncFN, onSuccess, onFailure, onProgress
}, deps): void => {
    useEffect(() => {
        let isActive = true;

        const handlerResult = asyncFN();

        if (handlerResult instanceof Promise) {
            if (isActive) {
                onProgress(true);
            }

            handlerResult.then(({data}) => {
                if (isActive) {
                    onSuccess(data);
                    onProgress(false);
                }
            }).catch(e => {
                if (isActive)  {
                    onFailure(e);
                    onProgress(false);
                }
            })
        }
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        return () => { isActive = false };
    }, [asyncFN, onFailure, onProgress, onSuccess, ...deps]);
}
