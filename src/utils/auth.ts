import {jwtDecode} from "jwt-decode"


interface MyJwtPayload {
    id:string
    email:string
}

export const getUser = () => {
    const token = localStorage.getItem("token")
    if(token){
        try {
            const decodedToken = jwtDecode<MyJwtPayload>(token)
            return {
                id: decodedToken.id,
                email: decodedToken.email

            }
        } catch (error) {
            console.error("invalid Token:", error)
            return null
        }
    }
    return null
}