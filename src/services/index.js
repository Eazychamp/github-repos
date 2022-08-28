const URL = 'https://api.github.com/search/repositories?q'
// const URL = 'https://developer.github.com/v3/search/'

const PER_PAGE_ITEM = 30

export const fetchProfileData = async ({name = '', sort = '', order ='', page=1, per_page = PER_PAGE_ITEM }) => {
    let res = await  fetch(`${URL}=${name}&sort=${sort}&order=${order}&page=${page}&per_page=${per_page}`)
    let result = await res.json()
    return result
}