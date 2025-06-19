window.toggleMenuActive = () => {
  const menuLinks = document.querySelectorAll("#menu a");
  menuLinks.forEach((link) => link.classList.remove("active"));
};

window.randomId = (lengthKey) => {
  let date = Date.now();
  return `${date + Math.floor(Math.random() * lengthKey)}`;
};

window.showNotifySuccess = (funcReset, message) => {
  Swal.fire({
    title: "Success",
    text: message,
    icon: "success",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      funcReset();
    }
  });
};
