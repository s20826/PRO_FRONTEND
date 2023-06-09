import {Link, useLocation} from "react-router-dom";
import React from "react";
import {useTranslation} from "react-i18next";
import {isKlient} from "../other/authHelper";

function PotwierdzenieUmowieniaWizyty() {
    const {t} = useTranslation();
    const location = useLocation();
    const wybranaData = location.state.Data
    return (
        <main>
            <div className="w-full flex flex-wrap ">
                <div className="bg-white max-w-lg mx-auto p-6 md:p-8 my-10 rounded-lg shadow-2xl">
                    <div className="mx-10">
                        <div class=" py-9 px-7 text-center px-5">
                            <div class="flex justify-between items-center pb-3">
                                <p class="text-3xl font-bold text-blue-400 p-1">{t("wizyta.thankYou")}</p>
                            </div>
                            <p class="text-2xl">{t("wizyta.confirmation")}</p>
                            <p class="text-2xl font-bold">{t("wizyta.date") + ": " + wybranaData.replaceAll("-", ".")}</p>
                            <img src="/images/gti.png" alt={"gti"}></img>
                            <div class="flex justify-end pt-2">
                                <Link to={isKlient() ? "/mojeWizyty":"/wizyty" }>
                                    <button
                                        class="px-4 bg-blue-400 p-3 rounded-lg text-white hover:bg-blue-400">{t("button.back")}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PotwierdzenieUmowieniaWizyty