import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts";
import { PulseLoader } from "react-spinners";
import ComponentLevelLoader from "../../components/loader/ComponentLevelLoader";
import { getAllUserTicketForAllUsers, updateStatusOfTicket } from "../../service/ticket";
import { ticketTypes } from "./Tickets";

interface ExpandedMessage {
    [projectId: number]: boolean;
}

export default function AdminView() {
    const {
        allTicketForAdmin,
        setAllTicketForAdmin,
        user,
        pageLevelLoader,
        setPageLevelLoader,
        componentLevelLoader,
        setComponentLevelLoader,
    } = useContext(AuthContext);
    const [expandedMessage, setExpandedMessage] = useState<ExpandedMessage>({});
    async function extractAllTicketForAdmin() {
        setPageLevelLoader(true);
        const res = await getAllUserTicketForAllUsers();

        if (res.success) {
            setPageLevelLoader(false);
            setAllTicketForAdmin(
                res.data && res.data.length
                    ? res.data.filter((item: { user: { _id: string; }; }) => item.user._id !== user?._id)
                    : []
            );
        } else {
            setPageLevelLoader(false);
        }
    }

    useEffect(() => {
        if (user !== null) extractAllTicketForAdmin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    async function handleUpdateTicketStatus(getItem: ticketTypes) {
        setComponentLevelLoader({ loading: true, id: getItem._id as string });
        const res = await updateStatusOfTicket({
            ...getItem,
            isProcessing: false,
        });

        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" });
            extractAllTicketForAdmin();
        } else {
            setComponentLevelLoader({ loading: false, id: "" });
        }
    }

    if (pageLevelLoader) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <PulseLoader
                    color={"#000000"}
                    loading={pageLevelLoader}
                    size={30}
                    data-testid="loader"
                />
            </div>
        );
    }
    const toggleMessage = (projectId: number): void => {
        setExpandedMessage((prev: ExpandedMessage) => ({
            ...prev,
            [projectId]: !prev[projectId],
        }));
    };

    return (
        <section>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div>
                    <div className="bg-white md:mx-9 px-4 md:px-8 py-8 rounded-lg">
                        <div className="flow-root">
                            {allTicketForAdmin && allTicketForAdmin.length ? (
                                <ul className="flex flex-col gap-4">
                                    {allTicketForAdmin.map((item, index) => (
                                        <li
                                            key={item._id}
                                            className="bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left"
                                        >
                                            <div className="flex flex-col md:flex-row">
                                                <h1 className="font-bold text-lg mb-3 flex-1">
                                                    #order Id: {item._id}
                                                </h1>
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center">
                                                        <p className="mr-3 text-sm font-medium text-gray-900">
                                                            User Name:
                                                        </p>
                                                        <p className="text-sm  font-semibold text-gray-900">
                                                            {item?.user?.username}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <p className="mr-3 text-sm font-medium text-gray-900">
                                                            User Email:
                                                        </p>
                                                        <p className="text-sm  font-semibold text-gray-900">
                                                            {item?.user?.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <p className="mr-3 text-sm font-medium text-gray-900">
                                                    Subject:
                                                </p>
                                                <p className="text-sm  font-semibold text-gray-900">
                                                    {item?.subject}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <p className="mr-3 text-sm font-medium text-gray-900">
                                                    Message:
                                                </p>
                                                {expandedMessage[index] ? (
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {item?.message}
                                                        </p>
                                                        <button
                                                            className="text-fuchsia-600 font-semibold cursor-pointer"
                                                            onClick={() => toggleMessage(index)}
                                                        >
                                                            Less...
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {item?.message.slice(0, 40)}{' '}
                                                            {item?.message.length > 40 && (
                                                                <button
                                                                    className="text-fuchsia-600 font-semibold cursor-pointer"
                                                                    onClick={() => toggleMessage(index)}
                                                                >
                                                                    Read More...
                                                                </button>
                                                            )}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <p className="mr-3 text-sm font-medium text-gray-900">
                                                    Status:
                                                </p>
                                                <p className="text-sm  font-semibold text-gray-900">
                                                    {item.isProcessing
                                                        ? "Ticket in Process"
                                                        : "Ticket is delivered"}
                                                </p>
                                            </div>
                                            <div className="flex gap-5">
                                                <button
                                                    onClick={() => handleUpdateTicketStatus(item)}
                                                    disabled={!item.isProcessing}
                                                    className="disabled:opacity-50 mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                                                >
                                                    {componentLevelLoader &&
                                                        componentLevelLoader.loading &&
                                                        componentLevelLoader.id === item._id ? (
                                                        <ComponentLevelLoader
                                                            text={"Updating Ticket Status"}
                                                            color={"#ffffff"}
                                                            loading={
                                                                componentLevelLoader &&
                                                                componentLevelLoader.loading
                                                            }
                                                        />
                                                    ) : (
                                                        "Update Ticket Status"
                                                    )}
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : "There is no Ticket"
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}