function parsePrice (ammount) {


    // Check if the amount is a number if not covert it to number
    if (typeof ammount !== 'number') {
        ammount = parseFloat(ammount);
    }

    // Format price to INR without .00 at the end
    const formattedPrice = ammount.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    return formattedPrice;
}

export default parsePrice;