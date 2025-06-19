const showBrandManage = (event) => {
  if (event) {
    toggleMenuActive();
    event.target.classList.add("active");
  }
  let html = `<h1>BRAND MANAGEMENT</h1>

        <form id="form-brand" onsubmit="addBrand(event)">
          <div id="btn_action" style="width: 50%">
            <input type="text" id="brand-name" placeholder="Brand Name" required />
            <button id="btn_save" type="submit">Add new brand</button>
          </div>
        </form>
        <div>
            <input type="text" class="searchInput" id="searchBrand" oninput="searchBrand()" placeholder="Search by name" />
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th colspan="2">Action</th>
            </tr>
          </thead>
          <tbody id="brand-table"></tbody>
        </table>`;
  document.getElementById("main-content").innerHTML = html;
  showDataBrandTable(brandStore.readBrand());
};

const addBrand = (e) => {
  e.preventDefault();
  let id = randomId(99);
  let name = document.getElementById("brand-name");
  let brand = new Brand(id, name.value);
  name.value = "";
  brandStore.createBrand(brand);
  showDataBrandTable(brandStore.readBrand());
};

const showDataBrandTable = (list) => {
  let html = "";
  for (let i = 0; i < list.length; i++) {
    html += `<tr>
        <td>${list[i].name}</td>
        <td><button class="action-btn edit-btn" onclick="showBrandEdit('${list[i].id}')">Edit</button></td>
        <td><button class="action-btn delete-btn" onclick="removeBrand('${list[i].id}')">Delete</button></td>
      </tr>`;
  }
  document.getElementById("brand-table").innerHTML = html;
};

const showBrandEdit = (id) => {
  let data = brandStore.getOneBrand(id);
  document.getElementById("brand-name").value = data.name;
  if (!document.getElementById("btn_cancel")) {
    let buttonCancel = document.createElement("button");
    buttonCancel.type = "button";
    buttonCancel.id = "btn_cancel";
    buttonCancel.classList.add("btn_cancel");
    buttonCancel.textContent = "Cancel";
    buttonCancel.onclick = cancelEdit;
    document.getElementById("btn_action").appendChild(buttonCancel);
  }
  document.getElementById("btn_save").innerHTML = "Save";
  let form = document.getElementById("form-brand");
  form.onsubmit = function (e) {
    e.preventDefault();
    editBrand(id);
  };
};

const editBrand = (id) => {
  let name = document.getElementById("brand-name");
  let brand = new Brand(id, name.value);
  brandStore.updateBrand(brand);
  name.value = "";
  showBrandManage();
};

const cancelEdit = () => {
  showBrandManage();
};

const removeBrand = (id) => {
  let isConfirm = confirm("Are you sure delete this brand?");
  if (isConfirm) {
    brandStore.deleteBrand(id);
    showDataBrandTable(brandStore.readBrand());
  }
};

const searchBrand = () => {
  let search = document.getElementById("searchBrand").value;
  let list = brandStore.findBrand(search);
  showDataBrandTable(list);
};
