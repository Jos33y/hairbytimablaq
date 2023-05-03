 
const formatString = (f_string) => {
    return f_string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


export default formatString; 