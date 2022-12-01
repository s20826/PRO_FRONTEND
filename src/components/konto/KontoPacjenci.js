import React from "react";
import PacjentKlientListTable from "../pacjent/PacjentKlientListTable";
import {getKlientPacjentList} from "../../axios/PacjentAxiosCalls";
import KontoMenu from "../fragments/KontoMenu";

class KontoPacjenci extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: '',
            message: '',
            user: '',
            pacjenci: [],
            notice: ''
        }
    }

    async componentDidMount() {
        const {navigate} = this.props;
        try {
            const res = await getKlientPacjentList(this.state.idKlient);
            const data = await res.data

            this.setState({
                pacjenci: data
            });
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {error, isLoaded, pacjenci} = this.state
        let content;

        if (error) {
            content = <p>Błąd: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>Ładowanie...</p>
        } else {
            content = <PacjentKlientListTable pacjenci={pacjenci}/>
        }


        return (
            <div class="container w-full flex flex-wrap mx-auto px-2  lg:pt-3 mt-3">
                <KontoMenu/>
                <div
                    class="w-full lg:w-5/6 p-8 mt-6 lg:mt-0 text-gray-900 leading-normal bg-white border border-gray-400 border-rounded">
                    <section class="bg-white-100 border-b  ">
                        <div class="container max-w-5xl mx-auto m-0">
                            <div className="w-full mb-4">
                                <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"/>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="w-full p-6">
                                    <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                                        Zwierzęta
                                    </h3>
                                    {content}
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

// const withRouter = WrappedComponent => props => {
//     const params = useParams();
//     return (
//         <WrappedComponent
//             {...props}
//             params={params}
//         />
//     );
// };

export default KontoPacjenci;