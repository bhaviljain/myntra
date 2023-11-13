const Convenience_fee = 99
let bagitemsobjects;
onLoad()
function onLoad()
{   loadbagitemsobjects();
    displaybagItems();
    displaybagsummary()
}

function loadbagitemsobjects()
{
 bagitemsobjects = bagitems.map(itemId=>
    {
        for(let i=0; i<items.length; i++)
        {
        if(itemId == items[i].id) //data.js waley ka items hain
        {
            return items[i]
        }
        }
    })
    // console.log(bagitemsobjects);

}
function displaybagItems(){

    let containerElement = document.querySelector('.bag-items-container')
    //  containerElement.innerHTML = 
    let innerHTML= '';
    bagitemsobjects.forEach(bagitem => {
        innerHTML += generateitemHTML(bagitem)
    });
    containerElement.innerHTML = innerHTML;
}
function removefrombag(itemId)
{
  bagitems = bagitems.filter(bagitemsid => bagitemsid!=itemId)
  localStorage.setItem('bagitems',JSON.stringify(bagitems));
  loadbagitemsobjects()
  displaybagItems()
  displaybagicon()
  displaybagsummary()
}
function generateitemHTML(item)
{
return `<div class="bag-item-container">
<div class="item-left-part">
  <img class="bag-item-img" src="${item.images}">
</div>
<div class="item-right-part">
  <div class="company">${item.company_name}</div>
  <div class="item-name">${item.item_name }</div>
  <div class="price-container">
    <span class="current-price">Rs ${item.current_price}</span>
    <span class="original-price">Rs ${item.original_price}</span>
    <span class="discount-percentage">(${item.discounted_price}%OFF)</span>
  </div>
  <div class="return-period">
  <span class="return-period-days">${item.return_period} days</span> return available
</div>
<div class="delivery-details">
  Delivery by
  <span class="delivery-details-days">${item.delivery_date}</span>
</div>
</div>
<div class="remove-from-cart" onclick="removefrombag(${item.id})">X</div>
</div>`
}





function displaybagsummary()
{
  let bagsummaryelement = document.querySelector('.bag-summary')
  let totalitems =bagitemsobjects.length;
  let totalmrp = 0;
  let totaldiscount = 0;
  
  bagitemsobjects.forEach(bagitemsss=>{
    totalmrp +=bagitemsss.original_price;
    totaldiscount += bagitemsss.original_price - bagitemsss.current_price;
    
  })
  let finalpayment = totalmrp - totaldiscount + Convenience_fee;
  bagsummaryelement.innerHTML = `<div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalitems}) </div>
  <div class="price-item">
    <span class="price-item-tag">Total Mrp:</span>
    <span class="price-item-value">₹ ${totalmrp}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount">₹ ${totaldiscount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">₹ 99</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">₹ ${finalpayment}</span>
  </div>
</div>
<button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>` 
}