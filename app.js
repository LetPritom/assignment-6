const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/categories`;
    fetch(url)
    .then((res) => res.json())
    .then((category) => displayCategory(category.categories));
}


// responsive for mobile
const hamburgToggle = document.getElementById(`menu-toggle`);
const forMobile = document.getElementById(`mobile-menu`);

hamburgToggle.addEventListener(`click` , () => {
  forMobile.classList.toggle(`hidden`)
})


// manage spinner

const manageSpinner = (status) => {
  if(status === true){
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('show-card').classList.add('hidden');
  } else {
     document.getElementById('show-card').classList.remove('hidden');
    document.getElementById('spinner').classList.add('hidden');
  }
}


// remove active class

const removeActiveClass = () => {
  const selectAllButton = document.querySelectorAll(`.common-btn`)
 selectAllButton.forEach((btn) => btn.classList.remove('active'));
}

// drop category 
let isDropCategoryLoaded = false;

const loadDropCategories = () => {
  const dropDownList = document.getElementById('new-id');
   dropDownList.classList.toggle('hidden');
   if (isDropCategoryLoaded) {
    return;
   } else {
    isDropCategoryLoaded = true;
   }
  
    const url = `https://openapi.programming-hero.com/api/categories`;
    fetch(url)
    .then((res) => res.json())
    .then((category) => dropDownFunction(category.categories));
}
const dropDownFunction = (downs) => {
        const dropDown = document.getElementById('new-id');
        dropDown.innerHTML = "";
  downs.forEach((down) => {
      const createElement = document.createElement('li');
    createElement.setAttribute('id', `select-btn-${down.id}`);
    createElement.setAttribute('onclick', `accessLiItem(${down.id})`);
    createElement.className = "common-btn hover:bg-[#15803D] transition hover:text-white font-medium px-4 py-1 cursor-pointer rounded-lg my-1";
    createElement.textContent = down.category_name;
    dropDown.appendChild(createElement);
  })
         
}

// displayCategory aside link

const displayCategory = (names) => {
    names.forEach((name) => {
        // console.log(name.category_name);
        const categoryButtonContainer = document.getElementById('cate-btn');
        const createElement = document.createElement('li');
        createElement.innerHTML= `
        <li id="select-btn-${name.id}" onclick="accessLiItem(${name.id})" class="common-btn hover:bg-[#15803D] transition hover:text-white font-medium px-4 py-1 cursor-pointer rounded-lg my-1">${name.category_name}</li>`;
        categoryButtonContainer.append(createElement);
        
    })
}
// there are all onclick handler in this function
// access list itmes buttons and category trees display 

 const accessLiItem = (id) => {
    manageSpinner(true);
    const categoryTreesApiUrl =`https://openapi.programming-hero.com/api/category/${id}`
    fetch(categoryTreesApiUrl)
    .then((res) => res.json())
    .then((categoryInfo) => {
      // remove active class then and added an active class these are here
       removeActiveClass();
    
    const clickBtn = document.getElementById(`select-btn-${id}`);
    clickBtn.classList.add(`active`);
    displayCartDetails(categoryInfo.plants);
    });

 }



// save all data globally for showing modal in this variable

 let allDataPlants = [];
 
//  save all data globally for removing data in cart list 

 let cartItems = [];


// remove cart item
const removedCartItem =(index) => {
  cartItems.splice(index, 1)
  showDisplayWishlist();
}

 // add wishlistData
const wishlistAdd = (wishLoad) => {
console.log(wishLoad);
const wishMatchPlants = allDataPlants.find((plantDetails) => plantDetails.id === wishLoad);
if(wishMatchPlants) {
  cartItems.push(wishMatchPlants)
  showDisplayWishlist(wishMatchPlants)
} else {
  console.error(`404 not found`)
}
};

