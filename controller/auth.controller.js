

export const signUp =(req ,res , next)=>{
    try {
        res.send(" hammasi ok")
    } catch (error) {
        next(error)
    }

}