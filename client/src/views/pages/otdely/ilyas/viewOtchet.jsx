import api from 'api/api';
import React, { useEffect, useState } from 'react'
import OtchetList from '../components/otchet/viewOtchet';

export default function ViewOtchetIlyas() {

    const [viewOtchet, setViewOtchet] = useState([])
    const getAllOtchet = async () => {
        try {
            const response = await api.get('/ilyas/otchet/all-data');
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
            <OtchetList datas={viewOtchet} api="ilyas" />
        </div>
    )
}