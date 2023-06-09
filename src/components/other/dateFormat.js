export function getFormattedDate(dateSource){
    const dateObject = new Date(dateSource)
    return ('0' + dateObject.getDate()).slice(-2) + "-" + ('0' + (dateObject.getMonth()+1)).slice(-2) + '-' + dateObject.getFullYear()
}
export function getFormattedDate1(dateSource){
    const dateObject = new Date(dateSource)
    return ('0' + dateObject.getDate()).slice(-2) + "." + ('0' + (dateObject.getMonth()+1)).slice(-2) + '.' + dateObject.getFullYear()
}

export function getFormattedDateWithHour(dateSource){
    return dateSource.replace('T', ' ').replace(':00', '')
}
export function getFormattedHour(dateSource){
    return dateSource.toString().replace(':00', '')
}