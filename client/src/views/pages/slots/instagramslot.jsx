import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingAnimate from 'ui-component/LoadingAnimate';

export default function InstagraSlot() {
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState([]);
    const url = 'https://fashion-backend-r8hh.onrender.com';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url + '/test/mymodels');
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
                <div className="overflow-x-auto w-full bg-white rounded-lg p-6">
                    <table className="w-full border-collapse lg:rounded-lg overflow-hidden shadow-md bg-white">
                        <thead className="bg-gradient-to-r from-blue-600 to-teal-400 text-white">
                            <tr>
                                <th className="lg:px-6 lg:py-3 p-1 text-left text-[9px] lg:text-sm font-semibold">
                                    Аккаунты
                                </th>
                                <th className="lg:px-6 lg:py-3 p-1 text-center text-[9px] lg:text-sm font-semibold">
                                    Лидер
                                </th>
                                <th className="lg:px-6 lg:py-3 p-1 text-center text-[9px] lg:text-sm font-semibold">
                                    Монако
                                </th>
                                <th className="lg:px-6 lg:py-3 p-1 text-center text-[9px] lg:text-sm font-semibold">
                                    Ильяс
                                </th>
                                <th className="lg:px-6 lg:py-3 p-1 text-center text-[9px] lg:text-sm font-semibold">
                                    Туран
                                </th>
                                <th className="lg:px-6 lg:py-3 p-1 text-center text-[9px] lg:text-sm font-semibold">
                                    Liberty
                                </th>
                            </tr>
                        </thead>
                        <tbody className='lg:text-sm text-[9px]'>
                            {responseData.map((elem, index) => (
                                <tr
                                    key={index}
                                    className={`transition ${index % 2 === 0
                                        ? 'bg-gray-50 hover:bg-gray-100'
                                        : 'bg-white hover:bg-gray-50'
                                        }`}
                                >
                                    <td className="border lg:px-6 lg:py-4 p-2 text-blue-500 cursor-pointer hover:underline">
                                        <a
                                            href={`https://instagram.com/${elem.account}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {elem.account}
                                        </a>
                                    </td>
                                    <td className="border lg:px-6 lg:py-4 p-2 text-center">
                                        {elem.monako}
                                    </td>
                                    <td className="border lg:px-6 lg:py-4 p-2 text-center">
                                        {elem.lider}
                                    </td>
                                    <td className="border lg:px-6 lg:py-4 p-2 text-center">
                                        {elem.fenix}
                                    </td>
                                    <td className="border lg:px-6 lg:py-4 p-2 text-center">
                                        {elem.turan}
                                    </td>
                                    <td className="border lg:px-6 lg:py-4 p-2 text-center">
                                        {elem.liberty}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : <LoadingAnimate />
            }
        </>
    );
}