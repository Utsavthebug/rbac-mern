const app = {
    root:{
        user:'/user',
        auth:'/auth'
    }
}

export const userApi = {
    me:`${app.root.user}/me`
}

export const authApi = {
    auth : (type)=> `${app.root.auth}/${type}`
}