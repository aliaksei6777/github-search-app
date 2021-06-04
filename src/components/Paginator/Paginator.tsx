import React, {useState} from 'react';
import styled from "styled-components";

export const Paginator: React.FC<PropsType> = ({
                                                   totalItemsCount,
                                                   pageSize,
                                                   currentPage,
                                                   onPageChanged, portionSize
                                               }) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portionNumber, setPortionNumber] = useState<number>(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize
    const from = currentPage === 1 ? 1 : (currentPage - 1) * 4 + 1

    return <>
        <PaginatorBlock>
            <Info>
                <span>{from}-{from + 3} of {totalItemsCount} items</span>
            </Info>
            <StyledPaginator>
                {portionNumber > 1 &&
                <button style={{marginRight: "7px"}} onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>&lt;</button>
                }
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                        return <PaginatorItem currentPage={currentPage} p={p}
                                                    key={p}
                                                    onClick={() => {
                                                        onPageChanged(p)
                                                    }}>
                            {p}
                        </PaginatorItem>
                    })}
                {
                    portionCount > portionNumber && <button style={{}} onClick={() => {
                        setPortionNumber(portionNumber + 1)
                    }}>&gt;</button>
                }
            </StyledPaginator>
        </PaginatorBlock>
    </>
}


//styled-components

const Info = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
`
const PaginatorBlock = styled.div`
  width: 90%;
  display: flex;
  //flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
`
const StyledPaginator = styled.div`
  margin: 0px;
  padding: 0px;
  display: flex;
  justify-content: flex-end;

  button {
    border: none;
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
const PaginatorItem = styled.span<StyledProps>`
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
