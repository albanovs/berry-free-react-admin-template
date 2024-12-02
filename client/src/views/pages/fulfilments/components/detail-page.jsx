import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from 'api/api';

const DetailsPage = () => {
    const [data, setData] = useState([])
    const { id } = useParams()

    const fetchDatas = async () => {
        try {
            const response = await api.get(`/fullfilment1-datas-success`)
            setData(response.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchDatas()
    }, [id])

    const selectedData = data.find((elem) => elem._id === id)

    return (
        selectedData ? <div>
            <table className='w-full bg-white lg:text-[10px] text-[3px]'>
                <thead className='bg-gray-600 text-white'>
                    <tr>
                        <th className='border p-1'>дата:</th>
                        <th className='border p-1'>клиент</th>
                        <th className='border p-1'>услуги</th>
                        <th className='border p-1'>Упаковка Цена:</th>
                        <th className='border p-1'>кол ед товара</th>
                        <th className='border p-1 bg-green-700'>Сумма итог:</th>
                        <th className='border p-'>обслуживал</th>
                        <th className='border p-1'>Расходы</th>
                        <th className='border p-1'>100% прибыли</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        selectedData.otchet.map(elem => {
                            if (elem.clients !== '') {
                                return (
                                    <tr key={elem._id} className='border'>
                                        <td className='p-1 border'>{elem.date}</td>
                                        <td className='p-1 border'>{elem.clients}</td>
                                        <td className='w-[200px] border p-1'>{elem.services}</td>
                                        <td className='p-1 border'>{elem.packages}</td>
                                        <td className='p-1 border'>{elem.count_product}</td>
                                        <td className='p-1 border'>{elem.sum_itog}</td>
                                        <td className='p-1 border'>{elem.obslujival}</td>
                                        <td className='p-1 border'>{elem.expenses}</td>
                                        <td className='p-1 border'>{elem.sum_arrived}</td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
            {
                selectedData.itogs && <table className='mt-5 border w-[30%] mx-auto bg-white'>
                    <thead>
                        <tr>
                            <td className='border p-1'>общая сумма расходов:</td>
                            <td className='border p-1'>{selectedData.itogs.all_expenses}</td>
                        </tr>
                        <tr>
                            <td className='border p-1'>общая сумма прибыли:</td>
                            <td className='border p-1'>{selectedData.itogs.itog100}</td>
                        </tr>
                    </thead>
                </table>
            }
        </div> : 'загрузка...'
    );
};

export default DetailsPage;
