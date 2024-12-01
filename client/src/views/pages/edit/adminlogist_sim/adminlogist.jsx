import React, { useEffect, useState } from "react";
import photos from '../components/photos.svg'
import fetchApi from "api/api";
import LoadingAnimate from "ui-component/LoadingAnimate";

export default function SimcardLogistAndAdmin() {

    const [datas, setDatas] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetchApi.get('/adminlogist');
            setDatas(response.data);
            setLoading(true);
            setNode(true);
            const initialInputValues = {};
            response.data.forEach(elem => {
                initialInputValues[elem._id] = {
                    curator: elem.curator
                }
            })
            response.data.forEach(elem => {
                elem.slot.forEach(slot => {
                    initialInputValues[slot._id] = {
                        number: slot.number || "",
                        status: slot.status || "",
                        logist: slot.logist || "",
                        personal_number: slot.personal_number || "",
                        date_of_verification: slot.date_of_verification || "",
                        days_since_verification: slot.days_since_verification || "",
                        status_simCard: slot.status_simCard || "",
                        physical_simCard: slot.physical_simCard || "",
                        registration: slot.registration || "",
                        WAcod: slot.WAcod || "",
                        TGcod: slot.TGcod || "",
                    };
                });
            });
            setInputValues(initialInputValues);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [inputValues, setInputValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [curator, setCurator] = useState("");
    const [node, setNode] = useState(true);

    const sumSimWithNumber = datas.reduce((count, elem) => {
        const slotCount = elem.slot.reduce((acc, slot) => {
            if (slot.number !== '') {
                return acc + 1;
            }
            return acc;
        }, 0);
        return count + slotCount;
    }, 0);

    const sumSimWithStatus = datas.reduce((count, elem) => {
        const slotCount = elem.slot.reduce((acc, slot) => {
            if (slot.status === '1' && slot.number !== '') {
                return acc + 1;
            }
            return acc;
        }, 0);
        return count + slotCount;
    }, 0);

    const handleSubmitAll = async () => {
        setNode(false)
        try {
            const updatedDataPromises = datas.flatMap(item =>
                item.slot.map(elem => {
                    const updateData = {
                        number: inputValues[elem._id]?.number === '' ? '' : inputValues[elem._id]?.number || elem.number,
                        status: inputValues[elem._id]?.status === '' ? '' : inputValues[elem._id]?.status || elem.status,
                        logist: inputValues[elem._id]?.logist === '' ? '' : inputValues[elem._id]?.logist || elem.logist,
                        personal_number: inputValues[elem._id]?.personal_number === '' ? '' : inputValues[elem._id]?.personal_number || elem.personal_number,
                        date_of_verification: inputValues[elem._id]?.date_of_verification === '' ? '' : inputValues[elem._id]?.date_of_verification || elem.date_of_verification,
                        days_since_verification: inputValues[elem._id]?.days_since_verification === '' ? '' : inputValues[elem._id]?.days_since_verification || elem.days_since_verification,
                        status_simCard: inputValues[elem._id]?.status_simCard === '' ? '' : inputValues[elem._id]?.status_simCard || elem.status_simCard,
                        physical_simCard: inputValues[elem._id]?.physical_simCard === '' ? '' : inputValues[elem._id]?.physical_simCard || elem.physical_simCard,
                        registration: inputValues[elem._id]?.registration === '' ? '' : inputValues[elem._id]?.registration || elem.registration,
                        WAcod: inputValues[elem._id]?.WAcod === '' ? '' : inputValues[elem._id]?.WAcod || elem.WAcod,
                        TGcod: inputValues[elem._id]?.TGcod === '' ? '' : inputValues[elem._id]?.TGcod || elem.TGcod,
                    };
                    return fetchApi.patch(`/adminlogist/` + elem._id, updateData);
                })
            );

            await Promise.all(updatedDataPromises);

            const updatedInputValues = { ...inputValues };
            datas.forEach(item => {
                item.slot.forEach(elem => {
                    updatedInputValues[elem._id] = {
                        number: inputValues[elem._id]?.number || elem.number,
                        status: inputValues[elem._id]?.status || elem.status,
                        logist: inputValues[elem._id]?.logist || elem.logist,
                        personal_number: inputValues[elem._id]?.personal_number || elem.personal_number,
                        date_of_verification: inputValues[elem._id]?.date_of_verification || elem.date_of_verification,
                        days_since_verification: inputValues[elem._id]?.days_since_verification || elem.days_since_verification,
                        status_simCard: inputValues[elem._id]?.status_simCard || elem.status_simCard,
                        physical_simCard: inputValues[elem._id]?.physical_simCard || elem.physical_simCard,
                        registration: inputValues[elem._id]?.registration || elem.registration,
                        WAcod: inputValues[elem._id]?.WAcod || elem.WAcod,
                        TGcod: inputValues[elem._id]?.TGcod || elem.TGcod,
                    }
                })
            })
            setInputValues(updatedInputValues)
            fetchData()
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    // const deleteDocument = async (id) => {
    //     try {
    //         await axios.delete(`${url}/test/logist-deletedocument/${id}`)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addSlots = async (id) => {
        try {
            await fetchApi.post(`/adminlogist/slots`, { id });
            fetchData()
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };



    const handleInputChangeDate = async (event, elemId, field) => {

        const rawDate = event.target.value;
        const formattedDate = formatDate(rawDate);

        const today = new Date();
        const selectedDate = new Date(rawDate);
        const timeDiff = today.getTime() - selectedDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        setInputValues(prevState => ({
            ...prevState,
            [elemId]: {
                ...prevState[elemId],
                [field]: formattedDate,
                days_since_verification: daysDiff.toString(),
            },
        }));

        try {
            await fetchApi.patch(`/update/adminlogistdate`, {
                itemId: elemId,
                field: field,
                value: formattedDate,
                days_since_verification: daysDiff.toString(),
            });
        } catch (error) {
            console.error(error);
        }
    };


    function formatDate(rawDate) {
        if (!rawDate) {
            return '';
        }

        const dateObject = new Date(rawDate);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        const updateDaysSinceVerification = async () => {
            try {
                const today = new Date();
                for (const elem of datas) {
                    for (const slot of elem.slot) {
                        const selectedDate = new Date(slot.date_of_verification);
                        const timeDiff = today.getTime() - selectedDate.getTime();
                        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

                        setInputValues(prevState => ({
                            ...prevState,
                            [slot._id]: {
                                ...prevState[slot._id],
                                days_since_verification: daysDiff.toString(),
                            },
                        }));

                        await fetchApi.patch(`/update/adminlogistdate`, {
                            itemId: slot._id,
                            field: 'days_since_verification',
                            value: slot.date_of_verification,
                            days_since_verification: daysDiff.toString(),
                        });
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        updateDaysSinceVerification();
    }, []);


    return (
        <>
            <table className="table-auto w-full border-collapse bg-white rounded-lg">
                <thead className="bg-gray-400 text-white">
                    <tr>
                        <th className="lg:py-2 lg:px-4 py-2 px-3 border text-sm font-medium">Общая сим-карта</th>
                        <th className="lg:py-2 lg:px-4 py-2 px-3 border text-sm font-medium">Свободные сим-карты</th>
                        <th className="lg:py-2 lg:px-4 py-2 px-3 border text-sm font-medium">Использованные сим-карты</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-100">
                        <td className="lg:py-2 lg:px-4 py-2 px-3 border text-sm text-gray-700">{sumSimWithNumber}</td>
                        <td className="lg:py-2 lg:px-4 py-2 px-3 border text-sm text-gray-700">{sumSimWithStatus}</td>
                        <td className="lg:py-2 lg:px-4 py-2 px-3 border text-sm text-gray-700">{sumSimWithNumber - sumSimWithStatus}</td>
                    </tr>
                </tbody>
            </table>

            {
                loading ? (datas.map((elem, index) => (
                    <div key={elem._id} className="mt-10">
                        {showModal && (
                            <div className="fixed z-10 inset-0 overflow-y-auto">
                                <div className="flex items-center justify-center min-h-screen">
                                    <div onClick={closeModal} className="fixed inset-0 bg-black/30 opacity-50"></div>
                                    <div className="relative bg-white rounded-lg p-8">
                                        <p className="text-lg mb-4">{`Вы действительно хотите удалить менеджера ${elem.curator}?`}</p>
                                        <div className="flex justify-center">
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2"
                                            // onClick={() => deleteDocument(elem._id)}
                                            >
                                                Да
                                            </button>
                                            <button
                                                onClick={closeModal}
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                                            >
                                                Нет
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <table className='min-w-full bg-white text-center border border-collapse'>
                            <thead className='lg:text-[12px] text-[4px] bg-purple-500 text-white'>
                                <tr>
                                    <th className='lg:py-1 lg:px-2 border' rowSpan="2">№</th>
                                    <th className='lg:py-1 lg:px-2 border'>{elem.select}</th>
                                    <th className='lg:py-1 lg:px-2 border' colSpan="10">
                                        {elem.team} -
                                        {elem.select === 'admin' ? " админы" : " логисты"}
                                    </th>
                                </tr>
                                <tr>
                                    <th className='lg:py-1 lg:px-2 border'>Номер</th>
                                    <th className='lg:py-1 lg:px-2 border'>Статус</th>
                                    <th className='lg:py-1 lg:px-2 border'>{elem.select === 'admin' ? " админы" : " логисты"}</th>
                                    <th className='lg:py-1 lg:px-2 border'>Личный номер</th>
                                    <th className='lg:py-1 lg:px-2 border'>Дата проверки</th>
                                    <th className='lg:py-1 lg:px-2 border'>Дней с проверки</th>
                                    <th className='lg:py-1 lg:px-2 border'>Состояние сим карты</th>
                                    <th className='lg:py-1 lg:px-2 border'>Физическая сим карта</th>
                                    <th className='lg:py-1 lg:px-2 border'>Рег</th>
                                    <th className='lg:py-1 lg:px-2 border'>WA код</th>
                                    <th className='lg:py-1 lg:px-2 border'>TG 2FA</th>
                                </tr>
                            </thead>
                            {
                                elem.slot.map((item, index) => {
                                    const isOdd = index % 2 === 1;

                                    return (
                                        <tbody key={item._id} className={isOdd ? "bg-gray-100 text-[4px] lg:text-[10px]" : "text-[4px] lg:text-[10px]"}>
                                            <tr>
                                                <th className='border lg:py-1 lg:px-3' onClick={async () => {
                                                    try {
                                                        await fetchApi.delete(`/test/adminlogist/${item._id}`);
                                                        window.location.reload()
                                                    } catch (error) {
                                                        console.error("Ошибка при удалении слота:", error);
                                                    }
                                                }}>
                                                    <img className="w-[20px] cursor-pointer" src={photos} />
                                                </th>
                                                <th className='lg:py-1 lg:px-3 flex gap-1 font-normal'>
                                                    <input
                                                        className={isOdd ? "bg-gray-100 lg:w-[90px] p-1 bg-inherit text-center outline-none " : 'p-1  bg-inherit lg:w-[90px] text-center outline-none'}
                                                        type="text"
                                                        value={inputValues[item._id]?.number || ''}
                                                        onChange={(e) => {
                                                            setInputValues((prevState) => ({
                                                                ...prevState,
                                                                [item._id]: {
                                                                    ...(prevState[item._id] || {}),
                                                                    number: e.target.value !== '' ? e.target.value : '',
                                                                },
                                                            }));
                                                        }}
                                                    />
                                                    <a href={`https://wa.me/${inputValues[item._id]?.number}`} className="border rounded-full grid place-items-center w-[20px] h-[20px]">link</a>
                                                </th>
                                                <th className={`status border lg:py-1 lg:px-3 ${inputValues[item._id]?.status === '2' ? 'bg-emerald-300' : 'bg-amber-300'}`}>
                                                    <select
                                                        className={`outline-none ${inputValues[item._id]?.status === '2' ? 'bg-emerald-300' : 'bg-amber-300'}`}
                                                        value={inputValues[item._id]?.status || 1}
                                                        onChange={(e) => {
                                                            setInputValues((prevState) => ({
                                                                ...prevState,
                                                                [item._id]: {
                                                                    ...(prevState[item._id] || {}),
                                                                    status: e.target.value !== '' ? e.target.value : '',
                                                                },
                                                            }));
                                                        }}
                                                    >
                                                        <option value={1}>Свободный</option>
                                                        <option value={2}>Активный</option>
                                                    </select>
                                                </th>
                                                <th className='border lg:py-1 lg:px-3'>
                                                    <input
                                                        className={isOdd ? "bg-gray-100 lg:w-[160px] p-1  bg-inherit text-center outline-none " : 'p-1  bg-inherit lg:w-[160px] text-center outline-none'}
                                                        type="text"
                                                        value={inputValues[item._id]?.logist || ''}
                                                        onChange={(e) => {
                                                            setInputValues((prevState) => ({
                                                                ...prevState,
                                                                [item._id]: {
                                                                    ...(prevState[item._id] || {}),
                                                                    logist: e.target.value !== '' ? e.target.value : '',
                                                                },
                                                            }));
                                                        }}
                                                    />
                                                </th>
                                                <th className='border lg:py-1 lg:px-3'>
                                                    <input
                                                        className={isOdd ? "bg-gray-100 lg:w-[90px] p-1  bg-inherit text-center outline-none " : 'p-1  bg-inherit lg:w-[90px] text-center outline-none'}
                                                        type="text"
                                                        value={inputValues[item._id]?.personal_number || ''}
                                                        onChange={(e) => {
                                                            setInputValues((prevState) => ({
                                                                ...prevState,
                                                                [item._id]: {
                                                                    ...(prevState[item._id] || {}),
                                                                    personal_number: e.target.value !== '' ? e.target.value : '',
                                                                },
                                                            }));
                                                        }}
                                                    />
                                                </th>
                                                <th className='border lg:py-1 lg:px-3'>
                                                    <input
                                                        className={isOdd ? "bg-gray-100 p-1  bg-inherit text-center outline-none " : 'p-1  bg-inherit w-full text-center outline-none'}
                                                        type="date"
                                                        value={inputValues[item._id]?.date_of_verification || ''}
                                                        onChange={e => handleInputChangeDate(e, item._id, 'date_of_verification')}
                                                    />
                                                </th>
                                                <th className='border lg:py-1 lg:px-3'>
                                                    {isNaN(inputValues[item._id]?.days_since_verification) ? '' : inputValues[item._id]?.days_since_verification}
                                                </th>
                                                <th className={`border lg:py-1 lg:px-3 ${inputValues[item._id]?.status_simCard === '1' ? 'bg-emerald-300' : inputValues[item._id]?.status_simCard === '2' ? 'bg-amber-300' : inputValues[item._id]?.status_simCard === '3' ? 'bg-red-600' : 'bg-emerald-500'}`}>
                                                    <select
                                                        className={
                                                            `outline-none  ${inputValues[item._id]?.status_simCard === '1' ? 'bg-emerald-300' : inputValues[item._id]?.status_simCard === '2' ? 'bg-amber-300' : inputValues[item._id]?.status_simCard === '3' ? 'bg-red-600' : 'bg-emerald-300'}`
                                                        }
                                                        value={inputValues[item._id]?.status_simCard || 1}
                                                        onChange={(e) => {
                                                            setInputValues((prevState) => ({
                                                                ...prevState,
                                                                [item._id]: {
                                                                    ...(prevState[item._id] || {}),
                                                                    status_simCard: e.target.value !== '' ? e.target.value : '',
                                                                },
                                                            }));
                                                        }}
                                                    >
                                                        <option value={1}>Гудок</option>
                                                        <option value={2}>В режиме ожидания</option>
                                                        <option value={3}>Не обслуживается</option>
                                                    </select>
                                                </th>
                                                <th className={`border lg:py-1 lg:px-3 ${inputValues[item._id]?.physical_simCard === '1' ? 'bg-emerald-300' : inputValues[item._id]?.physical_simCard === '2' ? 'bg-red-600' : inputValues[item._id]?.physical_simCard === '3' ? 'bg-amber-300' : 'bg-emerald-300'}`}>
                                                    <select className={`outline-none ${inputValues[item._id]?.physical_simCard === '1' ? 'bg-emerald-300' : inputValues[item._id]?.physical_simCard === '2' ? 'bg-red-600' : inputValues[item._id]?.physical_simCard === '3' ? 'bg-amber-300' : 'bg-emerald-300'}`}
                                                        value={inputValues[item._id]?.physical_simCard || 1}
                                                        onChange={(e) => {
                                                            setInputValues((prevState) => ({
                                                                ...prevState,
                                                                [item._id]: {
                                                                    ...(prevState[item._id] || {}),
                                                                    physical_simCard: e.target.value !== '' ? e.target.value : '',
                                                                },
                                                            }));
                                                        }}
                                                    >
                                                        <option value={1}>В наличии</option>
                                                        <option value={2}>Не в наличии</option>
                                                        <option value={3}>У владельца</option>
                                                    </select>
                                                </th>
                                                <th className='border lg:py-1 lg:px-3'>
                                                    <input className={isOdd ? "bg-gray-100 p-1 lg:w-[40px] w-[20px]  bg-inherit text-center outline-none " : 'p-1  bg-inherit lg:w-[40px] w-[20px] text-center outline-none'} type="text"
                                                        value={inputValues[item._id]?.registration || ''}
                                                        onChange={(e) => {
                                                            setInputValues((prevState) => ({
                                                                ...prevState,
                                                                [item._id]: {
                                                                    ...(prevState[item._id] || {}),
                                                                    registration: e.target.value !== '' ? e.target.value : '',
                                                                },
                                                            }));
                                                        }}
                                                    />
                                                </th>
                                                <th className='border lg:py-1 lg:px-3'>
                                                    <input className={isOdd ? "bg-gray-100 p-1  bg-inherit lg:w-[40px] w-[20px] text-center outline-none " : 'p-1  bg-inherit lg:w-[40px] w-[20px] text-center outline-none'} type="text"
                                                        value={inputValues[item._id]?.WAcod || ''}
                                                        onChange={(e) => {
                                                            setInputValues((prevState) => ({
                                                                ...prevState,
                                                                [item._id]: {
                                                                    ...(prevState[item._id] || {}),
                                                                    WAcod: e.target.value !== '' ? e.target.value : '',
                                                                },
                                                            }));
                                                        }}
                                                    />
                                                </th>
                                                <th className='border lg:py-1 lg:px-3'>
                                                    <input className={isOdd ? "bg-gray-100 p-1  bg-inherit lg:w-[40px] w-[20px] text-center outline-none " : 'p-1  bg-inherit lg:w-[40px] w-[20px] text-center outline-none'} type="text"
                                                        value={inputValues[item._id]?.TGcod || ''}
                                                        onChange={(e) => {
                                                            setInputValues((prevState) => ({
                                                                ...prevState,
                                                                [item._id]: {
                                                                    ...(prevState[item._id] || {}),
                                                                    TGcod: e.target.value !== '' ? e.target.value : '',
                                                                },
                                                            }));
                                                        }}
                                                    />
                                                </th>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                        </table>
                        <button className='lg:ml-3 mt-5 mb-5 bg-gradient-to-r from-pink-400 to-red-500 hover:bg-blue-600 text-white lg:py-2 lg:px-6 p-1 rounded-lg shadow-lg transition-all duration-300 ease-in-out text-[10px] transform hover:scale-105 focus:outline-none' onClick={() => addSlots(elem._id)}>добавить слот</button>
                    </div>
                ))) : <div>Загрузка...</div>
            }
            {
                (node ? (<button
                    onClick={handleSubmitAll}
                    className='fixed bottom-5 right-5 lg:ml-3 mt-5 mb-5 bg-gradient-to-r from-pink-400 to-red-500 hover:bg-blue-600 text-white lg:py-2 lg:px-6 p-1 rounded-lg shadow-lg transition-all duration-300 ease-in-out text-[10px] transform hover:scale-105 focus:outline-none'
                >сохранить</button>) : (<button
                    className='fixed bottom-5 right-5 lg:ml-3 mt-5 mb-5 bg-gradient-to-r from-pink-400 to-red-500 hover:bg-blue-600 text-white lg:py-2 lg:px-6 p-1 rounded-lg shadow-lg transition-all duration-300 ease-in-out text-[10px] transform hover:scale-105 focus:outline-none'
                ><LoadingAnimate /></button>))
            }
        </>
    )
}