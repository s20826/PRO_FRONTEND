import {Link} from "react-router-dom";

function PacjentKlientListTable(props) {
    // const { t } = useTranslation();
    const list = props.pacjenci

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex flex-row-reverse pb-3">

                {/*<Link to="/umowWizyte">*/}
                {/*    <button class="shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">*/}
                {/*        Umów wizytę*/}
                {/*    </button>*/}
                {/*</Link>*/}

            </div>
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                <thead className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Nazwa</th>
                    <th scope="col" className="px-6 py-3">Gatunek</th>
                    <th scope="col" className="px-6 py-3">Rasa</th>
                    <th scope="col" className="px-6 py-3">Maść</th>
                    <th scope="col" className="px-6 py-3"/>
                </tr>
                </thead>
                <tbody>
                {list.map(x => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                        key={x.IdPacjent}>

                        <td scope="col" className="px-6 py-2">{x.Nazwa}</td>
                        <td scope="col" className="px-6 py-2">{x.Gatunek}</td>
                        <td scope="col" className="px-6 py-2">{x.Rasa}</td>
                        <td scope="col" className="px-6 py-2">{x.Masc}</td>

                        <td scope="col" className="px-6 py-1">
                            <div className="list-actions">
                                <div className=" flex">
                                    <Link to={`/pacjenci/${x.IdPacjent}`} className="list-actions-button-details flex-1">
                                        <svg className="list-actions-button-details flex-1"
                                             xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             fill="#000000" viewBox="0 0 256 256">
                                            <rect width="256" height="256" fill="none"/>
                                            <g className="details-icon-color" opacity="0.1"></g>
                                            <circle className="details-icon-color hover:white-100" cx="128" cy="128"
                                                    r="96"
                                                    fill="none" stroke="#000000" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="16"></circle>
                                            <polyline className="details-icon-color"
                                                      points="120 120 128 120 128 176 136 176" fill="none"
                                                      stroke="#000000" stroke-linecap="round"
                                                      stroke-linejoin="round" stroke-width="16"></polyline>
                                            <circle className="details-icon-color dot" cx="126" cy="84"
                                                    r="12"></circle>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default PacjentKlientListTable