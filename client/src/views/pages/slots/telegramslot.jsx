import React, { useEffect, useState } from "react";
import LoadingAnimate from "ui-component/LoadingAnimate";
import axios from "axios";

export default function TelegramSlot() {
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState([]);
    const url = "https://fashion-backend-r8hh.onrender.com";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url + "/test/telegramSlot");
                setResponseData(response.data);
                setLoading(true);
            } catch (error) {
                console.error(error);
                setLoading(true);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <div className="container mx-auto p-4 lg:p-8 bg-white rounded-lg shadow-lg">
                    {/* Легенда */}
                    <div className="flex flex-col gap-2 lg:gap-4">
                        <div className="flex items-center gap-2 lg:gap-4">
                            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-lg bg-green-300"></div>
                            <span className="text-[10px] lg:text-base text-gray-700">
                                - свободные слоты
                            </span>
                        </div>
                        <div className="flex items-center gap-2 lg:gap-4">
                            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-lg bg-red-300"></div>
                            <span className="text-[10px] lg:text-base text-gray-700">
                                - слот недоступен
                            </span>
                        </div>
                        <div className="flex items-center gap-2 lg:gap-4">
                            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-lg bg-yellow-200"></div>
                            <span className="text-[10px] lg:text-base text-gray-700">
                                - слот за счет видео
                            </span>
                        </div>
                    </div>

                    {/* Таблица */}
                    <div className="overflow-x-auto mt-6">
                        <table className="w-full border-collapse border border-gray-300 rounded-md shadow-md">
                            <thead className="bg-gray-100">
                                <tr className="text-[8px] lg:text-base text-gray-700 font-semibold">
                                    <th className="border border-gray-300 p-1 lg:px-4 lg:py-2">Каналы</th>
                                    <th className="border border-gray-300 p-1 lg:px-4 lg:py-2">№</th>
                                    <th className="border border-gray-300 p-1 lg:px-4 lg:py-2">Монако</th>
                                    <th className="border border-gray-300 p-1 lg:px-4 lg:py-2">Лидер</th>
                                    <th className="border border-gray-300 p-1 lg:px-4 lg:py-2">Ильяс</th>
                                    <th className="border border-gray-300 p-1 lg:px-4 lg:py-2">Туран</th>
                                    <th className="border border-gray-300 p-1 lg:px-4 lg:py-2">Liberty</th>
                                </tr>
                            </thead>
                            <tbody className="text-[8px] lg:text-sm">
                                {responseData.map((elem) => (
                                    <tr key={elem._id} className="hover:bg-gray-50">
                                        {elem.num === 1 && (
                                            <th
                                                rowSpan="20"
                                                className="text-blue-500 border border-gray-300 p-1 lg:px-4 lg:py-2"
                                            >
                                                <a
                                                    className="hover:underline"
                                                    href={`https://t.me/${elem.account}`}
                                                >
                                                    {elem.account_ru}
                                                </a>
                                            </th>
                                        )}
                                        <td className="border border-gray-300 p-1 lg:px-4 lg:py-2">{elem.num}</td>
                                        <td
                                            className={`border border-gray-300 p-1 lg:px-4 lg:py-2 ${elem.monako === "слот недоступен"
                                                ? "bg-red-300"
                                                : elem.monako === "доступный слот"
                                                    ? "bg-green-300"
                                                    : elem.monako.includes("видео")
                                                        ? "bg-yellow-200"
                                                        : ""
                                                }`}
                                        >
                                            {elem.monako}
                                        </td>
                                        <td
                                            className={`border border-gray-300 p-1 lg:px-4 lg:py-2 ${elem.lider === "слот недоступен"
                                                ? "bg-red-300"
                                                : elem.lider === "доступный слот"
                                                    ? "bg-green-300"
                                                    : elem.lider.includes("видео")
                                                        ? "bg-yellow-200"
                                                        : ""
                                                }`}
                                        >
                                            {elem.lider}
                                        </td>
                                        <td
                                            className={`border border-gray-300 p-1 lg:px-4 lg:py-2 ${elem.fenix === "слот недоступен"
                                                ? "bg-red-300"
                                                : elem.fenix === "доступный слот"
                                                    ? "bg-green-300"
                                                    : elem.fenix.includes("видео")
                                                        ? "bg-yellow-200"
                                                        : ""
                                                }`}
                                        >
                                            {elem.fenix}
                                        </td>
                                        <td
                                            className={`border border-gray-300 p-1 lg:px-4 lg:py-2 ${elem.turan === "слот недоступен"
                                                ? "bg-red-300"
                                                : elem.turan === "доступный слот"
                                                    ? "bg-green-300"
                                                    : elem.turan.includes("видео")
                                                        ? "bg-yellow-200"
                                                        : ""
                                                }`}
                                        >
                                            {elem.turan}
                                        </td>
                                        <td
                                            className={`border border-gray-300 p-1 lg:px-4 lg:py-2 ${elem.liberty === "слот недоступен"
                                                ? "bg-red-300"
                                                : elem.liberty === "доступный слот"
                                                    ? "bg-green-300"
                                                    : elem.liberty.includes("видео")
                                                        ? "bg-yellow-200"
                                                        : ""
                                                }`}
                                        >
                                            {elem.liberty}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <LoadingAnimate />
            )}
        </>
    );
}