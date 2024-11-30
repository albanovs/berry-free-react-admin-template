import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import LoadingAnimate from "ui-component/LoadingAnimate";

export default function OtchetList({ datas, api }) {

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const currentMonthValue = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;

    const [selectedMonth, setSelectedMonth] = useState(currentMonthValue);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        if (datas.length > 0) {
            setLoading(false);
        }
    }, [datas]); // Set loading to false when data is available

    const sortedData = Array.isArray(datas) ? datas
        .map((elem) => {
            return {
                ...elem,
                dateObject: new Date(elem.date.split('.').reverse().join('-')),
            };
        })
        .sort((a, b) => a.dateObject - b.dateObject) : [];

    const groupedData = sortedData.reduce((acc, elem) => {
        const [day, month, year] = elem.date.split('.');
        const key = `${year}-${month}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(elem);
        return acc;
    }, {});

    const uniqueYears = Array.from(new Set(datas.map(elem => elem.date.split('.')[2])));

    const renderMonthName = (month, year) => {
        const months = [
            'январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль',
            'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
        ];
        return `Отчет за ${months[parseInt(month) - 1]} ${year}`;
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="bg-white border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                    >
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i} value={String(i + 1).padStart(2, '0')}>{renderMonthName(String(i + 1).padStart(2, '0'), selectedYear)}</option>
                        ))}
                    </select>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="bg-white border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                    >
                        {uniqueYears.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <NavLink to={`/${api}-list-search`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer hover:scale-110 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                </NavLink>
            </div>

            {loading ? (
                <div className="text-center"><LoadingAnimate /></div>
            ) : Object.entries(groupedData).length ? (
                Object.entries(groupedData).map(([key, data]) => {
                    const [year, month] = key.split('-');
                    if (selectedMonth === month && selectedYear.toString() === year) {
                        return (
                            <div key={key} className="bg-white rounded-lg shadow-md p-4 mb-6">
                                <h2 className="text-2xl text-center font-bold mb-4">
                                    {renderMonthName(month, year)}
                                </h2>
                                <table className="table-auto w-full text-sm text-center">
                                    <thead>
                                        <tr className="border-b bg-gray-100">
                                            <th className="py-2">дата</th>
                                            <th className="py-2">Комиссия</th>
                                            <th className="py-2">индекс</th>
                                            <th className="py-2">детали</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {data.length ? data.map((elem) => {
                                            return (
                                                <tr key={elem._id} className="hover:bg-gray-100 cursor-pointer">
                                                    <td className="p-2">{elem.date}</td>
                                                    <td className="p-2">{elem.itog.map(item => item.allItog)}</td>
                                                    <td className="p-2">{elem.itog.map(item => item.allItogIndex)}</td>
                                                    <td className="p-2">
                                                        <NavLink
                                                            to={`/detail-list-${api}/${elem._id}`}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            Узнать больше
                                                        </NavLink>
                                                    </td>
                                                </tr>
                                            )
                                        }) : <tr><td colSpan="4" className="py-2 text-center">Нет данных</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        );
                    }
                })
            ) : (
                <div className="text-center">Нет данных</div>
            )}
        </div>
    );
}