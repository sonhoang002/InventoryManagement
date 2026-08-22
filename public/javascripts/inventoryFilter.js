const filterParent = document.querySelector(".asideParent");
const filterToggle = document.querySelector(".filter-toggle");

if (filterParent && filterToggle) {
  const closeFilter = () => {
    filterParent.classList.remove("is-open");
    filterToggle.setAttribute("aria-expanded", "false");
  };

  filterToggle.addEventListener("click", () => {
    const isOpen = filterParent.classList.toggle("is-open");
    filterToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeFilter();
      filterToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!filterParent.contains(event.target)) closeFilter();
  });
}
