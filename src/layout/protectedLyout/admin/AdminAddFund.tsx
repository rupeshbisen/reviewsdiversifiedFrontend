import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts";
import { addFund } from "../../AddFunds";
import { PulseLoader } from "react-spinners";
import { getAllUserFundAdmin } from "../../../service/addFund";
import Model from "../../../components/Model";

export default function AdminAddFund() {

    const [selectedOrder, setSelectedOrder] = useState<addFund>();
    const [modelPopup, setMOdelPopup] = useState<boolean>(false);

    const {
        addFundForAdmin,
        setAddFundForAdmin,
        user,
        pageLevelLoader,
        setPageLevelLoader,
    } = useContext(AuthContext);

    async function extractAddFundForAdmin() {
        setPageLevelLoader(true);
        const res = await getAllUserFundAdmin();

        if (res.success) {
            setPageLevelLoader(false);
            setAddFundForAdmin(
                res.data && res.data.length
                    ? res.data.filter((item: { user: { _id: string; }; }) => item.user._id !== user?._id)
                    : []
            );
        } else {
            setPageLevelLoader(false);
        }
    }

    useEffect(() => {
        if (user !== null) extractAddFundForAdmin();
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

    const onApplyClick = (getItem: addFund) => {
        setMOdelPopup(true);
        setSelectedOrder(getItem);
    }
    const hideModal = () => {
        setMOdelPopup(false);
    }

    return (
        <section>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div>
                    <div className="bg-white md:mx-9 px-4 md:px-8 py-8 rounded-lg">
                        <div className="flow-root">
                            {addFundForAdmin && addFundForAdmin.length ? (
                                <ul className="flex flex-col gap-4">
                                    {addFundForAdmin.map((item) => (
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
                                                            User Phone:
                                                        </p>
                                                        <p className="text-sm  font-semibold text-gray-900">
                                                            {item?.user?.phoneNumber}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <p className="mr-3 text-sm font-medium text-gray-900">
                                                            User City:
                                                        </p>
                                                        <p className="text-sm  font-semibold text-gray-900">
                                                            {item?.user?.city}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <p className="mr-3 text-sm font-medium text-gray-900">
                                                    Transaction Id:
                                                </p>
                                                <p className="text-sm  font-semibold text-gray-900">
                                                    {item?.orderId}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <p className="mr-3 text-sm font-medium text-gray-900">
                                                    Amount:
                                                </p>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    <i className="fa-solid fa-indian-rupee-sign"></i>
                                                    {item.amount}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <p className="mr-3 text-sm font-medium text-gray-900">
                                                    Status:
                                                </p>
                                                <p className="text-sm  font-semibold text-gray-900">
                                                    {item.isProcessing
                                                        ? "Adding Fund in Process"
                                                        : "Fund is added"}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => onApplyClick(item)}
                                                disabled={!item.isProcessing}
                                                className="disabled:opacity-50 py-3 px-8 mt-10 inline-block bg-blue-500 text-white text-lg font-semibold hover:bg-blue-600 uppercase tracking-wide rounded-full"
                                            >
                                                Update Fund
                                            </button>
                                            {modelPopup &&
                                                <Model
                                                    showModal={modelPopup}
                                                    toggle={hideModal}
                                                    selectedOrder={selectedOrder as addFund}
                                                />
                                            }
                                        </li>
                                    ))}
                                </ul>
                            ) : "There is no Fund"
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
