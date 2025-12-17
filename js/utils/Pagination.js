export function renderTable(candidates, options = {}) {
    const tableBody = document.querySelector('.candidate-table tbody');
    const startEl = document.querySelector('.start');
    const endEl = document.querySelector('.end');
    const totalEl = document.querySelector('.total');

    const {
      currentPage = 1,
      pageSize = 10,
      keyword = ''
    } = options;


    const filtered = candidates.filter(c =>
      c.CandidateName?.toLowerCase().includes(keyword) ||
      c.Email?.toLowerCase().includes(keyword) ||
      c.Mobile?.includes(keyword)
    );

    const total = filtered.length;
    totalEl.textContent = total;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const pageData = filtered.slice(startIndex, endIndex);

    const formatDisplay = (candidateItem) => {
      return candidateItem != null ? candidateItem : '--';
    }

    const getInitialsFirstLast = (fullName) => {
      if (!fullName) return '';

      const words = fullName.trim().split(/\s+/);

      if (words.length === 1) {
          return words[0][0].toUpperCase();
      }

      const first = words[0][0].toUpperCase();
      const last = words[words.length - 1][0].toUpperCase();

      return first + last;
  }

  function formatDate(date) {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
  }

  const renderCandidateName = (c) => {
    if (!c.IsEmployee) {
      return `<span>${formatDisplay(c.CandidateName)}</span>`;
    }

    return `
      <span>${formatDisplay(c.CandidateName)}</span>
      <div class="display-flex align-items-center" style="margin-top: 4px">
        <div class="icon icon-tick"></div>
        <div style="color: #4fbd5b; margin-left: 4px">Nhân viên</div>
      </div>
    `;
  };

    tableBody.innerHTML = pageData.map(c => `
      <tr class="candidate-row" data-id="${c.CandidateID}">
        <td style="text-align:center">
          <input class="select-item" type="checkbox">
        </td>
        <td>
          <div class="fullname">
            <div class="avatar">
                ${getInitialsFirstLast(c.CandidateName)}
            </div>
            <div>
              ${renderCandidateName(c)}
            </div>
          </div>
        </td>
        <td>${formatDisplay(c.Email)}</td>
        <td>${formatDisplay(c.Mobile)}</td>
        <td>${formatDisplay(c.RecruitmentCampaignNames)}</td>
        <td>${formatDisplay(c.JobPositionName)}</td>
        <td>${formatDisplay(c.RecruitmentName)}</td>
        <td>${formatDisplay(c.RecruitmentRoundName)}</td>
        <td>${formatDisplay(c.Score)}</td>
        <td>${formatDisplay(c.ApplyDate)}</td>
        <td>${formatDisplay(c.ChannelName)}</td>
        <td>${formatDisplay(c.EducationDegreeName)}</td>
        <td>${formatDisplay(c.EducationPlaceName)}</td>
        <td>${formatDisplay(c.EducationMajorName)}</td>
        <td>${formatDisplay(c.WorkPlaceRecent)}</td>
        <td>${formatDisplay(c.AttractivePersonnel)}</td>
        <td>${formatDisplay(c.OrganizationUnitName)}</td>
        <td>${formatDisplay(c.AreaName)}</td>
        <td>${formatDisplay(c.PresenterName)}</td>
        <td>${formatDisplay(c.ProbationInfoStatus)}</td>
        <td>${formatDisplay(c.ProbationInfoStatus)}</td>
        <td>${formatDisplay(c.IsTalentPoolDetail)}</td>
        <td>${formatDisplay(c.AccountPortal)}</td>
        <td>${formatDisplay(c.TagInfos)}</td>
        <td>${formatDisplay(c.CandidateStatusID)}</td>
        <td>${formatDisplay(c.Gender)}</td>
        <td>${formatDisplay(c.Birthday)}</td>
        <td>${formatDisplay(c.Address)}</td>
        <td>${formatDisplay(c.ReasonRemoved)}</td>
        <td>${formatDisplay(c.CollaboratorName)}</td>
        <td>${formatDisplay(c.HireDate)}</td>
        <td>${formatDisplay(c.OfferStatus)}</td>
        <td class="row-edit-btn">
          <div class="icon icon-edit pointer"></div>
        </td>
      </tr>
    `).join('');

    startEl.textContent = total === 0 ? 0 : startIndex + 1;
    endEl.textContent = Math.min(endIndex, total);

}