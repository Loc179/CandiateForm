import ValidateAdd from "../utils/ValidateData.js";
import initCandidateList from "./CandidateList.js";

export default function initPopup() {
    // OPEN/CLOSE POPUP
    const openPopupBtn = document.getElementById('openPopupBtn');
    const popupBackdrop = document.getElementById('popupBackdrop');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.querySelector('.btn-cancel');
    
    // Mở popup
    if (openPopupBtn) {
        openPopupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openPopup();
        });
    }
    
    // Đóng popup
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closePopup);
    }
    
    
    function openPopup() {
        if (popupBackdrop) {
            popupBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Popup opened');
        }
    }
    
    function closePopup() {
        const hasData = checkFormHasData();
        
        if (hasData) {
            if (confirm('Bạn có chắc chắn muốn đóng? Dữ liệu chưa lưu sẽ bị mất.')) {
                if (popupBackdrop) {
                    popupBackdrop.classList.remove('active');
                    document.body.style.overflow = '';
                    resetForm();
                }
            }
        } else {
            if (popupBackdrop) {
                popupBackdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
    
    function checkFormHasData() {
        const inputs = document.querySelectorAll('.popup-overlay input, .popup-overlay select, .popup-overlay textarea');
        for (let input of inputs) {
            if (input.type !== 'checkbox' && input.value && input.value.trim() !== '') {
                return true;
            }
        }
        return false;
    }
    
    function resetForm() {
        const inputs = document.querySelectorAll('.popup-overlay input, .popup-overlay select, .popup-overlay textarea');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
    }
    
    
    // THÊM HỌC VẤN
    const addEducationBtns = document.querySelectorAll('.add-button');
    
    addEducationBtns.forEach(btn => {
        if (btn.textContent.includes('Thêm học vấn')) {
            btn.addEventListener('click', addEducation);
        } else if (btn.textContent.includes('Thêm người giới thiệu')) {
            btn.addEventListener('click', addReferrer);
        } else if (btn.textContent.includes('Thêm kinh nghiệm làm việc')) {
            btn.addEventListener('click', addWorkExperience);
        }
    });
    
    function addEducation() {
        const educationSection = document.querySelector('.education-section');
        const newEducation = document.createElement('div');
        newEducation.innerHTML = `
            <div class="education-section">
                <div class="education-item">
                    <span class="education-label">Trình độ đào tạo</span>
                    <input type="text" class="input-field" placeholder="Nhập trình độ đào tạo">
                </div>
                <div class="education-item">
                    <span class="education-label">Nơi đào tạo</span>
                    <input type="text" class="input-field" placeholder="Nhập nơi đào tạo">
                </div>
                <div class="education-item">
                    <span class="education-label">Chuyên ngành</span>
                    <input type="text" class="input-field" placeholder="Nhập chuyên ngành">
                </div>
                <hr>
            </div>
        `;
        
        const addBtn = educationSection.querySelector('.add-button');
        educationSection.insertBefore(newEducation, addBtn);
    }
    
    function addReferrer() {
        
    }
    
    function addWorkExperience() {
        const formSection = document.querySelector('.form-section');
        const newWork = document.createElement('div');
        newWork.className = 'work-experience';
        newWork.style.marginTop = '16px';
        newWork.innerHTML = `
            <div class="form-row">
                <label class="label">Nơi làm việc</label>
                <input type="text" class="input-field" placeholder="Nhập nơi làm việc">
            </div>
            <div class="form-row">
                <label class="label">Thời gian</label>
                <div class="date-range">
                    <input type="month" class="input-field" placeholder="MM/yyyy">
                    <span>-</span>
                    <input type="month" class="input-field" placeholder="MM/yyyy">
                </div>
            </div>
            <div class="form-row">
                <label class="label">Vị trí công việc</label>
                <input type="text" class="input-field" placeholder="Nhập vị trí công việc">
            </div>
            <div class="form-row">
                <label class="label">Mô tả công việc</label>
                <textarea class="input-field" placeholder="Nhập mô tả công việc"></textarea>
            </div>
        `;
        formSection.appendChild(newWork);
    }
    
    
    // FORM VALIDATION & SAVE
    // Creatby LocNT
    const saveBtn = document.querySelector('.btn-primary');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', validateAndSave);
    }
    
    function validateAndSave() {
        if(!ValidateAdd()){
            return;
        }
        
        // Nếu validate thành công
        const formData = collectFormData();
        
        formData.CandidateID = generateCandidateId();
        
        
        // Lưu trong LocalStorage
        const STORAGE_KEY = 'candidates';
        const candidates = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        candidates.unshift(formData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));
        
        alert('Lưu thành công!');

        initCandidateList();

        // Đóng popup
        if (popupBackdrop) {
            popupBackdrop.classList.remove('active');
            document.body.style.overflow = '';
            resetForm();
        }
    }
    
    function collectFormData() {
        const inputs = document.querySelectorAll('.popup-overlay input, .popup-overlay select, .popup-overlay textarea');
        const data = {};
        
        inputs.forEach(input => {
            const key = input.id;
            data[key] = input.value;
        });
        
        return data;
    }

    // Tạo ID cho Candiate
    function generateCandidateId() {
        const candidates = JSON.parse(localStorage.getItem('candidates')) || [];

        if (candidates.length === 0) return 1;

        const maxId = Math.max(
            ...candidates.map(c => Number(c.CandidateID) || 0)
        );

        return maxId + 1;
    }
    

}