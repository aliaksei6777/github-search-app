import {
    InitialProfileStateType,
    profileReducer,
    RepoType,
    setCurrentPage, setRepoData,
    setUserData,
    UserType
} from "./profile-reducer";


let startState: InitialProfileStateType

beforeEach(() => {
    startState = {
        user: {} as UserType,
        repos: [] as RepoType[],
        currentPage: 1
    }
});

test('correct user should be set', () => {
    const newUser = {
        avatar_url: "test_url",
        html_url: "html_url",
        login: "Alex123",
        name: "Alexey",
        followers:  10,
        following:  20,
        public_repos: 5
    }
    const endState = profileReducer(startState, setUserData(newUser))

    expect(endState.user.name).toBe("Alexey");
    expect(endState.user.followers).toBe(10);
    expect(endState.user.avatar_url).toBe("test_url");
});

test('correct repository should be set', () => {
    const newRepo = [
        {name: "TestRepo1", description: "This is test repo1", html_url: "url"},
        {name: "TestRepo2", description: "This is test repo2", html_url: "url2"},
        {name: "TestRepo3", description: "This is test repo3", html_url: "url3"}
    ]
    const endState = profileReducer(startState, setRepoData(newRepo))

    expect(endState.repos.length).toBe(3);
    expect(endState.repos[0].name).toBe("TestRepo1");
    expect(endState.repos[2].html_url).toBe("url3");
});

test('correct status should be set', () => {

    const endState = profileReducer(startState, setCurrentPage(7))

    expect(endState.currentPage).toBe(7);
});