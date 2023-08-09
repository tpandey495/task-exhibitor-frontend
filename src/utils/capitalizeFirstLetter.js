// To convert a string to pascal case
function capitalizeFirstLetter(str) {
    if (typeof str !== 'string' || str.length === 0) {
      return str; // Return unchanged if input is not a string or is an empty string
    }
   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  
 export default capitalizeFirstLetter;
  