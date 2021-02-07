const getTokenHeader = () => {
    const user = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null;
    const token = user ? user.accessToken : null;
    return {"Authorization" : `Bearer ${token}`}
}


export default getTokenHeader