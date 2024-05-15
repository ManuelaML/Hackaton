let productsList = [ 
    {
        productCode: 1054,
        name: 'Balón de futbol',
        unitPrice: 100000,
        stock: 30,
      },
      {
        productCode: 1055,
        name: 'Raqueta de Tenis',
        unitPrice: 320000,
        stock: 20,
      },
      {
        productCode: 1056,
        name: 'Pelota de Tenis',
        unitPrice: 50000,
        stock: 30,
      },
      {
        productCode: 1057,
        name: 'Patines',
        unitPrice: 400000,
        stock: 10,
      },
      {
        productCode: 1058,
        name: 'Bicicleta',
        unitPrice: 600000,
        stock: 12,
      },
      {
        productCode: 1059,
        name: 'Banda de resistencia',
        unitPrice: 30000,
        stock: 12,
      },
      {
        productCode: 1060,
        name: 'Colchoneta de yoga',
        unitPrice: 70000,
        stock: 12,
      },
      {
        productCode: 1061,
        name: 'Patineta',
        unitPrice: 300000,
        stock: 12,
      },
]

let productsListTable = document.getElementById('productsListTable');
let cartListTable = document.getElementById('cartList');

let visibleTableColumns = ['name', 'unitPrice', 'stock'] //TODO: implementarlo en las tablas

let translated = {
    productCode: "Código del producto",
    name: "Nombre",
    unitPrice: 'Precio unitario',
    stock: 'Cantidad disponible', 
    quantity: 'Cantidad',
}

function createTableStructure(){
    let tableHead = document.createElement('thead');
    let tableBody = document.createElement('tbody');
    let structureArray = [tableHead, tableBody];
    return structureArray;
};

function fillHeader(tableHeader, productsArray, tableType){
  if(productsArray){
    for(key in productsArray[0]){
      let headData = document.createElement('th');
      headData.textContent = translated[key];
      tableHeader.appendChild(headData);   
    }    
    let headerSelect = document.createElement('th')
    if(tableType === 'listType'){
      headerSelect.textContent = '¿Cuántos quieres comprar?'
      tableHeader.appendChild(headerSelect);
    } else {
      headerSelect.textContent = '¿Cuántos quieres retirar?'
      tableHeader.appendChild(headerSelect);
    }
  }
  return tableHeader;
}

let cart = []; 

function getProductInfo(tableRow){
  let productSelected = { 
    name: tableRow.children[1].innerText, //voy llamando a la info que tienen los hijos (innerText y value para el input)
    unitPrice: tableRow.children[2].innerText,
    quantity: parseInt(tableRow.children[4].value),
  }
  return productSelected;
}

function evaluateAddInput(tableRow){
  if(parseInt(tableRow.children[4].value) >  parseInt(tableRow.children[3].innerText)){
    tableRow.children[4].value = '';
    alert('La cantidad que escribiste supera a la disponible');
    return false;
  }
  else if(isNaN(parseInt(tableRow.children[4].value)) || isNaN(Number(tableRow.children[4].value))){
    tableRow.children[4].value = '';
    alert('La cantidad que escribiste debe ser un número entero');
    return false;
  }
  else if (tableRow.children[4].value === "0"){
    tableRow.children[4].value = '';
    alert('La cantidad que escribiste debe ser mayor a cero');
    return false;
  }
  return true;
}

function evaluateRemoveInput(tableRow){
  if(parseInt(tableRow.children[3].value) >  parseInt(tableRow.children[2].innerText)){
    tableRow.children[3].value = '';
    alert('La cantidad que escribiste supera a la disponible');
    return false;
  }
  else if(isNaN(parseInt(tableRow.children[3].value)) || isNaN(Number(tableRow.children[3].value))){
    tableRow.children[3].value = '';
    alert('La cantidad que escribiste debe ser un número entero');
    return false;
  }
  else if (tableRow.children[3].value === "0"){
    tableRow.children[3].value = '';
    alert('La cantidad que escribiste debe ser mayor a cero');
    return false;
  }
  return true;
}

function addToCart(productSelected){
  let productExists = false;
  for(product of cart){
    if(product.name === productSelected.name){
      product.quantity += productSelected.quantity;
      productExists = true;
    }
  }
  if(productExists === false){
    cart.push(productSelected)
  }
}

function updateStockOnAdd(productSelected){
    productsList.forEach(element => {
      if(element.name === productSelected.name){
        element.stock -= productSelected.quantity;
      }
    })
}

function updateStockOnRemove(tableRow){
  productsList.forEach(element => {
    if(element.name === tableRow.children[0].innerText){
      element.stock += parseInt(tableRow.children[3].value);
    }
  })
}

