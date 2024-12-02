import React, { useEffect, useState } from 'react'
import fetchApi from 'api/api';
import LoadingAnimate from 'ui-component/LoadingAnimate';
export default function Otchets() {

    const [loading, setLoading] = useState(true);
    const [loadCreate, setLoadCreate] = useState(true)
    const [wait, setWait] = useState(false)

    const [datas, setDatas] = useState([])
    const [inputValues, setInputValues] = useState({})
    const [inputValues2, setInputValues2] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)

    const createFulls = async () => {
        setLoadCreate(false);
        try {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];

            await fetchApi.post(`/fullfilment1-create`, {
                date: formattedDate,
            });
            setWait(false)
            getDatas()
        } catch (error) {
            console.log(error);
        }
    }


    const getDatas = async () => {
        const response = await fetchApi.get(`/fullfilment1-datas`)
        setDatas(response.data)
        setLoading(true)
        setWait(true)
        setLoadCreate(true)

        const initialInputvalues = {}

        response.data.map(elem => {
            elem.otchet.forEach(item => {
                initialInputvalues[item._id] = {
                    date: item.date || '',
                    clients: item.clients || '',
                    services: item.services || '',
                    packages: item.packages || '',
                    count_product: item.count_product || '',
                    sum_itog: item.sum_itog || '',
                    obslujival: item.obslujival || '',
                    expenses: item.expenses || '',
                    sum_arrived: item.sum_arrived || '',
                }
            })
        })

        setInputValues(initialInputvalues)

        const initialInputvalues2 = {}

        response.data.map(elem => {
            initialInputvalues2[elem._id] = {
                all_expenses: elem.itogs.all_expenses || '',
                itog100: elem.itogs.itog100 || '',
            }
        })

        setInputValues2(initialInputvalues2)
    }
    const handleSubmit = async () => {
        setLoading(false)
        try {

            const updateDataPromises = datas.flatMap(elem =>
                elem.otchet.map(item => {
                    const updateData = {
                        date: inputValues[item._id]?.date === '' ? '' : inputValues[item._id]?.date || item.date,
                        clients: inputValues[item._id]?.clients === '' ? '' : inputValues[item._id]?.clients || item.clients,
                        services: inputValues[item._id]?.services === '' ? '' : inputValues[item._id]?.services || item.services,
                        packages: inputValues[item._id]?.packages === '' ? '' : inputValues[item._id]?.packages || item.packages,
                        count_product: inputValues[item._id]?.count_product === '' ? '' : inputValues[item._id]?.count_product || item.count_product,
                        sum_itog: inputValues[item._id]?.sum_itog === '' ? '' : inputValues[item._id]?.sum_itog || item.sum_itog,
                        obslujival: inputValues[item._id]?.obslujival === '' ? '' : inputValues[item._id]?.obslujival || item.obslujival,
                        expenses: inputValues[item._id]?.expenses === '' ? '' : inputValues[item._id]?.expenses || item.expenses,
                        sum_arrived: inputValues[item._id]?.sum_arrived === '' ? '' : inputValues[item._id]?.sum_arrived || item.sum_arrived,
                    }
                    return fetchApi.patch(`/updatefullfilment1/${item._id}`, updateData)
                })
            );
            await Promise.all(updateDataPromises);

            const sumAllItog = datas.map(elem =>
                elem.otchet.reduce((acc, elem) => {
                    const inputValue = inputValues[elem._id]?.sum_arrived || 0;
                    return acc + (inputValue ? parseFloat(inputValue) : 0);
                }, 0)
            );

            const sumAllexpenses = datas.map(elem =>
                elem.otchet.reduce((acc, elem) => {
                    const inputValue = inputValues[elem._id]?.expenses || 0;
                    return acc + (inputValue ? parseFloat(inputValue) : 0);
                }, 0)
            );


            const updateItogsPromises = datas.map((elem, index) =>
                fetchApi.patch(`/updatefullfilment1itog/${elem._id}`, { all_expenses: sumAllexpenses[index], itog100: sumAllItog[index] })
            );

            await Promise.all(updateItogsPromises);

            const updateInputValues = { ...inputValues }
            datas.map(elem => {
                elem.otchet.forEach(elem => {
                    updateInputValues[elem._id] = {
                        date: inputValues[elem._id]?.date || elem.date,
                        clients: inputValues[elem._id]?.clients || elem.clients,
                        services: inputValues[elem._id]?.services || elem.services,
                        packages: inputValues[elem._id]?.packages || elem.packages,
                        count_product: inputValues[elem._id]?.count_product || elem.count_product,
                        sum_itog: inputValues[elem._id]?.sum_itog || elem.sum_itog,
                        obslujival: inputValues[elem._id]?.obslujival || elem.obslujival,
                        expenses: inputValues[elem._id]?.expenses || elem.expenses,
                        sum_arrived: inputValues[elem._id]?.sum_arrived || elem.sum_arrived,
                    }
                })
            })
            setInputValues(updateInputValues)
            setWait(false)
            getDatas();
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
        }
    }
    const deleteOtchet = async (id) => {
        setShowModal(false);
        setWait(false);
        try {
            await fetchApi.delete(`/fullfilment1-delete/${id}`);
            getDatas();
        } catch (error) {
            console.log(error);
        }
    };

    const insertDatas = async () => {
        setWait(false)
        try {
            fetchApi.post(`/fufullfilment1-insert`)
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDatas()
    }, [])

    const insertSlot = async (id) => {
        setWait(false)
        try {
            await fetchApi.post(`/fullfilment1-addslot/${id}`)
            getDatas()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>

            {
                wait ? (<div>
                    {
                        datas.length ? '' : (loadCreate ? <button
                            className='mt-5 mb-5 bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out text-[10px] transform hover:scale-105 focus:outline-none'
                            onClick={createFulls}>Создать отчет</button> : <div className='w-full gap-2 flex-col flex justify-center items-center'><LoadingAnimate />загружаем данных, просим подождать</div>)
                    }
                    {
                        datas.length ? (<button
                            className='fixed right-3 bottom-1 mt-5 mb-5 bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out text-[10px] transform hover:scale-105 focus:outline-none'
                            onClick={handleSubmit}>{loading ? 'Сохранить' : <LoadingAnimate />}</button>) : ''
                    }
                    {datas.map(data => {
                        return (
                            <div key={data._id}>
                                <div className='text-sm mb-5 flex flex-col gap-2'>
                                    <div>дата создание: {data.date}</div>
                                </div>
                                <div className='flex justify-end'>
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className='mt-5 mb-5 bg-gradient-to-r from-pink-400 to-red-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out text-[10px] transform hover:scale-105 focus:outline-none'
                                    >Удалить отчет</button>
                                </div>
                                {showModal && (
                                    <div className="fixed z-10 inset-0 overflow-y-auto">
                                        <div className="flex items-center justify-center min-h-screen">
                                            <div onClick={() => setShowModal(false)} className="fixed inset-0 bg-black/50 opacity-50"></div>
                                            <div className="relative bg-white rounded-lg p-8">
                                                <p className="text-lg mb-4">Вы действительно хотите удалить отчет?</p>
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => deleteOtchet(data._id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2"
                                                    >
                                                        Да
                                                    </button>
                                                    <button
                                                        onClick={() => setShowModal(false)}
                                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                                                    >
                                                        Нет
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    }
                    )}
                    {
                        datas.map(elem => {
                            return (
                                <div key={elem._id}>
                                    <div>
                                        <table className='w-full bg-white lg:text-[10px] text-[3px]'>
                                            <thead className='bg-gray-600 text-white'>
                                                <tr>
                                                    <th className='border p-1'>№</th>
                                                    <th className='border p-1'>дата:</th>
                                                    <th className='border p-1'>клиент</th>
                                                    <th className='border p-1'>услуги</th>
                                                    <th className='border p-1'>Цена:</th>
                                                    <th className='border p-1'>кол ед товара</th>
                                                    <th className='border p-1 bg-green-700'>Сумма итог:</th>
                                                    <th className='border p-1'>обслуживал</th>
                                                    <th className='border p-1'>Расходы</th>
                                                    <th className='border p-1'>Прибыль</th>
                                                </tr>
                                            </thead>
                                            <tbody className='lg:text-[10px] text-[3px]'>
                                                {
                                                    elem.otchet.map((item, index) => {
                                                        return (
                                                            <tr key={item._id}>
                                                                <td className='border text-center'>{index + 1}</td>
                                                                <td className="border p-1">
                                                                    <input type="date"
                                                                        className="outline-none bg-inherit lg:w-[70px]"
                                                                        value={inputValues[item._id]?.date || ''}
                                                                        onChange={(e) => {
                                                                            setInputValues((prevState) => ({
                                                                                ...prevState,
                                                                                [item._id]: {
                                                                                    ...(prevState[item._id] || {}),
                                                                                    date: e.target.value !== '' ? e.target.value : '',
                                                                                },
                                                                            }));
                                                                        }} />
                                                                </td>
                                                                <td className="border p-1">
                                                                    <input type="text"
                                                                        className="outline-none bg-inherit w-full"
                                                                        value={inputValues[item._id]?.clients || ''}
                                                                        onChange={(e) => {
                                                                            setInputValues((prevState) => ({
                                                                                ...prevState,
                                                                                [item._id]: {
                                                                                    ...(prevState[item._id] || {}),
                                                                                    clients: e.target.value !== '' ? e.target.value : '',
                                                                                },
                                                                            }));
                                                                        }} />
                                                                </td>
                                                                <td className="border p-1">
                                                                    <input type="text"
                                                                        className="outline-none bg-inherit w-full"
                                                                        value={inputValues[item._id]?.services || ''}
                                                                        onChange={(e) => {
                                                                            setInputValues((prevState) => ({
                                                                                ...prevState,
                                                                                [item._id]: {
                                                                                    ...(prevState[item._id] || {}),
                                                                                    services: e.target.value !== '' ? e.target.value : '',
                                                                                },
                                                                            }));
                                                                        }} />
                                                                </td>
                                                                <td className="border p-1">
                                                                    <input type="text"
                                                                        className="outline-none bg-inherit w-full"
                                                                        value={inputValues[item._id]?.packages || ''}
                                                                        onChange={(e) => {
                                                                            const countProduct = parseFloat(inputValues[item._id]?.count_product) || 0;
                                                                            const expenses = parseFloat(inputValues[item._id]?.expenses) || 0;
                                                                            setInputValues((prevState) => ({
                                                                                ...prevState,
                                                                                [item._id]: {
                                                                                    ...(prevState[item._id] || {}),
                                                                                    packages: e.target.value !== '' ? e.target.value : '',
                                                                                    sum_itog: countProduct * parseFloat(e.target.value) || "",
                                                                                    sum_arrived: countProduct * parseFloat(e.target.value) - expenses,
                                                                                },
                                                                            }));
                                                                        }} />
                                                                </td>
                                                                <td className="border p-1">
                                                                    <input
                                                                        type="text"
                                                                        className="outline-none bg-inherit lg:w-[60px]"
                                                                        value={inputValues[item._id]?.count_product || ''}
                                                                        onChange={(e) => {
                                                                            const packages = parseFloat(inputValues[item._id]?.packages);
                                                                            const countProduct = parseFloat(e.target.value) || 0;
                                                                            const sumItog = packages * countProduct;
                                                                            const expenses = parseFloat(inputValues[item._id]?.expenses) || 0;
                                                                            const sumArrived = sumItog - expenses;

                                                                            setInputValues((prevState) => ({
                                                                                ...prevState,
                                                                                [item._id]: {
                                                                                    ...(prevState[item._id] || {}),
                                                                                    count_product: e.target.value !== '' ? e.target.value : '',
                                                                                    sum_itog: sumItog || "",
                                                                                    sum_arrived: sumArrived || "",
                                                                                },
                                                                            }));
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td className="border p-1">
                                                                    {inputValues[item._id]?.sum_itog || ''}
                                                                </td>
                                                                <td className="border p-1">
                                                                    <input type="text"
                                                                        className="outline-none bg-inherit w-full"
                                                                        value={inputValues[item._id]?.obslujival || ''}
                                                                        onChange={(e) => {
                                                                            setInputValues((prevState) => ({
                                                                                ...prevState,
                                                                                [item._id]: {
                                                                                    ...(prevState[item._id] || {}),
                                                                                    obslujival: e.target.value !== '' ? e.target.value : '',
                                                                                },
                                                                            }));
                                                                        }} />
                                                                </td>
                                                                <td className="border p-1">
                                                                    <input type="text"
                                                                        className="outline-none bg-inherit lg:w-[60px]"
                                                                        value={inputValues[item._id]?.expenses || ''}
                                                                        onChange={(e) => {
                                                                            const sum = inputValues[item._id]?.sum_itog || 0;
                                                                            const expenses = e.target.value !== '' ? parseFloat(e.target.value) : 0;
                                                                            const sumArrived = (sum - expenses).toFixed(0);

                                                                            setInputValues((prevState) => ({
                                                                                ...prevState,
                                                                                [item._id]: {
                                                                                    ...(prevState[item._id] || {}),
                                                                                    expenses: e.target.value !== '' ? e.target.value : '',
                                                                                    sum_arrived: sumArrived || "",
                                                                                },
                                                                            }));
                                                                        }} />
                                                                </td>
                                                                <td className="border p-1">
                                                                    {inputValues[item._id]?.sum_arrived || ''}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <button
                                            className='mt-5 mb-5 text-center bg-gradient-to-r from-pink-400 to-red-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out text-[10px] transform hover:scale-105 focus:outline-none'
                                            onClick={() => insertSlot(elem._id)}>Добавить слот</button>
                                    </div>
                                    <table className='mt-5 border w-[30%] mx-auto bg-white'>
                                        <thead>
                                            <tr>
                                                <td className='border p-1'>общая сумма расходов:</td>
                                                <td className='border p-1'>{elem.itogs.all_expenses}</td>
                                            </tr>
                                            <tr>
                                                <td className='border p-1'>общая сумма прибыли:</td>
                                                <td className='border p-1'>{elem.itogs.itog100}</td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            )
                        })
                    }
                    {
                        datas.length ? <div className='w-full flex justify-center'>
                            <button
                                className='mt-5 mb-5 text-center bg-gradient-to-r from-pink-400 to-red-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out text-[10px] transform hover:scale-105 focus:outline-none'
                                onClick={() => setShowModal2(true)}>Отправить отчет</button>
                        </div> : ''
                    }
                    {showModal2 && (
                        <div className="fixed z-10 inset-0 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen">
                                <div onClick={() => setShowModal2(false)} className="fixed inset-0 bg-black/50 opacity-50"></div>
                                <div className="relative bg-white rounded-lg p-8">
                                    <p className="text-lg mb-4">Вы действительно хотите отправить отчет?</p>
                                    <div className="flex justify-center">
                                        <button
                                            onClick={() => insertDatas()}
                                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2"
                                        >
                                            Да
                                        </button>
                                        <button
                                            onClick={() => setShowModal2(false)}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                                        >
                                            Нет
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>) : (
                    <div className='w-full gap-2 flex-col flex justify-center items-center'><LoadingAnimate />загружаем данных, просим подождать</div>
                )
            }
        </div>
    )
}
