  // Validates that all fields are filled out correctly
 export const validateForm = (prodName, scrumMaster, prodOwner, startDate, methodology, developers) => {
    if (!prodName || !scrumMaster || !prodOwner || !startDate || !methodology || developers.length === 0) {
      return "Please fill out all fields";
    } else if (developers.length > 5) {
      return "Please input no more than 5 developers";
    } else {
      return "";
    }
  }

// Fix date format
export const dateFormat = (date) => {
    return date.replaceAll("-", "/");
}