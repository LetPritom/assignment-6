const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/categories`;
    fetch(url)
    .then((res) => res.json())
    .then((category) => displayCategory(category.categories));
}

// displayCategory aside link

const displayCategory = (names) => {
    names.forEach((name) => {
        // console.log(name.category_name);
        const categoryButtonContainer = document.getElementById('cate-btn');
        const createElement = document.createElement('li');
        createElement.innerHTML= `
        <li class="hover:bg-[#15803D] transition hover:text-white font-medium px-4 py-1 cursor-pointer">${name.category_name}</li>`;
        categoryButtonContainer.append(createElement);
        
    })
}

// display all plants
const dataAllPlants = () => {
    const url =`https://openapi.programming-hero.com/api/plants`;
    fetch(url)
    .then((res) => res.json())
    .then((info) => displayCartDetails(info.plants));
};

const displayCartDetails = (plants) => {
     plants.forEach((plant) => {
        // console.log(plant.image);
        const accCartContainer = document.getElementById('show-card');
        // accCartContainer.innerHTML= "";
        const createContainer = document.createElement('div');
        createContainer.innerHTML = `
        <div class="card bg-base-100 w-80 shadow-lg">
            <figure>
              <img
                src="${plant.image}"
                alt="${plant.name}"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${plant.name}</h2>
              <p>
                ${plant.description}
              </p>
              <div class="category-info flex justify-between my-4">
                <button class="py-1 px-2  font-semibold border border-[#15803D] rounded-xl cursor-pointer">${plant.category}</button>
                <span class="text-lg font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</span>
              </div>
              <div class="card-actions justify-end">
                <button class="bg-[#15803D] text-lg text-white
                py-2 my-2  w-80 rounded-2xl font-semibold cursor-pointer border hover:bg-white transition hover:border border-[#15803D] hover:text-black">Buy Now</button>
              </div>
            </div>
          </div>
        
        `;
        accCartContainer.append(createContainer);

     })
}

dataAllPlants();
loadCategories();


