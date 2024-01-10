import { orderTypes } from "../../layout/protectedLyout/Admin";
import { newOrder } from "../../layout/protectedLyout/NewOrder";

export const createNewOrder = async (FormData: newOrder) => {
    try {
        const res = await fetch("http://192.168.0.197:8000/api/v1/users/newOrder", {
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

export const getAllOrdersForUser = async (id: string) => {
    try {
        const res = await fetch(`http://192.168.0.197:8000/api/v1/users/getAllOrdersForUser?id=${id}`, {
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

export const getAllOrdersForAllUsers = async () => {
    try {
        const res = await fetch(`http://192.168.0.197:8000/api/v1/users/getAllOrder`, {
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

export const updateStatusOfOrder = async (FormData: orderTypes) => {
    try {
        const res = await fetch(`http://192.168.0.197:8000/api/v1/users/updateStatus`, {
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