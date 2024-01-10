import { loginUserTypes } from "../../layout/Login";

export const login = async (formData: loginUserTypes) => {
    try {
        const response = await fetch("http://192.168.0.197:8000/api/v1/users/login", {
                    method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        return data;
    } catch (e) {
        throw new Error("Error");
    }
} 