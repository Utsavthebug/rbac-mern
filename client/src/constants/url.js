const app = {
    root:{
        user:'/user',
        auth:'/auth',
        role:'/role',
        feature:'/feature'
    },
}

export const apis = {
    me : `${app.root.user}/me`,
    auth:(type)=>`${app.root.auth}/${type}`,
    role:{
        root:()=> `${app.root.role}`,
        individual:(id)=>`${app.root.role}/${id}`
    },
    user:{
        root:`${app.root.user}`
    },
    feature:{
        root:`${app.root.feature}`,
        individual:(id)=> `${app.root.feature}/${id}`
    }

}

