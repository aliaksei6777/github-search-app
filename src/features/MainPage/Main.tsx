import React from "react";
import {useSelector} from "react-redux";
import {RootStateType} from "../../app/store";
import styled from "styled-components";
import searchIcon from "../../assets/image/bigSerachIcon.png"
import notfound from "../../assets/image/notfound.png"


export const Main = () => {
    const appStatus = useSelector<RootStateType, string>((state) => state.app.status)
    return (
        <MainContainer>
            {/*<InfoBlock>*/}
            {appStatus === "idle" &&
            <Wrapper>
                <SearchIcon image={searchIcon}></SearchIcon>
                <TextBlock>Start with searching<br/> a GitHub user</TextBlock>
            </Wrapper>
            }
            {appStatus === "failed" &&
            <Wrapper>
                <SearchIcon image={notfound}></SearchIcon>
                <TextBlock>User not found</TextBlock>
            </Wrapper>
            }

            {/*</InfoBlock>*/}
        </MainContainer>
    )
}


//styled-components

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 62px;
  font-family: Inter, serif;
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  text-align: center;
  color: #808080;
`
export type SearchIconStyledProps = { image: string }
export const SearchIcon = styled.div<SearchIconStyledProps>`
  background-image: url(${props => props.image});
  background-size: cover;
  width: 35px;
  height: 35px;
  margin: 30px;
`

export const Wrapper = styled.div`
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const TextBlock = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 140%;
  text-align: center;
  color: #808080
`