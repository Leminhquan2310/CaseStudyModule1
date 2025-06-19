const showCategoryManage = (event) => {
  if (event) {
    toggleMenuActive();
    event.target.classList.add("active");
  }
  let html = `<h1>CATEGORY MANAGEMENT</h1>

        <form id="form-cate" onsubmit="addCate(event)">
          <div id="btn_action" style="width: 50%">
            <input type="text" id="cate-name" placeholder="Category Name" required />
            <button id="btn_save" type="submit">Add new category</button>
          </div>
        </form>
        <div>
            <input type="text" class="searchInput" id="searchCategory" oninput="searchCategory()" placeholder="Search by name" />
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th colspan="2">Action</th>
            </tr>
          </thead>
          <tbody id="cate-table"></tbody>
        </table>`;
  document.getElementById("main-content").innerHTML = html;
  showDataCateTable(categoryStore.readCate());
};

const addCate = (e) => {
  e.preventDefault();
  let id = randomId(9);
  let name = document.getElementById("cate-name");
  let cate = new Category(id, name.value);
  name.value = "";
  categoryStore.createCate(cate);
  showDataCateTable(categoryStore.readCate());
};

const showDataCateTable = (list) => {
  let html = "";
  for (let i = 0; i < list.length; i++) {
    html += `<tr>
        <td>${list[i].name}</td>
        <td><button class="action-btn edit-btn" onclick="showCateEdit('${list[i].id}')">Edit</button></td>
        <td><button class="action-btn delete-btn" onclick="removeCate('${list[i].id}')">Delete</button></td>
      </tr>`;
  }
  document.getElementById("cate-table").innerHTML = html;
};

const showCateEdit = (id) => {
  let data = categoryStore.getOneCate(id);
  document.getElementById("cate-name").value = data.name;
  if (!document.getElementById("btn_cancel")) {
    let buttonCancel = document.createElement("button");
    buttonCancel.type = "button";
    buttonCancel.id = "btn_cancel";
    buttonCancel.classList.add("btn_cancel");
    buttonCancel.textContent = "Cancel";
    buttonCancel.onclick = cancelEditCate;
    document.getElementById("btn_action").appendChild(buttonCancel);
  }
  document.getElementById("btn_save").innerHTML = "Save";
  let form = document.getElementById("form-cate");
  form.onsubmit = function (e) {
    e.preventDefault();
    editCate(id);
  };
};

const editCate = (id) => {
  let name = document.getElementById("cate-name");
  let cate = new Category(id, name.value);
  categoryStore.updateCate(cate);
  name.value = "";
  showCategoryManage();
};

const cancelEditCate = () => {
  showCategoryManage();
};

const removeCate = (id) => {
  let isConfirm = confirm("Are you sure delete this category?");
  if (isConfirm) {
    categoryStore.deleteCate(id);
    showDataCateTable(categoryStore.readCate());
  }
};

const searchCategory = () => {
  let search = document.getElementById("searchCategory").value;
  let list = categoryStore.findCate(search);
  showDataCateTable(list);
};
