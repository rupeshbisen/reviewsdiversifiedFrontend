import { registerUserType } from "../../layout/Signup";

export const registerNewUser = async (formData: registerUserType) => {
    try {
        const response = await fetch("https://angry-fashion-elk.cyclic.app/api/v1/users/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const finalData = await response.json();
        return finalData;

    } catch (e) {
        console.log("error", e)
    }
}