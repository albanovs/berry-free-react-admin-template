import api from 'api/api';
import React, { useEffect, useState } from 'react'
import OtchetList from '../components/otchet/viewOtchet';

export default function ViewOtchetLiberty() {

    const [viewOtchet, setViewOtchet] = useState([])
    const getAllOtchet = async () => {
        try {
            const response = await api.get('/liberty/otchet/all-data');
            setViewOtchet(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllOtchet()
    }, [viewOtchet])

    return (
        <div>
            <OtchetList datas={viewOtchet} api="liberty" />
        </div>
    )
}