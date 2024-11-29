import { Grid } from '@mui/material';
import React from 'react';

export default function RaitingAdmin() {
    return (
        <Grid item xs={12}>
            <div className="w-full mb-5 rounded-xl p-6 bg-gradient-to-br from-gray-50 to-white">
                <div className="overflow-x-auto">
                    <h3 className="mb-5">Админы</h3>
                    <table className="min-w-full border-collapse bg-white lg:rounded-lg shadow-md overflow-hidden">
                        <thead>
                            <tr className="bg-gradient-to-r from-teal-400 via-blue-300 to-cyan-500 text-white">
                                <th className="lg:px-6 lg:py-4 text-left text-[8px] p-1 lg:text-sm font-semibold">
                                    Имя
                                </th>
                                <th className="lg:px-6 lg:py-4 text-left text-[8px] p-1 lg:text-sm font-semibold">
                                    Кол-во заказов
                                </th>
                                <th className="lg:px-6 lg:py-4 text-left text-[8px] p-1 lg:text-sm font-semibold">
                                    Сумма
                                </th>
                                <th className="lg:px-6 lg:py-4 text-left text-[8px] p-1 lg:text-sm font-semibold">
                                    Коэфф
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                {
                                    name: 'Нурлан Нурланов',
                                    buyers: 25,
                                    turnover: '40 000',
                                    ratio: '12.10',
                                },
                                {
                                    name: 'Иван Иванович',
                                    buyers: 30,
                                    turnover: '50 000',
                                    ratio: '15.20',
                                },
                            ].map((row, index) => (
                                <tr
                                    key={index}
                                    className={`border-b ${index % 2 === 0
                                        ? 'bg-gray-100'
                                        : 'bg-gray-50'
                                        } hover:bg-purple-50 transition`}
                                >
                                    <td className="lg:px-6 lg:py-4 p-1 text-[8px] lg:text-sm text-gray-800 font-medium">
                                        {row.name}
                                    </td>
                                    <td className="lg:px-6 lg:py-4 p-1 text-[8px] lg:text-sm text-gray-600">
                                        {row.buyers}
                                    </td>
                                    <td className="lg:px-6 lg:py-4 p-1 text-[8px] lg:text-sm text-gray-600">
                                        {row.turnover}
                                    </td>
                                    <td className="lg:px-6 lg:py-4 p-1 text-[8px] lg:text-sm text-gray-600">
                                        {row.ratio}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Grid>
    );
}