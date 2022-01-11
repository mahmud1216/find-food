const toggleLoading = (loading) => {
  document.getElementById("spinner").style.display = loading;
};
const toggleMeals = (loading) => {
  document.getElementById("search-result").style.display = loading;
};

///search bar

const searchFood = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  searchField.value = "";
  toggleLoading("block");

  if (searchText == "") {
    const alart = document.getElementById("alart");
    alart.style.display = "block";
  } else {
    alart.style.display = "none";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.meals));
  }

  ///display food

  const displaySearchResult = (meals) => {
    if (meals.length == 0) {
    }
    const searchResultContainer = document.getElementById("search-result");
    searchResultContainer.textContent = "";
    meals.forEach((meal) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
            <div onclick="showMoreDetails(${meal.idMeal})" class="card h-100">
              <img src="${meal.strMealThumb}">
              <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
              </div>
            </div>
      `;
      searchResultContainer.appendChild(div);
      toggleLoading("none");
    });

    ///show more details of food

    showMoreDetails = (mealId) => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => showMealsDetails(data.meals[0]));
    };

    const showMealsDetails = (meals) => {
      const getmodal = document.getElementById("show-details");
      getmodal.textContent = "";
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
          <img src="${meals.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${meals.strMeal}</h5>
            <p class="card-text">${meals.strInstructions}</p>
            <a href="${meals.strYoutube}" class="btn btn-primary btn-center">Video</a>
          </div>
    `;
      getmodal.appendChild(div);
    };
  };
};
