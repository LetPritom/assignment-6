const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/categories`;
    fetch(url)
    .then((res) => res.json())
    .then((category) => displayCategory(category.categories));
}

const displayCategory = (names) => {
    names.forEach((name) => {
        console.log(name.category_name);
        const categoryButtonContainer = document.getElementById('cate-btn');
        
    })
}

loadCategories();
