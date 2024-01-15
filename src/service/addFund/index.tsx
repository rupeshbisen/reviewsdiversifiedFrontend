import { addFund } from "../../layout/AddFunds";

export const createAddFund = async (FormData: addFund) => {
    try {
        const res = await fetch("http://192.168.0.197:8000/api/v1/users/addFund", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(FormData)

        })
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllFundForUser = async (id: string) => {
    try {
        const res = await fetch(`http://192.168.0.197:8000/api/v1/users/getAllFunduser?id=${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getAllUserFundAdmin = async () => {
    try {
        const res = await fetch(`http://192.168.0.197:8000/api/v1/users/getAllUserFundForAdmin`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}


export const updateFund = async (FormData: addFund) => {
    try {
        const res = await fetch(`http://192.168.0.197:8000/api/v1/users/updateFund`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(FormData)
        })
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}


export const getTotalAmount = async (id: string) => {
    try {
        const res = await fetch(`http://192.168.0.197:8000/api/v1/users/getAmountTotal?id=${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error)
    }
}