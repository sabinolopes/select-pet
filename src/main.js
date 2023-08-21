import './style.css';
import '../dist/output.css';
import Swal from 'sweetalert2';

const img = document.querySelector('img');
const buttonCat = document.querySelector('#btn-cat');
const buttonDog = document.querySelector('#btn-dog');
const buttonSurprise = document.querySelector('#btn-surprise');
const dogAPI = 'https://dog.ceo/api/breeds/image/random';
const catAPI = 'https://api.thecatapi.com/v1/images/search';

const handleError = (error, message) => {
  Swal.fire({
    title: message,
    text: error.message,
    icon: 'error',
    confirmButtonText: 'Ok 😭',
  });
};

const getDogImg = () => {
  fetch(dogAPI)
    .then((response) => response.json())
    .then((data) => {
      const { message } = data;

      img.src = message;
    })
    .catch((error) => handleError(error, 'Dog not found'));
};

const getCatImg = () => {
  fetch(catAPI)
    .then((response) => response.json())
    .then((data) => {
      const [obj] = data;
      const { url } = obj;

      img.src = url;
    })
    .catch((error) => handleError(error, 'Cat not found'));
};

buttonDog.addEventListener('click', getDogImg);

buttonCat.addEventListener('click', getCatImg);

buttonSurprise.addEventListener('click', () => {
  Promise.any([
    fetch(dogAPI),
    fetch(catAPI),
  ])
    .then((res) => res.json())
    .then((data) => {
      const petURL = data.message || data[0].url;

      img.src = petURL;
    })
    .catch((error) => handleError(error, 'Pet not found'));
});
