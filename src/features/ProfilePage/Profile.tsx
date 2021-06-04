import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../app/store";
import {getRepoDataTC, RepoType, UserType} from "../../app/profile-reducer";
import styled from "styled-components";
import defaultAvatar from "../../assets/image/avatar.png"
import followersIcon from "../../assets/image/followersIcon.jpg"
import followingIcon from "../../assets/image/followingIcon.png"
import {Paginator} from "../../components/Paginator/Paginator";
import emptyIcon from "../../assets/image/empty.png"

export const Profile = () => {

    const dispatch = useDispatch()

    const {avatar_url, html_url, login, name, followers, following, public_repos}
        = useSelector<RootStateType, UserType>(state => state.profile.user)
    const repo = useSelector<RootStateType, RepoType[]>(state => state.profile.repos)
    const currentPage = useSelector<RootStateType, number>(state => state.profile.currentPage)

    const currentPageData = repo.map((el, i) =>
        <RepoItem key={i + el.name}>
            <a style={{
                textDecoration: "none", color: '#0064EB', fontFamily: 'Inter', fontStyle: 'normal',
                fontWeight: 500, fontSize: '24px', lineHeight: '29px'}}
               href={el.html_url} target="_blank" rel="noreferrer"><div>{el.name}</div>
            </a>{el.description}
        </RepoItem>)

    const followersTrim = followers >= 1000 ? (followers / 1000).toFixed(1) + 'k' : followers
    const followingTrim = following >= 1000 ? (following / 1000).toFixed(1) + 'k' : following

    const onPageChanged = (pageNumber: number) => {dispatch((getRepoDataTC(login, pageNumber)))}

    return (
        <MainBlock>
            <ProfileContainer>
                <InfoBlockWrapper>
                    <InfoBlock>
                        <Avatar>
                            <img style={{width: '280px', height: '280px', borderRadius: '100%'}}
                                 src={avatar_url} alt={defaultAvatar}/>
                        </Avatar>
                        <Desription>
                            <Name>
                                <h2>{name}</h2>
                            </Name>
                            <LoginName>
                                <a href={html_url}
                                   target="_blank"
                                   style={{textDecoration: "none", color: '#0064EB', fontFamily: 'Inter',
                                       fontStyle: 'normal', fontWeight: 'normal', fontSize: '18px', lineHeight: '22px'
                                            }}>{login}
                                </a>
                            </LoginName>
                            <FollowBlock>
                                <FollowItem>
                                    <FollowIcon image={followersIcon}></FollowIcon>
                                    <div>{followersTrim} followers</div>
                                </FollowItem>
                                <FollowItem>
                                    <FollowIcon image={followingIcon}></FollowIcon>
                                    <div>{followingTrim} following</div>
                                </FollowItem>
                            </FollowBlock>
                        </Desription>
                    </InfoBlock>
                </InfoBlockWrapper>
                {repo.length === 0
                    ?   <EmptyWrapper>
                            <EmptyIcon image={emptyIcon}></EmptyIcon>
                            <TextBlock>Repository list is empty</TextBlock>
                        </EmptyWrapper>
                    :
                        <RepoBlock>
                            <div><h3>Repositories ({public_repos})</h3></div>

                            {currentPageData}
                            <Paginator totalItemsCount={public_repos} pageSize={4} currentPage={currentPage}
                                       portionSize={5} onPageChanged={onPageChanged}/>
                        </RepoBlock>}
            </ProfileContainer>
        </MainBlock>
    )
}

//styled-components
const MainBlock = styled.div`
  min-height: 100vh;
  width: 100%
`
const ProfileContainer = styled.div`
  display: flex;
  width:100%;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: 1129px) {
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  };
`
const InfoBlockWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  min-height: 50vh;
`
const InfoBlock = styled.div`
  height: 431.98px;
  width: 400px;
  margin-left: 25px;
`
const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  padding: 50px;
`
const Desription = styled.div`
  margin-left: 10px;
  margin-right: 20px;
`
const Name = styled.div`
  margin: 30px;
  font-family: Inter, serif;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 130%;
`
const LoginName = styled.div`
  margin: 30px;
  font-family: Inter, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  color: #0064EB;
`
const FollowBlock = styled.div`
  margin: 30px;
  display: flex;
  justify-content: space-between;
  font-family: Inter, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 150%;
  color: #000000;
`
const FollowItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
`

type IconFStyledProps = { image: string }
const FollowIcon = styled.div<IconFStyledProps>`
  background-image: url(${props => props.image});
  background-size: cover;
  width: 20px;
  height: 20px;
`
const RepoBlock = styled.div`
  width: 90%;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  @media (max-width: 1129px) {
    margin-top: 50px;
  };
  h3 {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 130%;
  }
`

const RepoItem = styled.div`
  width: 90%;
  min-height: 50px;
  background-color: #fff;
  padding: inherit;
  margin-block: 5px;;
  font-family: Inter, serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`

type SearchIconStyledProps = { image: string }
const EmptyIcon = styled.div<SearchIconStyledProps>`
  background-image: url(${props => props.image});
  background-size: cover;
  width: 86px;
  height: 70px;
  margin: 30px;
`

const EmptyWrapper = styled.div`
  position: absolute;
  right: 20%;
  top: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1130px) {
    top: 90%; 
    right: 30%;
  };
`
const TextBlock = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 140%;
  text-align: center;
  color: #808080
`