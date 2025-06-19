const showProductManage = (event) => {
  if (event) {
    toggleMenuActive();
    event.target.classList.add("active");
  }
  let list = productStore.readProduct();
  let maxPrice = productStore.getMaxPrice();
  let maxQuantity = productStore.getMaxQuantity();
  let html = `<h1>PRODUCT MANAGEMENT</h1>

        <form id="product-form" onsubmit="addProduct(event)">
          <input type="text" id="product-name" placeholder="Product Name" required />
          <input type="number" id="product-price" min="0" placeholder="Price" required />
          <input type="text" id="product-image" placeholder="Image url" required />
          <input type="number" id="product-quantity" placeholder="Quantity" required />
          <textarea id="product-description" placeholder="Description" rows="1" required></textarea>
          <select id="product-category" required>
            <option value="" readonly>-- Category --</option>
          ${categoryStore
            .readCate()
            .map((item) => `<option value="${item.id}">${item.name}</option>`)
            .join("")}
          </select>
          <select id="product-brand" required>
            <option value="">-- Brand --</option>
          ${brandStore
            .readBrand()
            .map((item) => `<option value="${item.id}">${item.name}</option>`)
            .join("")}
          </select>
          <br />
          <a id="btn_action">
            <button id="btn_save" type="submit">Add new product</button>
          </a>
        </form>

        <div>
          <input type="text" class="searchInput" id="searchProduct" oninput="searchProduct()" placeholder="Search by name" />
          <div class="filter-container">
            <button class="btn_filter" onclick="toggleFilterPopup()">
              Filter <span class="icSearch"><i class="fa-solid fa-magnifying-glass"></i></span>
            </button>
            <div id="filter-popup" class="filter-popup hidden">
            <div class="rangeSearch">
                <label>Range Price: $0 to <span id="rangePrice">$${maxPrice}</span></label>
                0 <input oninput="displayRangePrice(event)" type="range" id="filterPrice" value="${maxPrice}" min="0" max="${maxPrice}"/> ${maxPrice}
                <label>
              </div>
              <div class="rangeSearch">
                <label>Range Quantity: 0 to <span id="rangeQuantity">${maxQuantity}</span></label>
                0 <input oninput="displayRangeQuantity(event)" type="range" id="filterQuantity" value="${maxQuantity}" min="0" max="${maxQuantity}"/> ${maxQuantity}
                <label>
              </div>
                <select id="filter-category">
                  <option value="">-- category --</option>
                  ${categoryStore
                    .readCate()
                    .map((item) => `<option value="${item.id}">${item.name}</option>`)
                    .join("")}
                </select>
              </label>
              <label>
                <select id="filter-brand">
                  <option value="">-- brand --</option>
                  ${brandStore
                    .readBrand()
                    .map((item) => `<option value="${item.id}">${item.name}</option>`)
                    .join("")}
                </select>
              </label>
              <button class="btn_apply" onclick="applyFilter()">Apply</button>
              <button class="btn_reset" onclick="resetFilter()">Reset</button>
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Quantity</th>
              <th>Description</th>
              <th colspan="2">Action</th>
            </tr>
          </thead>
          <tbody id="product-table"></tbody>
        </table>`;
  document.getElementById("main-content").innerHTML = html;
  showDataProductTable(list);
};

const showDataProductTable = (list) => {
  let html = "";
  for (let i = 0; i < list.length; i++) {
    html += `<tr>
        <td>
        <img src="${list[i].image}" alt="" width="40" height="40"/>
        <p style="margin-left: 10px">${list[i].name}</p>
        </td>
        <td>$${list[i].price}</td>
        <td>${productStore.getCategoryName(list[i].category_id)}</td>
        <td>${productStore.getBrandName(list[i].brand_id)}</td>
        <td>${list[i].quantity}</td>
        <td>${list[i].description}</td>
        <td><button class="action-btn edit-btn" onclick="showProductEdit('${
          list[i].id
        }')">Edit</button></td>
        <td><button class="action-btn delete-btn" onclick="removeProduct('${
          list[i].id
        }')">Delete</button></td>
      </tr>`;
  }
  document.getElementById("product-table").innerHTML = html;
};

