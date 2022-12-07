import React from "react";
import formMode from "../helpers/FormMode";
import {useNavigate, useParams} from "react-router";
import {withTranslation} from "react-i18next";
import {CheckTextRange} from "../helpers/CheckTextRange";
import {addUsluga, getUslugaDetails, updateUsluga} from "../../axios/UslugaAxiosCalls";

class FormularzUslugi extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdUsluga = this.props.params.idUsluga
        const currentFormMode = paramsIdUsluga ? formMode.EDIT : formMode.NEW

        this.state = {
            data: {
                NazwaUslugi: '',
                Opis: '',
                Cena: null,
                Narkoza: false,
                Dolegliwosc: ''
            },
            errors: {
                Nazwa: '',
                Opis: '',
                Cena: '',
                Dolegliwosc: ''
            },
            idUsluga: paramsIdUsluga,
            error: '',
            isLoaded: false,
            formMode: currentFormMode
        }
    }


    async componentDidMount() {
        if (this.state.formMode === formMode.EDIT) {
            try {
                const res = await getUslugaDetails(this.state.idUsluga);
                const data = await res.data

                this.setState({
                    data: data,
                    isLoaded: true
                });
            } catch (error) {
                console.log(error)
            }
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
        let errorMessage = '';
        if (fieldName === 'NazwaUslugi') {
            if (!CheckTextRange(fieldValue, 2, 50)) {
                errorMessage = t('validation.max50')
            }
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Opis') {
            if (!CheckTextRange(fieldValue, 0, 300)) {
                errorMessage = t('validation.max300nullable')
            }
        }
        if (fieldName === 'Cena') {
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        if (fieldName === 'Dolegliwosc') {
            if (!fieldValue) {
                errorMessage = t('validation.required')
            }
        }
        return errorMessage;
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

    onChange1 = (event) => {
        const {name} = event.target
        const data = {...this.state.data}
        data[name] = !data[name]

        this.setState({
            data: data,
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {navigate} = this.props;
        const dane = {...this.state}
        const isValid = this.validateForm()

        if (isValid) {
            if (dane.formMode === formMode.NEW) {
                try {
                    await addUsluga(dane.data);
                    await navigate("/uslugi", {replace: true});
                } catch (error) {
                    console.log(error)
                }
            } else if (dane.formMode === formMode.EDIT) {
                try {
                    await updateUsluga(dane.data, this.state.idUsluga)
                    await navigate("/uslugi", {replace: true});
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    render() {
        const {data, errors} = this.state
        const {t} = this.props;
        const {navigate} = this.props
        const pageTitle = this.state.formMode === formMode.NEW ? t('usluga.addNewService') : t('usluga.editService')

        return (
            <div class="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-3 mt-3 mb-3">
                <div class="w-full lg:w-1/6 lg:px-6 text-gray-800 leading-normal">
                    <p class="text-base font-bold py-2 text-xl lg:pb-6 text-gray-700">{pageTitle}</p>
                </div>
                <div
                    className="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <form onSubmit={this.handleSubmit}>
                        <section class="bg-white-100 border-b  mb-7">
                            <div class=" flex flex-wrap md:flex mb-6 mt-4">
                                <label className="block text-gray-600 font-bold md:text-left mb-3 mt-2 md:mb-0 pr-7"
                                       htmlFor="Nazwa">
                                    {t('usluga.fields.name')}
                                </label>
                                <div class="md:w-3/5">
                                    <input
                                        class={errors.Nazwa ? "form-textarea block w-full focus:bg-red" : "form-textarea block w-full focus:bg-white"}
                                        name="NazwaUslugi" id="NazwaUslugi" type="text"
                                        value={data.NazwaUslugi} onChange={this.handleChange}
                                        placeholder=""/>
                                </div>
                                <span id="errorNazwa"
                                      className="errors-text2 ml-24 mt-4">{errors.NazwaUslugi}</span>
                            </div>
                        </section>
                        <div className="border-b">
                            <label class="block mt-5 text-gray-600 font-bold md:text-left mb-6 " id="Opis">
                                {t('usluga.fields.description')}
                            </label>
                            <div class="md:w-3/4 mt-5">
                        <textarea class="form-textarea block w-full focus:bg-white " id="Opis" name="Opis"
                                  placeholder={t('usluga.addDescription')}
                                  rows="5" value={data.Opis} onChange={this.handleChange}/>
                            </div>
                            <span id="errorOpis" className="errors-text2 my-6  ">{errors.Opis}</span>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6 border-b">
                            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                    {t('usluga.fields.price')}
                                </label>
                                <input
                                    class=" form-textarea block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="Cena" id="Cena" step="0.01" type="number" value={data.Cena}
                                    onChange={this.handleChange} placeholder=""/>
                                <span id="errorCena" className="errors-text2 mb-6 ">{errors.Cena}</span>
                            </div>
                            <div class="w-full md:w-1/3 px-3 mb-6 md:ml-20 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-2" form="grid-city">
                                    {t('usluga.fields.narcosis')}
                                </label>
                                <input type="checkbox" name="Narkoza" checked={data.Narkoza === true}
                                       class="form-checkbox mb-4 w-8 h-8 mt-3 text-blue-600" onChange={this.onChange1}/>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-full px-3 mb-6 md:mb-0">
                                <label class="block  tracking-wide text-gray-700 text-s font-bold mb-4"
                                       form="grid-city">
                                    {t('usluga.fields.painScale')}
                                </label>
                                <label class="inline-flex  items-center">
                                    <input name="Dolegliwosc" id="Dolegliwosc" type="radio"
                                           checked={data.Dolegliwosc === "Niska"}
                                           class="form-radio text-indigo-600"
                                           value="Niska" onChange={this.handleChange}/>
                                    <span class="ml-2">{t('usluga.fields.painScaleEnum.low')}</span>
                                </label>
                                <label class="inline-flex items-center  ml-14 mb-5">
                                    <input name="Dolegliwosc" id="Dolegliwosc" type="radio" class="form-radio"
                                           checked={data.Dolegliwosc === "Średnia"}
                                           value="Średnia" onChange={this.handleChange}/>
                                    <span class="ml-2">{t('usluga.fields.painScaleEnum.medium')}</span>
                                </label>
                                <label class="inline-flex items-center  ml-14 mb-4">
                                    <input name="Dolegliwosc" id="Dolegliwosc" type="radio" class="form-radio"
                                           checked={data.Dolegliwosc === "Wysoka"}
                                           value="Wysoka" onChange={this.handleChange}/>
                                    <span class="ml-2">{t('usluga.fields.painScaleEnum.high')}</span>
                                    <span id="errorDolegliwosc"
                                          className="errors-text2 ml-20 mt-1">{errors.Dolegliwosc}</span>
                                </label>
                            </div>
                        </div>
                        <div className=" md:flex mb-6 mt-8 ">
                            <div className="flex pb-3">
                                <button onClick={() => navigate(-1)}
                                        className="shadow bg-red-500 hover:bg-white  hover:text-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="button">
                                    {t("button.back")}
                                </button>
                                <button type="submit"
                                        className=" ml-4 shadow bg-blue-400 hover:bg-white  hover:text-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                                    {t("button.confirm")}
                                </button>
                            </div>
                        </div>
                    </form>
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
const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate}/>;
};

export default withTranslation()(withNavigate(withRouter(FormularzUslugi)));