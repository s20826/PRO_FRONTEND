import {Link} from "react-router-dom";
import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {isAdmin} from "../other/authHelper";

function KlientListTable(props) {
    const {t} = useTranslation();
    const list = props.klienci
    const [filteredData, setFilteredData] = useState(list);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = list.filter((value) => {
            return value.Nazwisko.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData(list);
        } else {
            setFilteredData(newFilter);
        }
        console.log(filteredData)
    };

    return (
        <div>
            <div className="p-4 ">
                <div className="relative mt-1 flex flex-wrap">
                    <label form="table-search" className="sr-only shrink">Search</label>
                    <div className="absolute  inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <label htmlFor="search">
                        <input type="text" id="search"
                               className="shadow-xl bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 md:w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               onChange={handleFilter} value={wordEntered}
                               placeholder={t('other.search')}/>

                    </label>
                    <Link to="/dodajKlienta"
                          className="absolute top-0 right-0  h-12 w-12 sm:w-auto shadow-xl bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                        <span className="text-xl">+</span><span
                        className="invisible sm:visible "> {t('klient.button.addClient')}</span>
                    </Link>
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-xl mb-6 sm:rounded-lg">
                <table className="w-full  text-sm text-left text-gray-700 dark:text-gray-400">
                    <thead className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="text-center px-6 py-3">{t('klient.fields.firstName')}</th>
                        <th scope="col" className="text-center px-6 py-3">{t('klient.fields.lastName')}</th>
                        <th scope="col" className="text-center px-6 py-3">{t('klient.fields.phoneNumber')}</th>
                        <th scope="col" className="text-center px-6 py-3">{t('klient.fields.email')}</th>
                        <th scope="col" className="text-center px-6 py-3"/>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map(klient => (
                        <tr key={klient.IdOsoba}
                            className="shadow-2xl bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
                            <td className="text-center px-6 py-2">{klient.Imie}</td>
                            <td className="text-center px-6 py-2">{klient.Nazwisko}</td>
                            <td className="text-center px-6 py-2">{klient.NumerTelefonu}</td>
                            <td className="text-center px-6 py-2">{klient.Email}</td>
                            <td className="text-center px-6 py-2">

                                <div className="flex">
                                    <Link to={`/klienci/${klient.IdOsoba}`}
                                          className="list-actions-button-details flex-1">
                                        <svg className="list-actions-button-details flex-1  "
                                             xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             fill="#000000" viewBox="0 0 256 256">
                                            <rect width="256" height="256" fill="none"/>
                                            <g className="details-icon-color" opacity="0.1"/>
                                            <circle className="details-icon-color hover:white-100" cx="128" cy="128"
                                                    r="96"
                                                    fill="none" stroke="#000000" strokeLinecap="round"
                                                    strokeLinejoin="round" strokeWidth="16"></circle>
                                            <polyline className="details-icon-color"
                                                      points="120 120 128 120 128 176 136 176" fill="none"
                                                      stroke="#000000" strokeLinecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></polyline>
                                            <circle className="details-icon-color dot" cx="126" cy="84"
                                                    r="12"></circle>
                                        </svg>
                                    </Link>
                                    {isAdmin() &&
                                        <Link to={`/klienci/delete/${klient.IdOsoba}`}
                                              className="list-actions-button-details flex-1">
                                            <svg className="list-actions-button-delete flex-1"
                                                 xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                 fill="#000000" viewBox="0 0 256 256">

                                                <rect width="256" height="256" fill="none"/>
                                                <line className="details-icon-color" x1="215.99609" y1="56"
                                                      x2="39.99609" y2="56.00005" fill="none" stroke="#000000"
                                                      stroke-linecap="round" strokeLinejoin="round"
                                                      strokeWidth="16"></line>
                                                <line className="details-icon-color" x1="104" y1="104" x2="104"
                                                      y2="168"
                                                      fill="none" stroke="#000000" stroke-linecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></line>
                                                <line className="details-icon-color" x1="152" y1="104" x2="152"
                                                      y2="168"
                                                      fill="none" stroke="#000000" stroke-linecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></line>
                                                <path className="details-icon-color"
                                                      d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none"
                                                      stroke="#000000" stroke-linecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></path>
                                                <path className="details-icon-color"
                                                      d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                                                      fill="none" stroke="#000000" stroke-linecap="round"
                                                      strokeLinejoin="round" strokeWidth="16"></path>
                                            </svg>
                                        </Link>
                                    }
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default KlientListTable