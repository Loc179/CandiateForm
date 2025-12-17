export default function initSidebar() {

    const SIDEBAR_KEY = "sidebar_collapsed";
    
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.getElementById("toggleSidebar");
    const toggleText = toggleBtn.querySelector(".sidebar-text-content");
    // const sidebarItems = document.querySelectorAll(".sidebar-item");
    
    // Load trạng thái khi mở app
    const isCollapsed = localStorage.getItem(SIDEBAR_KEY) === "true";
    if (isCollapsed) {
        sidebar.classList.add("collapsed");
        toggleText.textContent = "Mở rộng";
    }
    
    // Click toggle
    toggleBtn.addEventListener("click", () => {
        const collapsed = sidebar.classList.toggle("collapsed");
    
        toggleText.textContent = collapsed ? "Mở rộng" : "Thu gọn";
        localStorage.setItem(SIDEBAR_KEY, collapsed);
    });
    
    
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener("click", (e) => {
            // Xóa active khỏi tất cả
            sidebarItems.forEach(el => {
                el.classList.remove('active');
            });
            
            // Thêm active vào item được click
            e.currentTarget.classList.add('active');
        });
    });
}
