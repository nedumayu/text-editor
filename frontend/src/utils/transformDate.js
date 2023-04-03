export default function transformDate (date) {
    return date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4) +
        "  " + (Number(date.slice(11, 13)) + 3) + ":" + date.slice(14, 16) + ":" + date.slice(17, 19)
}