import {FunctionalComponent, h} from 'preact';
import {useCallback, useEffect, useState, useRef} from "preact/compat";
import Pagination from "../../components/Pagination/Pagination";
import styled from "styled-components";
import Dropdown from "../../components/Dropdown/Dropdown";
import GistPreview from "../../components/GistPreview/GistPreview";
import Portal from "../../components/Portal/Portal";
import Loading from "../../components/Loading/Loading";
import {useAsync} from "../../hooks/use-async";
import axios from "axios";

const DEFAULT_PAGE_SIZE = 10;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${(props): string => props.theme.colors.level0};
  padding: 20px 10px;
`;
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ErrorText = styled.span`
  font-size: ${(props): string => props.theme.fontSizes.large};
  color: #FF4040;
`;

enum SortTypes {
   CREATED_AT_ASC = 'CREATED_AT_ASC',
   CREATED_AT_DESC = 'CREATED_AT_DESC',
   UPDATED_AT_ASC = 'UPDATED_AT_ASC',
   UPDATED_AT_DESC = 'UPDATED_AT_DESC',
}
const Explore: FunctionalComponent = () => {

    const [gists, setGists] = useState<GistDto[]>([]);
    const [sortedGists, setSortedGists] = useState<GistDto[]>([]);
    const [inProgress, setInProgress] = useState(false);
    const [error, setError] = useState<unknown>(undefined);
    const [sortBy, setSortBy] = useState(SortTypes.CREATED_AT_DESC);
    const rootRef = useRef<HTMLDivElement>(null);
    const [paging, setPaging] = useState({
        currentPage: 1,
        pageSize: DEFAULT_PAGE_SIZE,
    })

    const fetchGists = useCallback(() => {
        return axios.get(`https://api.github.com/gists/public?page=${paging.currentPage}&per_page=${paging.pageSize}`);
    }, [paging.currentPage, paging.pageSize]);

    useAsync({
        handler: fetchGists,
        onProgress: setInProgress,
        onFailure: setError,
        onSuccess: setGists
    }, [fetchGists])

    const handlePageChange = (pageNumber: number): void => {
        setPaging((prevState => ({
            ...prevState,
            currentPage: pageNumber,
        })))
    }

    const handlePageSizeChange = (pageSize: number): void => {
        setPaging((prevState => ({
            ...prevState,
            pageSize,
            currentPage: 1
        })))
    }

    const handleSortChange = (value: SortTypes): void => {
        setSortBy(value);
    }

    const sortData = useCallback((data: GistDto[], sortByKey: SortTypes) => {
        const sortKey: keyof GistDto = sortByKey.includes('CREATED_AT') ? 'created_at' : 'updated_at';
        const sortDirection = sortByKey.includes('ASC') ? 'ASC' : 'DESC';

        if (sortDirection === 'ASC') {
            // lets spread an array to not mutate the state
            const sorted = [...gists].sort((a, b) => new Date(a[sortKey]).getTime() - new Date(b[sortKey]).getTime());
            setSortedGists(sorted);
        } else {
            // DESC
            // lets spread an array to not mutate the state
            const sorted = [...gists].sort((a, b) => new Date(b[sortKey]).getTime() - new Date(a[sortKey]).getTime());
            setSortedGists(sorted);
        }
        rootRef?.current?.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [gists, setSortedGists])

    useEffect(() => {
        sortData(gists, sortBy)
    }, [gists, sortBy, sortData]);

    return (
        <Root>
            <Portal id="sort-dropdown">
                <Dropdown<SortTypes> data={[
                    {value: SortTypes.CREATED_AT_DESC, label: 'Recently created'},
                    {value: SortTypes.CREATED_AT_ASC, label: 'Last recently created'},
                    {value: SortTypes.UPDATED_AT_DESC, label: 'Recently updated'},
                    {value: SortTypes.UPDATED_AT_ASC, label: 'Last recently updated'},
                ]} value={sortBy} onChange={handleSortChange} />
            </Portal>
            <Content ref={rootRef}>
                {inProgress ? (<Center><Loading /></Center>) : (sortedGists.map(gist => <GistPreview key={gist.id} gist={gist} />))}
                {error && <Center><ErrorText>Unable to load gists</ErrorText></Center>}
            </Content>
            <Pagination
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                currentPage={paging.currentPage}
                pageSize={paging.pageSize}
            />
        </Root>
    );
};


export default Explore;
