function displayitemsonhomepage()
{
    let itemsContainerElement = document.querySelector('.items-container')
   if(!itemsContainerElement){
    return;
   }

let innerHTML = '';
items.forEach(item=>{
innerHTML += ` <div class="item-container">
<img class="item-image" src="${item.images}" alt="item image">
<div class="rating">
   ${item.rating.star} ⭐ | ${item.rating.noOfReviews}
</div>
<div class="company-name">${item.company_name}</div>
<div class="item-name">${item.item_name}</div>

<div class="price">
    <span class="current-price">Rs${item.current_price}</span>
    <span class="original-price">Rs${item.original_price}</span>
    <span class="discount">(${item.discounted_price}% OFF)</span>
</div>
<button class="btn-add-bag" onclick="addtobag(${item.id})">👜 &nbsp;Add To Bag</button>
</div>
 `;
})
itemsContainerElement.innerHTML = innerHTML; 
}
let bagitems;
onLoad();

function onLoad(){
    let bagitemsStr = localStorage.getItem('bagitems');
    bagitems = bagitemsStr ? JSON.parse(bagitemsStr):[]
displayitemsonhomepage();
displaybagicon() 
}
function addtobag(itemId)
{
bagitems.push(itemId)
localStorage.setItem('bagitems',JSON.stringify(bagitems));
displaybagicon()
}
function displaybagicon()
{
    let bagitemcountElement = document.querySelector('.bag-item-count')
    if(bagitems.length>0)
    {
        bagitemcountElement.style.visibility = 'visible'

        bagitemcountElement.innerHTML = bagitems.length;

    }
    else
    {
        bagitemcountElement.style.visibility = 'hidden'
    }

}