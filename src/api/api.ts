import axios from "axios";


const instance = axios.create({
    baseURL: `https://api.github.com/users/`,
})

export const api = {
    getUser(name: string) {
        return instance.get(`${name}`)
    },
    getRepo(name: string | undefined, page: number = 1) {
        return instance.get<any>(`${name}/repos?page=${page}&per_page=4`)
    }
}
