import React from "react";
import {deleteLekMagazyn} from "../../api/LekWMagazynieApiCalls";
import {useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";

class UsuniecieLekuMagazyn extends React.Component {
    constructor(props) {
        super(props);
        const paramsIdStanLeku = this.props.params.IdStanLeku
        console.log(paramsIdStanLeku)
        this.state = {
            idStanLeku: paramsIdStanLeku,
            error: '',
            isLoaded: false,
            notice: '',
        }
    }

    removeLek = (idStanLeku) => {
        const {navigate} = this.props;
        //let response;
        deleteLekMagazyn(idStanLeku)
            .then(res => {
                console.log(res)
                if (res.status === 204) {
                    console.log(res.status)
                    navigate(-1 , {replace: true});

                } else if (res.status === 401) {
                    console.log(res)

                } else {
                    console.log(res)

                }
            })
    }

    render() {
        const {idStanLeku} = this.state
        const {t} = this.props;

        return (
            <body class="bg-gray-200 flex items-center justify-center h-screen">
            <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
                <div class="modal-content py-9 px-5">
                    <p class="text-4xl mb-2 text-center font-bold">{t('lek.deletingMedicineWarehouse')}</p>
                    <img src="/images/znakZapytaniaPies.png" alt={"ZnakZapytaniaPies"}/>

                    <div class="flex justify-end pt-2">
                        <Link to="/leki">
                            <button
                                class="px-4 bg-transparent p-3 rounded-lg text-blue-400 hover:bg-gray-100 hover:text-blue-400 mr-2">{t('button.back')}</button>
                        </Link>
                        <button onClick={() => this.removeLek(idStanLeku)}
                                class=" px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t('lek.deleteMedicine')}</button>
                    </div>
                </div>
            </div>
            </body>
        )
    }
}

const withNavigate = Component => props => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate}/>;
};

const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};

export default withTranslation()(withRouter(withNavigate(UsuniecieLekuMagazyn)));