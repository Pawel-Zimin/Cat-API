const imgContainer = document.querySelector('.img-container');
const btnsContainer = document.querySelector('.btns-container');
const descriptionContainer = document.querySelector('.description-container');
const breedInfo = document.querySelector('.breed-description');

const urlBreeds = 'https://api.thecatapi.com/v1/breeds';
const urlImages = 'https://api.thecatapi.com/v1/images/search';
const apiKey = '35eb8582-936d-42ff-91e1-3c5be0ee3060';

let breedData;

const showRandomBreedImg = (event) => {
   const h = new Headers();
   h.append('x-api-key', apiKey);

   const reqImages = new Request(`${urlImages}?breed_ids=${event.target.getAttribute('breedID')}`, {
      headers: h,
   });

   imgContainer.innerHTML = '';
   breedInfo.textContent = '';

   fetch(reqImages)
      .then(data => data.json())
      .then(data => {
         const randomBreedImg = document.createElement('img');
         randomBreedImg.setAttribute('src', data[0].url);
         imgContainer.appendChild(randomBreedImg);

         for (const breed of breedData) {
            if(event.target.textContent === breed.name){
               breedInfo.textContent = breed.description;
            }
         }
         descriptionContainer.appendChild(breedInfo);
      })
      .catch(err => console.log(err));
}

fetch(urlBreeds)
   .then(data => data.json())
   .then(data => {
      data.forEach(element => {
         const breedNameBtn = document.createElement('button');
         breedNameBtn.textContent = element.name;
         breedNameBtn.classList.add('breedNameBtn');
         breedNameBtn.setAttribute('breedID', element.id)
         btnsContainer.appendChild(breedNameBtn);

         breedNameBtn.addEventListener('click', (event) => showRandomBreedImg(event));
      });

      breedData = data;
   })
   .catch(error => console.log('error:', error));