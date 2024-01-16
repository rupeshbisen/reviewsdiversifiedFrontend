import { ticketTypes } from "../../layout/protectedLyout/Tickets";

export const createTicket = async (FormData: ticketTypes) => {
    try {
        const res = await fetch("https://angry-fashion-elk.cyclic.app/api/v1/users/ticket", {
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

export const getAllTicketForUser = async (id: string) => {
    try {
        const res = await fetch(`https://angry-fashion-elk.cyclic.app/api/v1/users/getAllUserTicket?id=${id}`, {
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

export const getAllUserTicketForAllUsers = async () => {
    try {
        const res = await fetch(`https://angry-fashion-elk.cyclic.app/api/v1/users/getAllTicket`, {
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


export const updateStatusOfTicket = async (FormData: ticketTypes) => {
    try {
        const res = await fetch(`https://angry-fashion-elk.cyclic.app/api/v1/users/updateTicketStatus`, {
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