const showDisplayWishlist = () => {
   const accessWishlistContainer = document.getElementById(`wishlist`);
   accessWishlistContainer.innerHTML=`<h1 class="text-lg font-semibold mb-2">Your Cart</h1>`
  let totalPrice = 0 ;
  cartItems.forEach((item , index) => {
    totalPrice += item.price;
    const wishDiv = document.createElement(`div`);
   wishDiv.innerHTML = `
    <div class="w-full max-w-xs bg-white shadow-lg rounded-lg p-2 flex items-start justify-between gap-5">
          <div class="align flex flex-col gap-2">
          <p>${item.name}</p>
          <p><i class="fa-solid fa-bangladeshi-taka-sign"></i>${item.price}</p>
          </div>
            <button onclick="removedCartItem(${index})" class="cursor-pointer"><i class="fa-solid fa-xmark"></i></button>
         </div>
   `;
   accessWishlistContainer.append(wishDiv);
  })
  const totalP = document.createElement(`p`);
  totalP.className = "my-2 ml-2 font-semibold";
  totalP.innerHTML =` 
    <i class="fa-solid fa-bangladeshi-taka-sign"></i> Total: ${totalPrice}
  `;
  accessWishlistContainer.append(totalP);
   
}


//  loading modal dynamicly

const loadingModalData = (newId) => {
  const matchPlants= allDataPlants.find((plant) => plant.id === newId);
  if (matchPlants) {
    displayModalData(matchPlants);
  } else {
    console.error('plants not found');
  }
 
};


// show Modal on display
const displayModalData = (modal) => {
 const accessModalContainer = document.getElementById('detail-container');
 accessModalContainer.innerHTML=`
  <h2 class="font-semibold text-lg my-1">${modal.name}</h2>
        <img class="w-full h-auto max-h-58 object-cover rounded-lg" src="${modal.image}" alt="">
        <h3 class="font-semibold my-1">Category <span>:</span> <span>${modal.category}</span></h3>
        <h3 class="font-semibold my-1">Price <span>:</span> <span class="text-md font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${modal.price}</span></h3>
        <h3 class="font-semibold my-1">Description <span>: ${modal.description}</span></h3>
    </div>
 `;
 document.getElementById('my_modal_5').showModal();
}

// display all plants
const dataAllPlants = () => {
    manageSpinner(true);
    const url =`https://openapi.programming-hero.com/api/plants`;
    fetch(url)
    .then((res) => res.json())
    .then((info) => {
      allDataPlants = info.plants
      displayCartDetails(info.plants)
    });
};

const displayCartDetails = (plants) => {
          const accCartContainer = document.getElementById('show-card');
        accCartContainer.innerHTML= " ";
     plants.forEach((plant) => {
        // console.log(plant.image);
        const createContainer = document.createElement('div');
        createContainer.innerHTML = `
        <div class="card bg-base-100 w-full max-w-xs h-full rounded-2xl shadow-xl mx-auto">
            <figure>
              <img class="w-60 h-auto max-h-55 object-cover rounded-lg"
                src="${plant.image}"
                alt="${plant.name}"
              />
            </figure>
            <div class="card-body">
              <h2 onclick="loadingModalData(${plant.id})" class="card-title cursor-pointer">${plant.name}</h2>
              <p class="text-sm line-clamp-3">
                ${plant.description}
              </p>
              <div class="category-info flex justify-between my-4">
                <button class="py-1 px-3 text-sm  font-semibold border border-[#15803D] rounded-md cursor-pointer hover:bg-[#15803D] transition hover:text-white">${plant.category}</button>
                <span class="text-sm font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</span>
              </div>
              <div class="card-actions justify-end">
                <button onclick="wishlistAdd(${plant.id})" class="bg-[#15803D] text-lg text-white
                py-2 my-2  w-full rounded-2xl font-semibold cursor-pointer border hover:bg-white transition hover:border border-[#15803D] hover:text-black">Buy Now</button>
              </div>
            </div>
          </div>
        
        `;
        accCartContainer.append(createContainer);

        

     });
     manageSpinner(false);
};

dataAllPlants();
loadCategories();