function resetProductsTable(){
  while(productsListTable.firstChild){
      productsListTable.removeChild(productsListTable.firstChild);
  }  
  showProductsTable();
}

function showProductsTable(){
  fillTable(productsListTable, productsList, "listType");
}

function resetCartTable(){
    while(cartListTable.firstChild){
        cartListTable.removeChild(cartListTable.firstChild);
    }  
    showCartTable();
}

function showCartTable(){  
  fillTable(cartListTable, cart, "cartType")
  showTotal();
}

function removeFromCart(tableRow){
  let productSelectedName = tableRow.children[0].innerText;
  let quantityToRemove = parseInt(tableRow.children[3].value);
  for(index in cart){
    if(cart[index].name === productSelectedName){
      cart[index].quantity -= quantityToRemove;
    }
    if(cart[index].quantity === 0){
      cart.splice(index,1);
    }
  }
}

function fillBody(tableBody, productsArray, tableType){
  let i = 0
  for (product of productsArray){
    if(product.stock > 0 || product.quantity > 0){
      let tableRow = document.createElement('tr');
      tableRow.setAttribute
      tableBody.appendChild(tableRow);
      for(key in product){
          let rowData = document.createElement('td');
          rowData.setAttribute('id',key)
          rowData.textContent = product[key]
          tableRow.appendChild(rowData)
      } 
      let inputQuantity = document.createElement('input');
      tableRow.appendChild(inputQuantity);
      if(tableType == 'listType'){
          let buttonAdd = document.createElement('button')
          tableRow.appendChild(buttonAdd);  
          buttonAdd.textContent = 'Add to cart'
          buttonAdd.addEventListener('click', function(e){
              let productSelected = getProductInfo(e.target.parentElement) //llamo al padre que es la fila donde está el botón
              if(evaluateAddInput(e.target.parentElement)){  
                addToCart(productSelected);
                updateStockOnAdd(productSelected);
                resetProductsTable();
                resetCartTable();
              }
          })
      }
      else{
          let buttonRemove = document.createElement('button')
          tableRow.appendChild(buttonRemove);
          buttonRemove.textContent = 'Remove from cart' 
          buttonRemove.addEventListener('click', function(e){
            if(evaluateRemoveInput(e.target.parentElement)){
              removeFromCart(e.target.parentElement)
              updateStockOnRemove(e.target.parentElement)
              resetProductsTable();
              resetCartTable();
            }
          })           
      }
      i++;
    }  
  }
  return tableBody;
}

function fillTitle(table, tableType){
  let title = document.createElement('caption');
  if(tableType === 'listType'){
    title.textContent = 'Lista de productos';
  }
  else{
    title.textContent = 'Tu carrito de compras';
  }
  table.appendChild(title);
  
}

function calculateTotal(){
    let total = 0;
    for(product of cart){
        total += product.unitPrice * product.quantity;
    }
    return total;
}

function showTotal(){
    let total = document.getElementById('total');
    total.textContent = 'Total: '+ calculateTotal();
    if(calculateTotal()===0){
        total.style.display = 'none';
    }
}
function fillTable(table, productsArray, tableType){  
    if(productsArray.length > 0){
      let tableStructure = createTableStructure();
      fillTitle(table, tableType);
      let filledTableHeader = fillHeader(tableStructure[0], productsArray, tableType);
      table.appendChild(filledTableHeader)
      let filledTableBody = fillBody(tableStructure[1], productsArray, tableType);
      table.appendChild(filledTableBody)
    }
}
   
showProductsTable();

let imagenes = document.getElementsByClassName("containerimg")
for(product in imagenes){
    let title = document.createElement("h4");
    title.textContent = "Balon"
    imagenes[i].appendChild(title);
    imagen.style.display = "relative";
}

//TODO: remover productos del carrito SOLVED
//TODO: limitar agregar stock superior SOLVED
//TODO: limitar remover productos del carrito SOLVED
//TODO: limitar el uso de los botones cuando los input están en blanco SOLVED
//TODO: actualizar stock disponible en list product SOLVED
//TODO: aumentar cantidad en cart list cuando se agrega un producto que ya está SOLVED
//TODO: actualizar cantidad en cart list SOLVED
//TODO: Definir que mostrar cuando hay una tabla vacía SOLVED
//TODO: No mostrar productos con cero unidades en stock SOLVED


//no se pueden declarar funciones dentro de otra funcion. Es por eso que se llaman todas las primeras funciones en fillTable() para robustez del codigo.