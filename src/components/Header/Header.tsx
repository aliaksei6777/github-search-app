import {FC} from "react"
import {NavLink} from "react-router-dom"
import styled from "styled-components";
import gitIcon from "../../assets/image/gitIcon.png"
import searchIcon from "../../assets/image/searchIcon.png"
import {useDispatch, useSelector} from "react-redux";
import {setAppStatus} from "../../app/app-reducer";
import {RootStateType} from "../../app/store";
import ProgressBar from "../ProgressBar/ProgressBar";


type PropsType = {
    callback: () => void
    inputValue: string
    onChangeInput: (value: any) => void
}

export const Header: FC<PropsType> = ({callback,onChangeInput,inputValue}) => {
    const dispatch = useDispatch()
    const appStatus = useSelector<RootStateType, string>((state) => state.app.status)

    const setStatus = () => {
        dispatch(setAppStatus('idle'))
    }
    return <>
        <HeaderContainer>
            <Nav>
                <NavLink to={'/'} onClick={setStatus}>
                    <Icon image={gitIcon}></Icon>
                </NavLink>
                <InputStyled>
                    <SearchIcon image={searchIcon}>
                    </SearchIcon>
                    <input value={inputValue}
                           type={"text"}
                           onChange={(e) => onChangeInput(e.currentTarget.value)}
                           placeholder={"Enter GitHub username"}
                           onKeyPress={(e) => {if(e.key === "Enter"){callback()}}}
                    />
                </InputStyled>
            </Nav>
        </HeaderContainer>
        <ProgressBarStyled>
            {appStatus === 'loading' ? <ProgressBar/> : null}
        </ProgressBarStyled>
    </>
}


//styled-components
const InputStyled = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 40%;
  height: 40px;
  left: 104px;
  top: 16px;
  border-radius: 6px;
  background-color: white;
  @media (max-width: 440px) {
    width: 60%;
  };

  input {
    border: none;
    outline: none;
    position: static;
    height: 24px;
    left: 6.36%;
    right: 39.41%;
    top: calc(50% - 24px/2);
    width: 80%;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
    color: #000000;
    
    
  }
`
const HeaderContainer = styled.div`
  height: 80px;
  background: #0064EB;
  display: flex;
  align-items: center;
`
const Nav = styled.div`
  margin-left: 20px;
  width: 150px;
  display: flex;
  justify-content: space-between;
`
type SearchIconStyledProps = {image: string}
const SearchIcon = styled.div<SearchIconStyledProps>`
  background-image: url(${props => props.image});
  background-size: auto;
  width: 14px;
  height: 14px;
`
type IconStyledProps = {image: string}
const Icon = styled.div<IconStyledProps>`
  position: absolute;
  width: 41.02px;
  height: 40px;
  left: 41px;
  top: 16px;
  background-image: url(${props => props.image});
  background-size: auto;
`

const ProgressBarStyled = styled.div`
  height: 6px;
`