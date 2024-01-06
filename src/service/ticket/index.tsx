import { ticketTypes } from "../../layout/protectedLyout/Tickets";

export const createTicket = async (FormData: ticketTypes) => {
    try {
        const res = await fetch("http://192.168.0.114:8000/api/v1/users/ticket", {
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