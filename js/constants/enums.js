export const Gender = {
  FEMALE: 0,
  MALE: 1,
  OTHER: 2
};

export const GenderLabels = {
  [Gender.FEMALE]: 'Nữ',
  [Gender.MALE]: 'Nam',
  [Gender.OTHER]: 'Khác'
};

export const RecruitmentStatus = {
  PENDING: 0,
  IN_PROGRESS: 1,
  INTERVIEW: 2,
  TEST: 3,
  OFFER: 4,
  HIRED: 5,
  REJECTED: 6
};

export const RecruitmentStatusLabels = {
  [RecruitmentStatus.PENDING]: 'Chưa xử lý',
  [RecruitmentStatus.IN_PROGRESS]: 'Ứng tuyển',
  [RecruitmentStatus.INTERVIEW]: 'Phỏng vấn',
  [RecruitmentStatus.TEST]: 'Thi tuyển',
  [RecruitmentStatus.OFFER]: 'Chào offer',
  [RecruitmentStatus.HIRED]: 'Đã tuyển',
  [RecruitmentStatus.REJECTED]: 'Đã loại'
};

export const OfferStatus = {
  PENDING: 0,
  SENT: 1,
  ACCEPTED: 2,
  REJECTED: 3
};

export const OfferStatusLabels = {
  [OfferStatus.PENDING]: 'Chờ gửi',
  [OfferStatus.SENT]: 'Đã gửi',
  [OfferStatus.ACCEPTED]: 'Đã chấp nhận',
  [OfferStatus.REJECTED]: 'Đã từ chối'
};