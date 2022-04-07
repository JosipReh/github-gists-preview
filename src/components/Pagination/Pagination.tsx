import {FunctionalComponent, h} from 'preact';
import {DOTS, usePagination} from "../../hooks/use-pagination";
import styled from "styled-components";
import Dropdown from "../Dropdown/Dropdown";
import {Icon} from "@rmwc/icon";
import {themeConfig} from "../../theme";


const PageButton = styled.li<{isDisabled: boolean; active?: boolean}>`
  font-weight: bold;
  background: ${props => props.active ? props.theme.colors.brand1 : props.theme.colors.level0};
  color: ${props => {
      if (props.isDisabled) {
          return props.theme.colors.level2;
      }
      
      if (props.active) {
          return props.theme.colors.level0;
      }
      return props.theme.colors.brand2
}};
  cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
  display: flex;
  margin: 0 2px;
  align-items: center;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.colors.level2};
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;
const PaginationItems = styled.ul`
  display: flex;
  list-style-type: none;
  align-items: center;
  justify-content: center;
  padding: 0px;
  margin: 0;

  ${PageButton} {
    padding: 0px 12px;
    height: 32px;
    text-align: center;
  }
`;
const PaginationInfo = styled.span`
  position: absolute;
  color: ${props => props.theme.colors.brand2};
  font-weight: bold;
  top: -17px;
`;

const Root = styled.div`
  display: flex;
  align-items: center;
  background: ${props => props.theme.colors.level1};
  box-shadow: 0px 0px 5px 0px ${props => props.theme.colors.level3};
  z-index: 10;
  justify-content: center;
  padding: 15px 0 5px;
`;

const PageSizePicker = styled(Dropdown)`
  //flex: 1;
  min-width: 150px;
  
  &  label {
    color: ${props => props.theme.colors.brand2};
    font-weight: bold;
  }
`;

interface Props {
    onPageChange: (pageNumber: number) => void;
    onPageSizeChange: (pageSize: number) => void;
    totalCount?: number;
    siblingCount?: number;
    currentPage: number;
    pageSize: number;
}
const Pagination: FunctionalComponent<Props> = props => {
    const {
        onPageChange,
        onPageSizeChange,
        totalCount = 3000,
        siblingCount = 1,
        currentPage,
        pageSize,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const lastPage = paginationRange[paginationRange.length - 1];


    const onNext = (): void => {
        if (currentPage !== lastPage) {
            onPageChange(currentPage + 1);
        }
    };

    const onPrevious = (): void => {
        if (currentPage !== 1) {
            onPageChange(currentPage - 1);
        }
    };


    return (
        <Root>
            <PaginationContainer>
                <PaginationInfo>{pageSize} items of {totalCount}</PaginationInfo>
            <PaginationItems>
                <PageButton isDisabled={currentPage === 1} onClick={onPrevious}>
                    {/*
                            // @ts-ignore */ }
                    <Icon icon={'arrow_left'} />
                </PageButton>
                {paginationRange.map(pageNumber => {
                    if (pageNumber === DOTS) {
                        return <PageButton isDisabled={true} style={{color: themeConfig.colors.brand2}}>&#8230;</PageButton>;
                    }

                    return (
                        <PageButton key={pageNumber} isDisabled={false} active={pageNumber === currentPage}
                                    onClick={() => onPageChange(pageNumber as number)}>{pageNumber}</PageButton>
                    );
                })}
                <PageButton isDisabled={currentPage === lastPage} onClick={onNext}>
                    {/*
                            // @ts-ignore */ }
                    <Icon icon={'arrow_right'} />
                </PageButton>
            </PaginationItems>
            </PaginationContainer>
            <PageSizePicker data={[
                {value: 10, label: '10'},
                {value: 50, label: '50'},
                {value: 100, label: '100'},
            ]} onChange={onPageSizeChange} value={pageSize} label={'Page size'} />
        </Root>
    );
};

export default Pagination;
