// var dialogObjects = [
//     {
//         name: "deleteRowObject",
//         title: "Elem törlése",
//         body: "Biztosan törölni szeretnéd a következőt?",
//         id: "delete-row-dialog",
//         color: "danger",
//         text: "Törlés"
//     },
//     {
//         name: "endOfExcercise",
//         title: "Gyakorlás vége",
//         body: "Biztosan ki szeretnél lépni a gyakorlásból?",
//         id: "stop-excercise-dialog",
//         color: "warning",
//         text: "Kilépés"
//     }
// ];

//'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
function generateID() {
    return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


// export { dashboardMenuItems, excerciseTypes, excerciseRunTime, dialogObjects };