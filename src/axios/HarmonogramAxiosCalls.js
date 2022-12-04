import api from "./Api";
const harmonogramURL = 'http://localhost:36989/api/Harmonogram';

export function getHarmonogramWizyta(Date) {
    return api.get(`${harmonogramURL}?date=${Date}`);
}

export function getHarmonogramVet(idVet, Date) {
    return api.get(`${harmonogramURL}/klinika/${idVet}?Date=${Date}`);
}

export function getHarmonogram(Date) {
    return api.get(`${harmonogramURL}/klinika?date=${Date}`);
}

export async function addHarmonogram() {
    await api.post(`${harmonogramURL}/auto`);
}

export async function updateHarmonogram() {
    await api.put(`${harmonogramURL}/auto`, );
}