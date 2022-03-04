const card_div = $('#card-div')
const added_item_div = $('.added-item-div')
const total_product_count = $('.item-count')

let products;   //for products from shop
let added_product = [];     //for item that user added to cart
let countOf_added_product = 0;


// get products from server
$.get("https://fakestoreapi.com/products",function(data){
    products = data;
    create_card(products)
})

// get category from server
$.get("https://fakestoreapi.com/products/categories",function(data){
    const category_select = $('#category-select')
    data.map(category => {
        category_select.append(`<option value="${category}">${category}</option>`)
    })
})

// open cart btn 
$('.open-cart-btn').click(() => {
    $('.cart-div').removeClass('d-none');
    $('.additem-cart').addClass('animate__slideInRight');
})

// close cart btn
$('.cart-bg').click( () => {
    $('.cart-div').addClass('d-none');
    $('.additem-cart').removeClass('animate__slideInRight');
})

$('.cart-backspace-btn').click( () => {
    $('.cart-div').addClass('d-none');
    $('.additem-cart').removeClass('animate__slideInRight');
})


// category select 
$('#category-select').change(function(){
    let val_seleted = $(this).val()
    if (val_seleted != "all") {
        create_card(filter_product(val_seleted))
    }else{
        create_card(products)
    }
})

// products search 
$('#search-bar').keyup(function(){
    let key_search = $(this).val().toLowerCase()
    if(key_search.trim().length){
        create_card(filter_product(key_search))
    }else{
        create_card(products)
    }
})

// for searching -- filter product function
function filter_product(search_val) {
    return result_product = products.filter(product => {
        let need_search = obj => obj.toLowerCase().indexOf(search_val)
        if (need_search(product.title) > -1 || need_search(product.description) > -1 || need_search(product.category) > -1) {
            return product;
        }
    })
}

// adding item to cart function
function adding_items_tocart(id) {
    let added_product = products.filter( product => {
        if(product.id == id){
            return product 
        }
    })
    create_added_cart(added_product[0])
    total_product_count.text(++ countOf_added_product)
}

// create product card function
function create_card(temp_products) {
    card_div.empty()
    temp_products.map(product => {
        card_div.append(`
            <div class=" card-div col-12 col-md-6 col-lg-4 px-3 mb-5">
                <div class=" product-card-div card shadow-lg" style="height: 55vh;">
                    <input type="hidden" value="${product.id}" class="id">
                    <input type="hidden" value="${product.category}" class="category">
                    <div class=" card-body" style="height: 80%">
                        <div class=" w-auto border d-flex justify-content-center align-items-center overflow-hidden" style="height: 70%;">
                            <div class=" card-photo d-flex justify-content-start align-items-end" style="background-image: url(${product.image});">
                            <div class=" rating-div m-2 d-flex w-100">
                                <i class=" bi-star-fill text-warning"></i>
                                <i class=" bi-star-fill text-warning"></i>
                                <i class=" bi-star-fill text-warning"></i>
                                <i class=" bi-star"></i>
                                <i class=" bi-star"></i>
                                <div class=" rating-count ms-3"><span class=" fw-bold">${product.rating.count}</span></div>
                            </div>
                        </div>
                    </div>
                        <div class=" card-detil mx-3 overflow-hidden" style="height: 30%;">
                            <h3 class=" mt-2 fs-4 text-nowrap border-bottom text-primary">${product.title}</h3>
                            <p class=" text-secondary">${product.description}</p>
                        </div>
                    </div>
                    <div class=" card-footer d-flex justify-content-between align-items-center mx-3 my-2">
                        <div class=" card-prize">
                            <span class=" text-primary fs-5 fw-bold">$ ${product.price}</span>
                        </div>
                        <button class=" btn btn-primary px-3 fw-bold add-to-cart-btn" style="border-radius: 10rem !important;">Add to Cart <i class=" bi-cart-plus-fill fs-5"></i></button>
                    </div>
                </div>
            </div>
        `);
    })
    // add-to-cart button 
    $('.add-to-cart-btn').click( function() {
        let selected_product_id = $(this).parent().parent().children('.id').val();
        adding_items_tocart(selected_product_id)
    })
}

function create_added_cart(added_product) {
        added_item_div.append(`
            <div class=" added-item-card w-100 my-3" style="height: 25vh;">
                <div class=" card h-100 w-100 m-auto shadow-lg py-2">
                    <input type="hidden" value="${added_product.id}" class="id">
                    <div class=" d-flex justify-content-between align-items-center w-100" style="height: 55%;">
                        <div class=" h-100 " style="width: 60%;">
                            <div class=" card-photo" style="background-image: url(${added_product.image});"></div>
                        </div>
                        <button class=" btn btn-danger me-4" onclick="delete_cart(this)"><i class=" bi-trash-fill"></i></button>
                    </div>
                    <div class=" mx-auto mt-1 overflow-hidden border-bottom" style="height: 15%; width: 90%;">
                        <p class=" text-nowrap fw-bold">${added_product.title}</p>
                    </div>
                    <div class=" w-100 d-flex justify-content-between align-items-center" style="height: 30%;">
                        <div class=" item-quantity d-flex m-3" style="width: 65%;">
                            <button class=" btn btn-outline-primary" onclick="item_count_btn(this,'-')"><i class=" bi-dash"></i></button>
                            <p class=" m-0 mx-3 fw-bold fs-5 text-primary"><span> 1 </span></p>
                            <button class=" btn btn-outline-primary" onclick="item_count_btn(this)"><i class=" bi-plus"></i></button>
                        </div>
                        <div class=" d-flex justify-content-center align-items-center h-100 item-cost-div" style="width: 35%;">
                            <p class=" m-0 fw-bold fs-5 text-primary">$ <span class=" item-cost">${added_product.price}</span>
                                <input type="hidden" value="${added_product.price}" class="val"></p>
                        </div>
                    </div>
                </div>
            </div>
        `)
    refresh_cart_totalCost()
}

function item_count_btn(btn,ass = '+') {
    // calculate product count
    let product_count_span = $(btn).parent().children('p').children()
    let product_count = Number(product_count_span.text())
    if (ass == '+') {
        product_count ++;
    } else {
        if (product_count > 1) {
            product_count --;   
        }else{
            return;
        }
    }
    product_count_span.text(product_count)

    // use product count and calculate product total cost
    let product_cost_p = $(btn).parent().parent().children('.item-cost-div').children()
    let product_cost_val = product_cost_p.children('.val').val()
    product_cost_val = product_cost_val * product_count;
    product_cost_val = product_cost_val.toFixed(2)
    product_cost_p.children('.item-cost').text(product_cost_val)

    refresh_cart_totalCost()
}



function refresh_cart_totalCost() {
    let price_spans = document.querySelectorAll('.item-cost')
    let total_cost = 0;
    price_spans.forEach(price_span => {
        total_cost += Number(price_span.innerHTML)
    })
    
    $('.total-cost').text(total_cost.toFixed(2))
}

// delete cart-added-item button
function delete_cart(cart_del_btn) {
    $(cart_del_btn).parent().parent().parent().remove()
    total_product_count.text(-- countOf_added_product)
    refresh_cart_totalCost()
}
