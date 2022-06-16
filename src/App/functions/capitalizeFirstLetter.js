const capitalizeFirstLetter = (string) => {

  try {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  catch (err) {
    console.log(err)
  }

}
export default capitalizeFirstLetter;