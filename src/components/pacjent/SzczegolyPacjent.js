import React from "react";
import {useParams} from "react-router";
import dayjs from 'dayjs';
import {withTranslation} from "react-i18next";
import {getFormattedDate, getFormattedDateWithHour} from "../other/dateFormat";
import {Link} from "react-router-dom";
import {getPacjentDetails} from "../../axios/PacjentAxiosCalls";
import {getPacjentWizytaList} from "../../axios/WizytaAxiosCalls";
import {getSzczepienieList} from "../../axios/SzczepienieAxionCalls";

class SzczegolyPacjent extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdPacjent = this.props.params.idPacjent
        this.state = {
            pacjent: {
                IdOsoba: '',
                Wlasciciel: '',
                Nazwa: '',
                Gatunek: '',
                Rasa: '',
                Waga: null,
                Masc: '',
                Plec: '',
                DataUrodzenia: '',
                Agresywne: false,
                Ubezplodnienie: false
            },
            idPacjent: paramsIdPacjent,
            message: '',
            szczepienia:[],
            wizyty: []
        }
    }

    fetchPatientDetails = async () => {
        try {
            const res = await getPacjentDetails(this.state.idPacjent);
            var data = await res.data

            this.setState({
                isLoaded: true,
                pacjent: data
            });
        } catch (error) {
            console.log(error)
        }
    }

    async componentDidMount() {

      await  this.fetchPatientDetails();

        try {
            var res = await getPacjentWizytaList(this.state.idPacjent)
            var data = await res.data

            this.setState({
                isLoaded: true,
                wizyty: data
            });

             res = await getSzczepienieList(this.state.idPacjent)
             data = await res.data

            this.setState({
                isLoaded: true,
                szczepienia: data
            });

        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { pacjent, wizyty,idPacjent, szczepienia} = this.state
        const {t} = this.props;

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3 mb-3">
                <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{t('pacjent.detailsPatient')}</p>
                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <form onSubmit={this.handleSubmit} className="w-full max-w">
                        <div class="flex flex-wrap -mx-3 mb-4 border-b">
                            <div class="w-full px-3">
                                <label class="block tracking-wide text-gray-600 text-s font-bold mb-2">
                                    {t('pacjent.fields.owner')}
                                </label>
                                <input
                                    class="form-textarea appearance-none block w-4/6 bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 mb-1 leading-tight focus:outline-none focus:bg-white "
                                    name="Wlasciciel" id="Wlasciciel" type="text" value="Adam Nowak"
                                    disabled />
                            </div>
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-4 border-b">
                            <div class="w-full px-3">
                                <label class="block tracking-wide text-gray-600 text-s font-bold mb-2">
                                    {t('pacjent.fields.name')}
                                </label>
                                <input
                                    class="form-textarea appearance-none block w-4/6 bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-4 mb-1 leading-tight focus:outline-none focus:bg-white "
                                    name="Nazwa" id="Nazwa" type="text" value={pacjent.Nazwa}
                                    disabled/>
                            </div>
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-6 border-b">
                            <div class="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                                <label class="block  tracking-wide text-gray-600 text-s font-bold mb-2">
                                    {t('pacjent.fields.species')}
                                </label>
                                <input
                                    class=" form-textarea appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:border-blue-600 "
                                    name="Gatunek" id="Gatunek" type="text" value={pacjent.Gatunek}
                                    disabled/>
                            </div>
                            <div class="w-full md:w-2/6 px-3 ml-8">
                                <label class="block  tracking-wide text-gray-600 text-s font-bold mb-2"
                                       form="grid-last-name">
                                    {t('pacjent.fields.breed')}
                                </label>
                                <input
                                    class=" form-textarea appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Rasa" id="Rasa" type="text" value={pacjent.Rasa} disabled/>
                            </div>
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-6 border-b">
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('pacjent.fields.weight')}
                                </label>
                                <input
                                    class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Waga" id="Waga" step="0.01" type="number" value={pacjent.Waga}
                                    disabled/>

                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('pacjent.fields.color')}
                                </label>
                                <input
                                    class="appearance-none form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Masc" id="Masc" type="text" value={pacjent.Masc} disabled/>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6 border-b">
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('pacjent.fields.birthdate')}
                                </label>
                                <input
                                    class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="DataUrodzenia" id="DataUrodzenia" type="text"
                                    value={dayjs(pacjent.DataUrodzenia).format('YYYY-MM-DD')}
                                    disabled/>

                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('pacjent.fields.infertile')}
                                </label>
                                {pacjent.Ubezplodnienie === true &&
                                    <svg class="h-8 w-8 text-black mb-5" width="24" height="24" viewBox="0 0 24 24"
                                         stroke="currentColor" fill="none" stroke-linecap="round"
                                         strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z"/>
                                        <path d="M5 12l5 5l10 -10"/>
                                    </svg>}
                                {pacjent.Ubezplodnienie === false &&
                                    <svg class="h-8 w-8 text-black mb-5" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path stroke-linecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>}                        </div>
                        </div>

                        <div class="flex flex-wrap -mx-3 mb-6 ">
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('pacjent.fields.gender')}
                                </label>
                                {pacjent.Plec === "M" &&
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                         font-weight="bold" class="bi bi-gender-male" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                              d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
                                              stroke="black" strokeWidth="0.5"/>
                                    </svg>}
                                {pacjent.Plec === "F" &&
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                         class="bi bi-gender-female" viewBox="0 0 16 16">
                                        <path fillRule="evenodd"
                                              d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"
                                              stroke="black" strokeWidth="0.5"/>
                                    </svg>}
                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 ml-8 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2"
                                       form="grid-city">
                                    {t('pacjent.fields.aggressive')}
                                </label>
                                {pacjent.Agresywne === true &&
                                    <svg class="h-8 w-8 text-black" width="24" height="24" viewBox="0 0 24 24"
                                         stroke="currentColor" fill="none" stroke-linecap="round"
                                         strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z"/>
                                        <path d="M5 12l5 5l10 -10"/>
                                    </svg>}
                                {pacjent.Agresywne === false &&
                                    <svg class="h-8 w-8 text-black " fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path stroke-linecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>}
                            </div>
                        </div>
                    </form>


                    <div className="flex justify-between mt-14">
                        <h2 className=" w-1/3 my-2 mb-6 text-2xl font-black leading-tight text-gray-800">
                            {t('szczepienie.title')}</h2>

                        <div className="relative  w-1/3 ">
                         <Link to={`/szczepienie/${idPacjent}`}>
                             <button id="menu-toggle"
                                    className="absolute  top-0 right-0  h-12 w-46  shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                <span className="text-2xl font-bold ">+</span>
                            </button>
                         </Link>
                        </div>
                    </div>
                    {(szczepienia.length !== 0) &&
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                                <thead
                                    className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 uppercase py-3 text-center">
                                        {t("szczepienie.fields.name")}</th>
                                    <th scope="col" className="px-6 uppercase py-3 text-center">
                                        {t("szczepienie.fields.application")}</th>
                                    <th scope="col" className="px-6 uppercase py-3 text-center">
                                        {t("szczepienie.fields.date")}</th>
                                    <th scope="col" className="px-6 uppercase py-3 text-center">
                                        {t("szczepienie.fields.periodOfValidity")}</th>
                                    <th scope="col" className="px-6 uppercase py-3 text-center">
                                        {t("szczepienie.fields.dose")}</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {szczepienia.map(x => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                                        key={x.IdSzczepienie}>
                                        <td className="px-6 py-2 text-center">
                                            {x.Nazwa}</td>
                                        <td className="px-6 py-2 text-center">
                                            {x.Zastosowanie}</td>
                                        <td className="px-6 py-2 text-center">
                                            {x.Data != null ? getFormattedDate(x.Data) : "-"}</td>
                                        <td className="px-6 py-2 text-center">
                                            {x.DataWaznosci != null ? getFormattedDate(x.DataWaznosci) : "-"}</td>
                                        <td className="px-6 py-2 text-center">
                                            {x.Dawka} ml</td>
                                        <div className="list-actions text-center py-2">
                                            <div className=" flex">

                                                <Link to={`/szczepienie/edit/${idPacjent}/${x.IdSzczepienie}`}
                                                      className="list-actions-button-details flex-1">
                                                    <svg className="list-actions-button-edit flex-1"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                                                        <rect className="details-icon-color" width="256" height="256"
                                                              fill="none"></rect>
                                                        <path className="details-icon-color"
                                                              d="M96,216H48a8,8,0,0,1-8-8V163.31371a8,8,0,0,1,2.34315-5.65686l120-120a8,8,0,0,1,11.3137,0l44.6863,44.6863a8,8,0,0,1,0,11.3137Z"
                                                              fill="none" stroke="#000000" strokeLinecap="round"
                                                              strokeLinejoin="round" strokeWidth="16"></path>
                                                        <line className="details-icon-color" x1="136" y1="64" x2="192"
                                                              y2="120"
                                                              fill="none" stroke="#000000" strokeLinecap="round"
                                                              strokeLinejoin="round" strokeWidth="16"></line>
                                                        <polyline className="details-icon-color"
                                                                  points="216 216 96 216 40.509 160.509" fill="none"
                                                                  stroke="#000000" strokeLinecap="round"
                                                                  strokeLinejoin="round" strokeWidth="16"></polyline>
                                                    </svg>
                                                </Link>
                                                <Link to={`/szczepienie/delete/${x.IdSzczepienie}`}
                                                      className="list-actions-button-details flex-1">
                                                    <svg className="list-actions-button-delete flex-1"
                                                         xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         fill="#000000" viewBox="0 0 256 256">
                                                        <rect width="256" height="256" fill="none"></rect>
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
                                                              d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
                                                              fill="none"
                                                              stroke="#000000" stroke-linecap="round"
                                                              strokeLinejoin="round" strokeWidth="16"></path>
                                                        <path className="details-icon-color"
                                                              d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                                                              fill="none" stroke="#000000" stroke-linecap="round"
                                                              strokeLinejoin="round" strokeWidth="16"></path>
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    }












                    <div className="flex justify-between mt-14">
                        <h2 className=" w-1/3 my-2 mb-6 text-2xl font-black leading-tight text-gray-800">
                            {t('wizyta.title')}</h2>

                        <div className="relative  w-1/3 ">
                            <button id="menu-toggle" onClick={() => {
                                this.mozeDoWizyty()
                            }}
                                    className="absolute  top-0 right-0  h-12 w-46  shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                <span className="text-2xl font-bold ">+</span>
                            </button>
                        </div>
                    </div>
                    {(wizyty.length !== 0) &&
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
                                <thead
                                    className="text-s text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 uppercase py-3 text-center">
                                        {t("wizyta.table.startDate")}</th>
                                    <th scope="col" className="px-6 uppercase py-3 text-center">
                                        {t("wizyta.table.vet")}</th>
                                    <th scope="col" className="px-6 uppercase py-3 text-center">
                                        {t("wizyta.table.status")}</th>
                                    <th scope="col" className="px-6 uppercase py-3 text-center">
                                        {t("wizyta.table.isPaid")}</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {wizyty.map(x => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600"
                                        key={x.idWizyta}>
                                        <td className="px-6 py-2 text-center">
                                            {x.Data != null ? getFormattedDateWithHour(x.Data) : "-"}</td>
                                        <td className="px-6 py-2 text-center">
                                            {x.Weterynarz}</td>
                                        <td className="px-6 py-2 text-center">
                                            {t("wizyta.status." + x.Status)}</td>
                                        <td className="px-6 py-2 text-center">
                                            {x.CzyOplacona ? t("other.yes") : t("other.no")}</td>
                                        <div className="list-actions text-center py-2">
                                            <div className=" flex">
                                                <Link to={`/wizyty/${x.IdWizyta}`}
                                                      className="list-actions-button-details flex-1">
                                                    <svg className="list-actions-button-details flex-1"
                                                         xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         fill="#000000" viewBox="0 0 256 256">
                                                        <rect width="256" height="256" fill="none"/>
                                                        <g className="details-icon-color" opacity="0.1"></g>
                                                        <circle className="details-icon-color hover:white-100" cx="128"
                                                                cy="128" r="96"
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
                                                <Link to={`/wizyty/edit/${x.IdWizyta}`}
                                                      className="list-actions-button-details flex-1">
                                                    <svg className="list-actions-button-edit flex-1"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                                                        <rect className="details-icon-color" width="256" height="256"
                                                              fill="none"></rect>
                                                        <path className="details-icon-color"
                                                              d="M96,216H48a8,8,0,0,1-8-8V163.31371a8,8,0,0,1,2.34315-5.65686l120-120a8,8,0,0,1,11.3137,0l44.6863,44.6863a8,8,0,0,1,0,11.3137Z"
                                                              fill="none" stroke="#000000" strokeLinecap="round"
                                                              strokeLinejoin="round" strokeWidth="16"></path>
                                                        <line className="details-icon-color" x1="136" y1="64" x2="192"
                                                              y2="120"
                                                              fill="none" stroke="#000000" strokeLinecap="round"
                                                              strokeLinejoin="round" strokeWidth="16"></line>
                                                        <polyline className="details-icon-color"
                                                                  points="216 216 96 216 40.509 160.509" fill="none"
                                                                  stroke="#000000" strokeLinecap="round"
                                                                  strokeLinejoin="round" strokeWidth="16"></polyline>
                                                    </svg>
                                                </Link>
                                                <Link to={`/wizyty/delete/${x.IdWizyta}`}
                                                      className="list-actions-button-details flex-1">
                                                    <svg className="list-actions-button-delete flex-1"
                                                         xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                         fill="#000000" viewBox="0 0 256 256">
                                                        <rect width="256" height="256" fill="none"></rect>
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
                                                              d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
                                                              fill="none"
                                                              stroke="#000000" stroke-linecap="round"
                                                              strokeLinejoin="round" strokeWidth="16"></path>
                                                        <path className="details-icon-color"
                                                              d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                                                              fill="none" stroke="#000000" stroke-linecap="round"
                                                              strokeLinejoin="round" strokeWidth="16"></path>
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};

export default withTranslation()(withRouter(SzczegolyPacjent));