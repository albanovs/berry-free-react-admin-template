import React from 'react'
import { NavLink } from 'react-router-dom'

export default function PageFullfilment({ link }) {
    return (
        <div>
            <NavLink to={`/add-otchet-full${link}`} className="stats shadow cursor-pointer mb-2 mr-2">
                <div className="stat">
                    <div className="stat-title dark:text-slate-300">Создать отчет</div>
                    <div className={`stat-figure dark:text-slate-300}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    </div>
                </div>
            </NavLink>
            <NavLink to={`/list-otchet-full${link}`} className="stats shadow cursor-pointer mb-2 mr-2">
                <div className="stat">
                    <div className="stat-title dark:text-slate-300">Oтчеты</div>
                    <div className={`stat-figure dark:text-slate-300}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}