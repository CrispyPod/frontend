export function assembleErrorMessage(e: any): string {
    let errMessage = '';
    if (Object.keys(e.response.data).length > 0) {
        for (var k of Object.keys(e.response.data)) {
            errMessage += k + ': ' + e.response.data[k].message + '\n';
        }
    } else {
        errMessage = e.response.message;
    }
    return errMessage;

}