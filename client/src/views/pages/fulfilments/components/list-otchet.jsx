import React from 'react'
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import api from 'api/api';

export default function ListOtchetfull({ link }) {

    const [data, setData] = useState([])

    const fetchDatas = async () => {
        try {
            const response = await api.get(`/fullfilment${link}-datas-success`)
            setData(response.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchDatas()
    }, [link])

    return (
        <div>
            {
                data.length ?
                    <table className='lg:table w-full text-[10px] lg:text-[16px]'>
                        <thead>
                            <tr>
                                <td>дата создания</td>
                                <td>детали</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(elem => {
                                    return (
                                        <tr className='border'>
                                            <td className='p-1'>{elem.date}</td>
                                            <td className='p-1'>
                                                <NavLink to={`/detail-fulfilment-otchet-${link}/${elem._id}`} className='underline text-blue-600'>
                                                    Узнать больше
                                                </NavLink>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    : 'загрузка...'
            }
        </div>
    )
}
