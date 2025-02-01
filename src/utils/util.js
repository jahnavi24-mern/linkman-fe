export const formatDate = (isoString) => {
    const dateObj = new Date(isoString);

    const options = {
        month: 'short', 
        day: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    return dateObj.toLocaleString('en-US', options).replace(',', '');
};


export const formatStatus = (expiry) => {
    if (!expiry) {
        return "Active";
    }
    const currentDate = new Date();
    const expiryDate = new Date(expiry);

    if (expiryDate < currentDate) {
        return "Not Active";
    } else {
        return "Active";
    }
}

export const formatDateToDay = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);

}