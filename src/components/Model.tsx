import { useContext, useState } from "react";
import { addFund } from "../layout/AddFunds";
import { AuthContext } from "../contexts";
import ComponentLevelLoader from "./loader/ComponentLevelLoader";
import { updateFund } from "../service/addFund";

export interface modelType {
    selectedOrder: addFund;
    showModal: boolean,
    toggle: (arg0: boolean) => void
}
export default function InternshipProgram(props: modelType) {

    const showModal = props.showModal
    const toggle = props.toggle
    const selectedOrder = props.selectedOrder

    const [correctAmount, setCorrectAmount] = useState(Number);

    const { componentLevelLoader, setComponentLevelLoader, } = useContext(AuthContext);


    async function handleUpdateAddFund(getItem: addFund) {
        setComponentLevelLoader({ loading: true, id: getItem._id as string });
        const res = await updateFund({
            ...getItem,
            isProcessing: false,
            amount: correctAmount === 0 ? getItem.amount : correctAmount
        });

        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" });
            toggle(true);
            window.location.reload();
        } else {
            setComponentLevelLoader({ loading: false, id: "" });
        }
    }
    return (
        <>
            {showModal ? (
                <>
                    <div className="popupBack justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-3 max-w-3xl">
                            <div className="rounded-lg shadow-lg relative flex flex-col w-full h-[34rem] md:h-3/4 overflow-scroll md:overflow-hidden bg-gray-900 outline-none p-6">

                                <div className="flex justify-end">
                                    <span className="cursor-pointer text-white ml-3" onClick={() => toggle(true)}>&#10005;</span>
                                </div>
                                <div className="bg-white md:mx-9 px-4 md:px-8 py-8 rounded-lg">
                                    <div className="flow-root">
                                        <ul className="flex flex-col gap-4">
                                            <h1 className="font-bold text-lg mb-3 flex-1">
                                                #order Id: {selectedOrder.orderId}
                                            </h1>
                                            <li className="bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left">
                                                <div className="flex flex-col md:flex-row">
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex items-center">
                                                            <p className="mr-3 text-sm font-medium text-gray-900">
                                                                User Name:
                                                            </p>
                                                            <p className="text-sm  font-semibold text-gray-900">
                                                                {selectedOrder?.user?.username}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <p className="mr-3 text-sm font-medium text-gray-900">
                                                                User Email:
                                                            </p>
                                                            <p className="text-sm  font-semibold text-gray-900">
                                                                {selectedOrder?.user?.email}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <p className="mr-3 text-sm font-medium text-gray-900">
                                                                User Phone:
                                                            </p>
                                                            <p className="text-sm  font-semibold text-gray-900">
                                                                {selectedOrder?.user?.phoneNumber}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <p className="mr-3 text-sm font-medium text-gray-900">
                                                                User City:
                                                            </p>
                                                            <p className="text-sm  font-semibold text-gray-900">
                                                                {selectedOrder?.user?.city}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <p className="mr-3 text-sm font-medium text-gray-900">
                                                        Id:
                                                    </p>
                                                    <p className="text-sm  font-semibold text-gray-900">
                                                        {selectedOrder?._id}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <p className="mr-3 text-sm font-medium text-gray-900">
                                                        Amount:
                                                    </p>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        <i className="fa-solid fa-indian-rupee-sign"></i>
                                                        <input type="number"
                                                            disabled={!selectedOrder.isProcessing}
                                                            value={selectedOrder._id ? correctAmount === 0 ? selectedOrder?.amount : correctAmount : ''}
                                                            onChange={(e) => setCorrectAmount(parseInt(e.target.value))}
                                                        />
                                                    </p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <p className="mr-3 text-sm font-medium text-gray-900">
                                                        Status:
                                                    </p>
                                                    <p className="text-sm  font-semibold text-gray-900">
                                                        {selectedOrder.isProcessing
                                                            ? "Adding Fund in Process"
                                                            : "Fund is added"}
                                                    </p>
                                                </div>
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => handleUpdateAddFund(selectedOrder)}
                                                        disabled={!selectedOrder.isProcessing}
                                                        className="disabled:opacity-50 mt-5 mr-5 bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                                                    >
                                                        {componentLevelLoader &&
                                                            componentLevelLoader.loading &&
                                                            componentLevelLoader.id === selectedOrder._id ? (
                                                            <ComponentLevelLoader
                                                                text={"Updating Fund status"}
                                                                color={"#ffffff"}
                                                                loading={
                                                                    componentLevelLoader &&
                                                                    componentLevelLoader.loading
                                                                }
                                                            />
                                                        ) : (
                                                            "Update Fund Status"
                                                        )}
                                                    </button>
                                                </div>
                                            </li>
                                        </ul>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}