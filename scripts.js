const restaurantApp = {}

const $selectedCity = $('#citySelection');
const $cuisine = $('#cuisine');
const $submit = $('#submit');
const $form = $('#form');
const $userSelectionPage = $('.userSelectionPage');
const $restaurantDisplay = $('#restaurantDisplay');

const resultArray = [];

// $restaurantDisplay.empty();

$form.on('submit', function(e) {
    e.preventDefault();

    restaurantApp.getInput();

   
});

restaurantApp.getInput = function() {
    const entityId = parseInt($selectedCity.val());

    const cuisineId = parseInt($cuisine.val());

    console.log(entityId, cuisineId);

    if(entityId !== entityId || cuisineId === undefined) {
        console.log('error message');
    } else {
        restaurantApp.ajaxRequest(entityId, cuisineId);
    }
}

// ajax call to zomato
restaurantApp.ajaxRequest = function (entityId, cuisinesId) {
    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/search?",
        type: "GET",
        dataType: "JSON",
        data: {
            // sort: 'rating',
            // order: 'desc',
            entity_id: entityId,
            cuisines: cuisinesId

        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("user-key", "b7d63a85e5a9127cf51fb71ccf4c92e6");
        },
        success: function (ajaxResult) {
            $restaurantDisplay.empty();
            restaurantApp.filterResult(ajaxResult);
        },
        error: function () {
            $restaurantDisplay.html(`
                < h2 >There seems to be an error in your input.Please double check.</h2>
            `)
        }
    });
}

restaurantApp.filterResult = function (ajaxResult) {

    const restaurantArray = ajaxResult.restaurants;

    for (restaurantObj of restaurantArray) {
        const restaurant = restaurantObj.restaurant;
        const image = restaurant.featured_image;

        if (image && resultArray.length <= 12) {
            resultArray.push(restaurant);
        }
    }

    restaurantApp.displayAjaxResult(resultArray);
}

restaurantApp.displayAjaxResult = function(result) {
    $('html, body').animate({
        scrollTop: $("#restaurantDisplay").offset().top
    }, 1000);

    for (item of result) {
        console.log (item);

        const { cuisines, featured_image, location, name, price_range, url, user_rating} = item;

        const rating = user_rating.aggregate_rating;
        const address = location.address

        $restaurantDisplay.append(`
            <div class='singleRestaurant'>
                <h2>${name}</h2>
                <img src='${featured_image}' alt='A featured image of ${name}'/>

                <h3>Cuisine Type</h3>
                <p>${cuisines}</p>

                <div class='ratingStat'>
                    <div class='userRating'>
                        <h3>Rating</h3>
                        <p>${rating}/5</p>
                    </div>
                    <div class='priceRange'>
                        <h3>Price</h3>
                        <p>${price_range}/5</p>
                    </div>
                </div>

                <h3>Address</h3>
                <p>${address}</p>

                <div className="moreInfoLink">
                    <a href="${url}">more info</a>
                </div>
            </div>
        `)

        $reset
    }
}








//doc ready
$('document').ready(function() {




});