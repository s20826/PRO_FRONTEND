import {Link} from "react-router-dom";

function LekListTable(props){
    // const { t } = useTranslation();
    const list = props.leki
    return (
        <>
            <table className="table-list">
                <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Ilosc</th>
                    <th>Jednostka miary</th>
                    <th>Akcje</th>
                </tr>
                </thead>
                <tbody>
                { list.map( lek => (
                    <tr key={lek.IdLek}>
                        <td>{lek.Nazwa}</td>
                        <td>{lek.Ilosc}</td>
                        <td>{lek.JednostkaMiary}</td>
                        <td>
                            <ul className="list-actions">
                                <li><Link to={`/leki/${lek.IdLek}`}
                                          className="list-actions-button-details"
                                >Szczegóły</Link></li>
                                {/*<li><Link to={`/leki/${lek.Idlek}`}*/}
                                {/*          className="list-actions-button-edit"*/}
                                {/*>Edytuj</Link></li>*/}
                                {/*<li><Link to={``}*/}
                                {/*          className="list-actions-button-delete"*/}
                                {/*>Usuń</Link></li>*/}
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/*<form className="form">*/}
            {/*    {isAdmin() &&*/}
            {/*    <div className="form-buttons">*/}
            {/*        <Link to={`/kluby/add`} className="form-button-submit">{t('kluby.form.list.btnLabel')}</Link>*/}
            {/*    </div>*/}
            {/*    }*/}
            {/*</form>*/}
        </>
    )
}

export default LekListTable