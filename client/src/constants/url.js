const app = {
    root:{
        user:'/user',
        auth:'/auth',
        role:'/role'
    },
}

export const apis = {
    me : `${app.root.user}/me`,
    auth:(type)=>`${app.root.auth}/${type}`,
    role:{
        root:()=> `${app.root.role}`
    },
    user:{
        root:`${app.root.user}`
    }

}

