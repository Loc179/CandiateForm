export default function ValidateEdit() {
    // Lấy các trường bắt buộc
    const fullName = document.querySelector('.popup-overlay .fullname-edit');

    // Validate họ tên
    if (!fullName || !fullName?.value?.trim()) {
        alert('Vui lòng nhập họ và tên!');
        if (fullName) fullName.focus();
        return;
    }


    // Validate email nếu có nhập
    const email = document.querySelector('.popup-overlay .email-edit');
    if (email && email.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            alert('Email không hợp lệ!');
            email.focus();
            return;
        }
    }

    // Validate số điện thoại nếu có nhập
    const phone = document.querySelector('.popup-overlay .mobile-edit');
    if (phone && phone.value) {
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(phone.value.replace(/\s/g, ''))) {
            alert('Số điện thoại không hợp lệ!');
            phone.focus();
            return;
        }
    }

    return true;
}