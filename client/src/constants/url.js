const app = {
    root:{
        user:'/user',
        auth:'/auth'
    }
}

export const apis = {
    me : `${app.root.user}/me`,
    auth:(type)=>`${app.root.auth}/${type}`
}

