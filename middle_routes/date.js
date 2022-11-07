module.exports = formatDate = (date, format = 'yyyy-mm-dd') => {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yyyy: date.getFullYear()
    }
    return format.replace(/mm|dd|yyyy/gi, matched => map[matched])
}