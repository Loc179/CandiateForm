import { renderTable } from "../utils/Pagination.js";

export default function initCandidateList() {

  const candidates = JSON.parse(localStorage.getItem('candidates')) || [];
  
  let currentPage = 1;
  let pageSize = 10;
  let keyword = '';
  
  const searchInput = document.getElementById('searchInput');
  const pageSizeSelect = document.getElementById('recordsPerPage');
  const leftBtn = document.querySelector('.icon-left');
  const rightBtn = document.querySelector('.icon-right');
  
  // Load data
  function render() {
    const result = renderTable(candidates, {
      currentPage,
      pageSize,
      keyword
    });
    updatePaginationButtons();
  }
  

  // Lấy data theo keyword
  function getFilteredData() {
    const searchKeyword = keyword.toLowerCase();
    return candidates.filter(c =>
      c.CandidateName?.toLowerCase().includes(searchKeyword) ||
      c.Email?.toLowerCase().includes(searchKeyword) ||
      c.Mobile?.includes(searchKeyword)
    );
  }

  
  // Cập nhật trang thái nút next page / prev page
  function updatePaginationButtons() {
    const filteredData = getFilteredData();
    const maxPage = Math.ceil(filteredData.length / pageSize);
  
    // Nút prev
    if (leftBtn) {
      if (currentPage <= 1) {
        leftBtn.classList.add('unactive');
      } else {
        leftBtn.classList.remove('unactive');
      }
    }
    
    // Nút next
    if (rightBtn) {
      if (currentPage >= maxPage) {
        rightBtn.classList.add('unactive');
      } else {
        rightBtn.classList.remove('unactive');
      }
    }
  }
  

  // Search data
  searchInput.addEventListener('input', e => {
    keyword = e.target.value.trim().toLowerCase();
    currentPage = 1;
    render();
  });
  
  // Page size
  pageSizeSelect.addEventListener('change', e => {
    pageSize = Number(e.target.value);
    currentPage = 1;
    render();
  });
  
  // Next page / prev page
  document.querySelector('.icon-left').onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      render();
    }
  };
  
  document.querySelector('.icon-right').onclick = () => {
    const filteredData = getFilteredData();
    const maxPage = Math.ceil(filteredData.length / pageSize);
    if (currentPage < maxPage) {
      currentPage++;
      render();
    }
  };


  /* Secelt All */
  const selectAllCandidate = document.getElementsByClassName("select-all")[0];
  const selectItems = document.getElementsByClassName("select-item");

  selectAllCandidate.addEventListener("change", function () {
      const isChecked = this.checked;

      for (let i = 0; i < selectItems.length; i++) {
          selectItems[i].checked = isChecked;
      }
  });
  
  render()
}

