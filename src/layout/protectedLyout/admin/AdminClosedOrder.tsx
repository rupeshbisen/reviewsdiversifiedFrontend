import { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts";
import { PulseLoader } from "react-spinners";
import { orderTypes } from "./AdminNewOrder";
import { getAllOrdersForAllUsers } from "../../../service/order";

export default function AdminClosedOrder() {

    const {
        closedAllOrdersForAdmin,
        setAllNewOrdersForAdmin,
        setClosedAllOrdersForAdmin,
        user,
        pageLevelLoader,
        setPageLevelLoader,
    } = useContext(AuthContext);

    async function extractAllOrdersForAllUsers() {
        setPageLevelLoader(true);
        const res = await getAllOrdersForAllUsers();

        if (res.success) {
            setPageLevelLoader(false);

            const processingData: orderTypes[] = [];
            const closedData: orderTypes[] = [];

            res.data.forEach((item: orderTypes) => {
                if (item.isProcessing) {
                    processingData.push(item);
                } else {
                    closedData.push(item);
                }
            });

            setAllNewOrdersForAdmin(
                processingData.filter((item) => item.user._id !== user?._id)
            );

            setClosedAllOrdersForAdmin(
                closedData.filter((item) => item.user._id !== user?._id)
            );
        } else {
            setPageLevelLoader(false);
        }
    }

    useEffect(() => {
        if (user !== null) extractAllOrdersForAllUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);


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

    return (
        <section>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div>
                    <div className="bg-white md:mx-9 px-4 md:px-8 py-8 pt-5 rounded-lg">
                        <div className="flow-root">
                            {closedAllOrdersForAdmin && closedAllOrdersForAdmin.length ? (
                                <ul className="flex flex-col gap-4">
                                    {closedAllOrdersForAdmin.map((item) => (
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
                                                    <div className="flex items-center">
                                                        <p className="mr-3 text-sm font-medium text-gray-900">
                                                            Total Paid Amount:
                                                        </p>
                                                        <p className="text-sm  font-semibold text-gray-900">
                                                            <i className="fa-solid fa-indian-rupee-sign"></i>{item?.charges}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <p className="mr-3 text-sm font-medium text-gray-900">
                                                    Link:
                                                </p>
                                                <p className="text-sm  font-semibold text-gray-900">
                                                    {item?.link}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <p className="mr-3 text-sm font-medium text-gray-900">
                                                    Service:
                                                </p>
                                                <p className="text-sm  font-semibold text-gray-900">
                                                    {item?.service}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <p className="mr-3 text-sm font-medium text-gray-900">
                                                    Quantity:
                                                </p>
                                                <p className="text-sm  font-semibold text-gray-900">
                                                    {item?.quantity}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <p className="mr-3 text-sm font-medium text-gray-900">
                                                    Status:
                                                </p>
                                                <p className="text-sm  font-semibold text-gray-900">
                                                    {item.isProcessing
                                                        ? "Order in Process"
                                                        : "Order is delivered"}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : "There is no order"
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
