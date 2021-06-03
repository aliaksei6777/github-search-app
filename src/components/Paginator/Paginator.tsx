import React, {useState} from 'react';
import styled from "styled-components";

export const Paginator: React.FC<PropsType> = ({
                                            totalItemsCount,
                                            pageSize,
                                            currentPage,
                                            onPageChanged, portionSize
                                        }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState<number>(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <PaginatorBlock>
        <StyledPaginator>
            {
                portionNumber > 1 && <button style={{ marginRight: "7px"}} onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>&lt;</button>
            }
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <StyledPaginatorItem currentPage={currentPage} p={p}
                                                key={p}
                                                onClick={() => {
                                                    onPageChanged(p)
                                                }}>
                        {p}
                    </StyledPaginatorItem>
                })}
            {
                portionCount > portionNumber && <button style={{
                }} onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>&gt;</button>
            }
        </StyledPaginator>
    </PaginatorBlock>

}


//styled-components

const PaginatorBlock = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const StyledPaginator = styled.div`
  width: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: flex-end;
  button {
    border:none;
    background-color: #E5E5E5;
    &:hover, &:active {
      color: #0064EB;
      cursor: pointer
    }
  }
`
type StyledProps = {
    p: number
    currentPage: number
}
const StyledPaginatorItem = styled.span<StyledProps>`
    padding: 2px;
    text-align: center;
    width: 21px;
    height: 21px;
    margin: 5px;
    border-radius: 3px;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    cursor: pointer;
    background-color: ${props => props.currentPage === props.p ? '#0064EB' : 'none'};
    color: ${props => props.currentPage === props.p ? '#E5E5E5' : 'black'};
`

//types
type PropsType = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    portionSize: number,
    onPageChanged: (p: number) => void,
}
