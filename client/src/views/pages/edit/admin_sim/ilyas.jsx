import React from 'react'
import Simcard from '../components/editTable';
import api from 'api/api';
export default function SimCardIlyasAdmin
    () {

    const [simcard, setSimcard] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const url = 'ilyas/admin'

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
            <h1>Отдел Ильяс </h1>
            {
                loading ?
                    (
                        <div className=''>
                            <Simcard
                                datas={simcard}
                                api={url}
                                name='помощник админа'
                            />
                        </div>
                    ) : <div>Загрузка...</div>
            }
        </div>
    )
}