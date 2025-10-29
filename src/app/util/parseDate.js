function parseDate(date) {
    return ( 
        // Fn to parse 2025-01-08 to Jan 2025
        new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        })
     );
}

export default parseDate;