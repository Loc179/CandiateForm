import ValidateEdit from '../utils/ValidateDataEdit.js'
import initCandidateList from './CandidateList.js';

export default function initPopupEdit() {

    // OPEN/CLOSE POPUP EDIT
    let currentCandidateId = null;
    const popupEdit = document.getElementById('popupEdit');
    const closeBtnEdit = document.querySelector('.close-btn-edit');
    const cancelBtnEdit = document.querySelector('.btn-cancel-edit');


    // Mở Popup Edit
    document.addEventListener('click', function (e) {
        const editBtn = e.target.closest('.row-edit-btn');
        if (!editBtn) return;

        const row = editBtn.closest('.candidate-row');
        if (!row) return;

        const candidateId = row.dataset.id;

        e.preventDefault();
        openPopupEdit(candidateId);
    });
    
    // Đóng Popup Edit
    if(closeBtnEdit) {
        closeBtnEdit.addEventListener('click', closePopupEdit);
    }
    
    if(cancelBtnEdit) {
        cancelBtnEdit.addEventListener('click', closePopupEdit);
    }
    
    
    // Mở popup-edit
    function openPopupEdit(candidateId) {
        if (!popupEdit || !candidateId) return;

        const candidates = JSON.parse(localStorage.getItem('candidates')) || [];

        const candidate = candidates.find(
            c => String(c.CandidateID) === String(candidateId)
        );

        if (!candidate) {
            console.error('Không tìm thấy candidate:', candidateId);
            return;
        }

        currentCandidateId = candidate.CandidateID;

        fillPopupEditForm(candidate);

        popupEdit.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    

    // Đóng popup-edit
    function closePopupEdit() {
        const hasData = checkFormHasData();
        
        if (hasData) {
            if (confirm('Bạn có chắc chắn muốn đóng? Dữ liệu chưa lưu sẽ bị mất.')) {
                if (popupEdit) {
                    popupEdit.classList.remove('active');
                    document.body.style.overflow = '';
                    resetForm();
                }
            }
        } else {
            if (popupEdit) {
                popupEdit.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        currentCandidateId = null;
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


    // Reset dữ liệu forrm
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


    // Đổ dữ liệu vào forrm
    function fillPopupEditForm(candidate) {
        document.getElementById('CandidateNameEdit').value = candidate.CandidateName || '';
        document.getElementById('EmailEdit').value = candidate.Email || '';
        document.getElementById('MobileEdit').value = candidate.Mobile || '';
        document.getElementById('BirthdayEdit').value = candidate.Birthday || '';
        document.getElementById('AddressEdit').value = candidate.Address || '';
        document.getElementById('ApplyDateEdit').value = candidate.ApplyDate || '';
        document.getElementById('ChannelNameEdit').value = candidate.ChannelName || '';
        document.getElementById('AreaNameEdit').value = candidate.AreaName || '';
        document.getElementById('AttractivePersonnelEdit').value = candidate.AttractivePersonnel || '';
        document.getElementById('CollaboratorNameEdit').value = candidate.CollaboratorName || '';
        document.getElementById('EducationDegreeNameEdit').value = candidate.EducationDegreeName || '';
        document.getElementById('EducationPlaceNameEdit').value = candidate.EducationPlaceName || '';
        document.getElementById('EducationMajorNameEdit').value = candidate.EducationMajorName || '';
        document.getElementById('WorkPlaceRecentEdit').value = candidate.WorkPlaceRecent || '';

        if (candidate.Gender !== undefined) {
            document.getElementById('GenderEdit').value = candidate.Gender;
        }
    }


    // FORM VALIDATION & SAVE
    // Create by LocNT

    const saveBtn = document.querySelector('.btn-primary-edit');
    
    if (saveBtn) {
        saveBtn.addEventListener('click', validateAndSave);
    }

    function validateAndSave() {
        if(!ValidateEdit()){
            return;
        }

        if (!currentCandidateId) return;
        
        const STORAGE_KEY = 'candidates';
        const candidates = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        const index = candidates.findIndex(
            c => String(c.CandidateID) === String(currentCandidateId)
        );

        if (index === -1) {
            alert('Không tìm thấy candidate để cập nhật');
            return;
        }

        // Update data
        candidates[index] = {
            ...candidates[index],
            CandidateName: document.getElementById('CandidateNameEdit').value,
            Email: document.getElementById('EmailEdit').value,
            Mobile: document.getElementById('MobileEdit').value,
            Birthday: document.getElementById('BirthdayEdit').value,
            Address: document.getElementById('AddressEdit').value,
            Gender: document.getElementById('GenderEdit').value
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates));

        alert('Cập nhật thành công!');
        initCandidateList();
        
        // Đóng popup
        if (popupEdit) {
            popupEdit.classList.remove('active');
            document.body.style.overflow = '';
            resetForm();
        }
    }

}