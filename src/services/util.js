export const SaveToken = (email) => localStorage.setItem("user_token", email);

export const RetrieveToken = () => localStorage.getItem("user_token");

export const RemoveToken = () => {
    localStorage.removeItem("user_token");
    window.location.reload();
}