let productName = document.querySelector('.product_name')
let productPrice = document.querySelector('.product_price')
let btn = document.querySelector('.btn')
let productsContainer = document.querySelector('.products_container')
let basketContainer = document.querySelector('.basket_container')
let sumCount = document.querySelector('.sum_count')
let sumPrice = document.querySelector('.sum_price')


let products = JSON.parse(localStorage.getItem('mehsullar')) || []
let basket = JSON.parse(localStorage.getItem('sebet')) || []

function showProducts(arr){
    productsContainer.innerHTML=''
    arr.forEach(x=>{
        productsContainer.innerHTML += `
        <div class="product_card">
            <p>${x.name}</p>
            <button onclick="addToCart(${x.id})">add</button>
            <button onclick="deleteCart(${x.id})">delete</button>
        
        </div>
        
        ` 
    })
}

function showBasket(x){
    let sumCountArr = []
    let priceArr = []
    basketContainer.innerHTML=''
    x.forEach(y=>{
        basketContainer.innerHTML += `
        <div class="basket_card">
        <p>${y.name}</p>
        <p>Count: ${y.count}</p>
        <p>Price: ${y.count * y.price}</p>
        <button onclick="plus(${y.id})">+</button>
        <button onclick="minus(${y.id})">-</button>
        <button onclick="deleteBasket(${y.id})">delete</button>
        </div>
        
        `
        sumCountArr.push(y.count)
        priceArr.push(y.count*y.price)
    })
    // console.log(countArr);
    console.log(priceArr);
    let count = 0;
    for(i=0;i<sumCountArr.length;i++){
        count+=sumCountArr[i]
    }
    console.log(count);
    sumCount.innerHTML= `Umumi mehsul: ${count}`


    let price = 0;
    for(i=0;i<priceArr.length;i++){
        price+=priceArr[i]
    }
    console.log(price);
    sumPrice.innerHTML = `Umumi qiymet: ${price}`

}

btn.addEventListener('click',()=>{
    if(productName.value != "" && productPrice.value != ""){
        let newProduct = {
            id : products.length+1,
            name : productName.value,
            price : productPrice.value,
            
        }
        products.push(newProduct)
        console.log(products);
        showProducts(products);
        localStorage.setItem('mehsullar',JSON.stringify(products))
        productName.value = ""
        productPrice.value = ""
    }
})
function addToCart(y){
    // console.log(y);
    let checkBasket = basket.find(t=>t.id===y)
    if(checkBasket){
        checkBasket.count+=1
    }else{
        let checkPr=products.find(data=>data.id===y)
        checkPr.count=1
        basket.push(checkPr)
    }
    localStorage.setItem('sebet',JSON.stringify(basket))
    showBasket(basket)

    console.log(basket);
}

function deleteCart(x){
    let index = products.findIndex(data=>data.id===x)
    let indexBasket = basket.findIndex(data=>data.id===x)
    products.splice(index,1)
    basket.splice(indexBasket,1)
    showProducts(products)
    showBasket(basket)
    localStorage.setItem('mehsullar',JSON.stringify(products))
    localStorage.setItem('sebet',JSON.stringify(basket))
}

function plus(a){
    let checkBasket = basket.find(x=>x.id===a)
    checkBasket.count+=1
    showBasket(basket)
    localStorage.setItem('sebet',JSON.stringify(basket))
}

function minus(z){
    let checkBasket = basket.find(x=>x.id===z)
    checkBasket.count-=1
    if(checkBasket.count===0){
        let index = basket.findIndex(y=>y.id===z)
        basket.splice(index,1)
    }
    showBasket(basket)
    localStorage.setItem('sebet',JSON.stringify(basket))
}

function deleteBasket(y){
    let indexBasket = basket.findIndex(x=>x.id===y)
    basket.splice(indexBasket,1)
    showBasket(basket)
    localStorage.setItem('sebet',JSON.stringify(basket))
}

window.addEventListener('load',()=>{
    showProducts(products)
    showBasket(basket)
})



