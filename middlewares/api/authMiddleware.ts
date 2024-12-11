const validate = (token:any) => {
    // nhan vao token 
    const validToken = true;
    if(!validToken || !token){
        return false;
    }
    return true;
}

export function authMiddleware(rea:Request){
    const token = rea.headers.get("Authorization")?.split(" ")[1];
    //token is bearar fjkdsjalfs, so we neet to be change it become a array, by split("") and get value at [1]

    return {isValid: validate(token)}

}