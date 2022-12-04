import React from 'react';
import Calendar from 'react-calendar';
import {useNavigate} from "react-router";
import Time from "../other/Time";
import dayjs from 'dayjs';
import {getHarmonogramWizyta} from "../../axios/HarmonogramAxiosCalls";
import {getFormattedDateWithHour} from "../other/dateFormat";
import {withTranslation} from "react-i18next";
import { umowWizyte} from "../../axios/WizytaAxiosCalls";

class UmowienieWizytyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                Pacjent: '',
                Notatka: '',
                Termin: '',
                ID_klient: ''
            },
            errors: {
                Pacjent: '',
                Notatka: '',
                Termin: ''
            },
            wizyta: {
                Data: '',
                Dzien: ''
            },
            list: this.props.pacjenci,
            date: new Date(),
            harmonogram: [],
            day: ''
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        const data = {...this.state.data}
        data[name] = value

        const errorMessage = this.validateField(name, value)
        const errors = {...this.state.errors}
        errors[name] = errorMessage

        this.setState({
            data: data,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        const {list} = this.state
        let errorMessage = '';
        if (this.checkPacjentList(list)) {
            if (fieldName === 'Pacjent') {
                if (!fieldValue) {
                    errorMessage = `${t('validation.required')}`
                }
            }
        }
        if (fieldName === 'Termin') {
            if (!fieldValue) {
                errorMessage = `${t('validation.required')}`
            }
        }
        if (fieldName === 'Notatka') {
            if (fieldValue.length > 300) {
                errorMessage = `${t('validation.max300nullable')}`
            }
        }
        return errorMessage
    }

    validateForm = () => {
        const data = this.state.data
        const errors = this.state.errors
        for (const fieldName in data) {
            const fieldValue = data[fieldName]
            errors[fieldName] = this.validateField(fieldName, fieldValue)
        }

        this.setState({
            errors: errors
        })
        return !this.hasErrors();
    }

    handleSubmit = async (event) => {
        const {navigate} = this.props;
        const data = {...this.state.data}
        const wizyta = {...this.state.wizyta}
        const {list} = this.state

        event.preventDefault();
        const isValid = this.validateForm()
        if (isValid) {
            let newData
            if (this.checkPacjentList(list)) {
                newData = {
                    ID_Harmonogram: data["Termin"],
                    ID_Pacjent: data["Pacjent"],
                    Notatka: data["Notatka"],
                    ID_klient: data["ID_Klient"]
                }
            } else {
                newData = {
                    ID_Harmonogram: data["Termin"],
                    ID_Pacjent: '0',
                    Notatka: data["Notatka"],
                    ID_klient: data["ID_Klient"]
                }
            }
            console.log(newData)
            try {
                await umowWizyte(newData)
                navigate(
                    "/potwierdzenieWizyty",
                    {
                        state: {
                            Data: wizyta.Data
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        }
    }

    hasErrors = () => {
        const errors = this.state.errors
        for (const errorField in this.state.errors) {
            if (errors[errorField].length > 0) {
                return true
            }
        }
        return false
    }


    onChange = async (date) => {
        this.setState({selectedDate: date});

        try {
            const res = await getHarmonogramWizyta(dayjs(date).format('YYYY-MM-DD'));
            var data = await res.data

            this.setState({
                isLoaded: true,
                harmonogram: data
            });
        } catch (error) {
            console.log(error)
        }
    }

    handleHarmonogramSelect = (harmonogram) => {
        const data = {...this.state.data}
        const wizyta = {...this.state.wizyta}
        const errors = {...this.state.errors}

        errors["Data"] = ''
        data["Termin"] = harmonogram.IdHarmonogram
        wizyta["Data"] = getFormattedDateWithHour(harmonogram.Data)
        wizyta["Dzien"] = harmonogram.Dzien
        this.setState({
            wizyta: wizyta,
            data: data,
            errors: errors
        })
    }

    checkPacjentList = (list) => {
        return list.length > 0;
    }

    render() {
        const {navigate} = this.props
        const {list, harmonogram, errors, date, wizyta} = this.state
        const {t} = this.props;

        return (
            <div
                className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                <form onSubmit={this.handleSubmit}>
                    {this.checkPacjentList(list) &&
                        <section className="bg-white-100 border-b  mb-7">
                            <div className=" md:flex mb-6 mt-4">
                                <label className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7"
                                       htmlFor="Pacjent">
                                    {t("wizyta.field.patient")}
                                </label>
                                <div className="md:w-3/5">

                                    <select name="Pacjent" id="Pacjent" onChange={this.handleChange}
                                            className={errors.Pacjent ? "form-select block w-full focus:bg-red" : "form-select block w-full focus:bg-white"}>
                                        <option value="">{t("wizyta.selectPatient")}</option>
                                        {
                                            list.map(pacjent => (
                                                <option value={pacjent.IdPacjent}>{pacjent.Nazwa}</option>
                                            ))}
                                        <option value="0">{t("wizyta.other")}</option>
                                    </select>
                                </div>
                                <span id="errorPacjent" className="errors-text2">{errors.Pacjent}</span>
                            </div>
                        </section>
                    }
                    <section className="bg-white-100 border-b mt-7">
                        <label className="block  text-gray-600 font-bold md:text-left mb-6" form="my-select">
                            {t("wizyta.field.date")}
                        </label>
                        <Calendar className="mb-7"
                                  value={date}
                                  onClickDay={this.onChange}
                        />
                        <div>
                            {<Time showTime={harmonogram.length} harmonogram={harmonogram}
                                   timeChange={this.handleHarmonogramSelect}/>}
                            <span id="errorData" className="errors-text2 mb-4">{errors.Termin}</span>
                            <span id="" className="">{wizyta.Data === '' ? '' :
                                t("wizyta.selectedDate") + wizyta.Data.replaceAll("-", ".") + " (" + t('other.day.' + wizyta.Dzien) + ")"}
                            </span>
                        </div>
                    </section>
                    <label className="block mt-5 text-gray-600 font-bold md:text-left mb-6 " id="Notatka">
                        {t("wizyta.field.description")}
                    </label>
                    <div className="md:w-3/4 mt-5">
                        <textarea className="form-textarea block w-full focus:bg-white " id="Notatka" name="Notatka"
                                  rows="5" onChange={this.handleChange}/>
                    </div>
                    <span id="errorOpis" className="errors-text2">{errors.Notatka}</span>
                    <div className=" md:flex mb-6 mt-8 ">
                        <div className="flex pb-3">
                            <button onClick={() => navigate(-1)}
                                    className="shadow bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="button">
                                {t("button.back")}
                            </button>
                            <button type="submit"
                                    className=" ml-4 shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                {t("button.next")}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate}/>;
};

export default withTranslation()(withNavigate(UmowienieWizytyForm))