import React from 'react'
import Simcard from '../components/editTable';
import api from 'api/api';
export default function SimCardLeader() {

    const [simcard, setSimcard] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const url = 'leader/manager'

    const fetchSimCard = async () => {
        try {
            const response = await api.get(`/${url}/data`);
            setSimcard(response.data);
            setLoading(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(true);
        }
    }

    React.useEffect(() => {
        fetchSimCard();
    }, []);

    return (
        <div>
            <h1>Отдел Лидер </h1>
            {
                loading ?
                    (
                        <div className='p-10'>
                            <Simcard
                                datas={simcard}
                                api={url}
                                name='Байер'
                            />
                        </div>
                    ) : <div>Загрузка...</div>
            }
        </div>
    )
}