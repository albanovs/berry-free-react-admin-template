import React from 'react'

export default function PercentUI() {
    return (
        <div className="lg:w-[400px] lg:ml-0 ml-10 w-[200px] lg:text-[12px] text-[6px] mb-8 mt-8 flex flex-col gap-1 lg:gap-4">
            <h1 className="font-semibold flex items-center justify-between">
                СМ 1 -
                <span className="px-2 py-1 rounded-full bg-blue-500 text-white">
                    100%
                </span>
                <span className="px-2 py-1 rounded-full bg-green-500 text-white">
                    30%
                </span>
                <span className="px-2 py-1 rounded-full bg-yellow-500 text-gray-800">
                    10% - 15%
                </span>
                <span className="px-2 py-1 rounded-full bg-red-500 text-white">
                    55% - 60%
                </span>
            </h1>
            <h1 className="font-semibold flex items-center justify-between">
                СМ 2 -
                <span className="px-2 py-1 rounded-full bg-blue-500 text-white">
                    100%
                </span>
                <span className="px-2 py-1 rounded-full bg-green-500 text-white">
                    50%
                </span>
                <span className="px-2 py-1 rounded-full bg-yellow-500 text-gray-800">
                    10% - 15%
                </span>
                <span className="px-2 py-1 rounded-full bg-red-500 text-white">
                    35% - 40%
                </span>
            </h1>
            <h1 className="font-semibold flex items-center justify-between">
                x% байер -
                <span className="px-2 py-1 rounded-full bg-blue-500 text-white">
                    100%
                </span>
                <span className="px-2 py-1 rounded-full bg-green-500 text-white">
                    40%
                </span>
                <span className="px-2 py-1 rounded-full bg-yellow-500 text-gray-800">
                    10%
                </span>
                <span className="px-2 py-1 rounded-full bg-red-500 text-white">
                    50%
                </span>
            </h1>
            <h1 className="font-semibold flex items-center justify-between">
                x% логист -
                <span className="px-2 py-1 rounded-full bg-blue-500 text-white">
                    100%
                </span>
                <span className="px-2 py-1 rounded-full bg-green-500 text-white">
                    40%
                </span>
                <span className="px-2 py-1 rounded-full bg-yellow-500 text-gray-800">
                    10%
                </span>
                <span className="px-2 py-1 rounded-full bg-red-500 text-white">
                    50%
                </span>
            </h1>
        </div>
    )
}