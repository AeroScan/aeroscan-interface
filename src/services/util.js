export const SaveToken = () => {
    localStorage.setItem("user_token", "token1234");

    // `${token}`
}

export const RetrieveToken = () => localStorage.getItem("user_token");