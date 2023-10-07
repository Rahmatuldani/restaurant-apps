const Alert = (error) => {
  const element = document.querySelector('.alert');
  element.classList.remove('hidden');

  if (error.response) {
    element.innerHTML = `<span>Server Error : ${error.response.data.message}</span>`;
  } else if (error.request) {
    element.innerHTML = `<span>Network Error : ${error.message}</span>`;
  } else {
    element.innerHTML = `<span>Request Error : ${error.message}</span>`;
  }
};

export default Alert;