const showProductEdit = (id) => {
  let product = productStore.getOneProduct(id);
  let data = getElementInput();
  data.name.value = product.name;
  data.price.value = product.price;
  data.brand.value = product.brand_id;
  data.cate.value = product.category_id;
  data.image.value = product.image;
  data.quantity.value = product.quantity;
  data.description.value = product.description;
  if (!document.getElementById("btn_cancel")) {
    let buttonCancel = document.createElement("button");
    buttonCancel.type = "button";
    buttonCancel.id = "btn_cancel";
    buttonCancel.classList.add("btn_cancel");
    buttonCancel.textContent = "Cancel";
    buttonCancel.onclick = cancelEditProduct;
    document.getElementById("btn_action").appendChild(buttonCancel);
  }
  document.getElementById("btn_save").innerHTML = "Save";
  let form = document.getElementById("product-form");
  form.onsubmit = (e) => {
    e.preventDefault();
    editProduct(id);
  };
};

const cancelEditProduct = () => {
  showProductManage();
};

const getElementInput = () => {
  let name = document.getElementById("product-name");
  let price = document.getElementById("product-price");
  let brand = document.getElementById("product-brand");
  let cate = document.getElementById("product-category");
  let image = document.getElementById("product-image");
  let quantity = document.getElementById("product-quantity");
  let description = document.getElementById("product-description");
  return { name, price, brand, image, quantity, cate, description };
};

const addProduct = (e) => {
  e.preventDefault();
  let data = getElementInput();
  let id = randomId(999);
  let product = new Product(
    id,
    data.cate.value,
    data.brand.value,
    data.name.value,
    Number(data.price.value),
    data.image.value,
    Number(data.quantity.value),
    data.description.value
  );
  productStore.createProduct(product);
  resetField();
  let list = productStore.readProduct();
  showDataProductTable(list);
};

const editProduct = (id) => {
  let data = getElementInput();
  console.log(Number(data.price.value));

  let product = new Product(
    id,
    data.cate.value,
    data.brand.value,
    data.name.value,
    Number(data.price.value),
    data.image.value,
    Number(data.quantity.value),
    data.description.value
  );
  productStore.updateProduct(product);
  resetField();
  showProductManage();
};

const removeProduct = (id) => {
  let isConfirm = confirm("Are you sure delete this product?");
  if (isConfirm) {
    productStore.deleteProduct(id);
    showProductManage();
  }
};

const searchProduct = () => {
  let search = document.getElementById("searchProduct").value;
  let list = productStore.findProduct(search);
  showDataProductTable(list);
};

const resetField = () => {
  let data = getElementInput();
  data.cate.value = "";
  data.brand.value = "";
  data.name.value = "";
  data.price.value = "";
  data.image.value = "";
  data.quantity.value = "";
  data.description.value = "";
};

const toggleFilterPopup = () => {
  const popup = document.getElementById("filter-popup");
  popup.classList.toggle("hidden");
};

const applyFilter = () => {
  const cateId = document.getElementById("filter-category").value;
  const brandId = document.getElementById("filter-brand").value;
  let priceFilter = +document.getElementById("filterPrice").value;
  let quantityFilter = +document.getElementById("filterQuantity").value;
  if (!priceFilter) priceFilter = Infinity;
  if (!quantityFilter) quantityFilter = Infinity;
  if (cateId || brandId || priceFilter || quantityFilter) {
    const list = productStore.findProductFilter(cateId, brandId, priceFilter, quantityFilter);
    showDataProductTable(list);
  } else {
    resetFilter();
  }
  toggleFilterPopup(); // Ẩn popup sau khi apply
};

const resetFilter = () => {
  document.getElementById("filter-category").value = "";
  document.getElementById("filter-brand").value = "";
  showDataProductTable(productStore.readProduct());
  toggleFilterPopup();
};

const displayRangePrice = (e) => {
  document.getElementById("rangePrice").innerText = "$" + e.target.value;
};

const displayRangeQuantity = (e) => {
  document.getElementById("rangeQuantity").innerText = e.target.value;
};
