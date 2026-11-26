  const memberListEl = document.getElementById('member-list');
  const searchInput = document.getElementById('search');
  const searchButton = document.querySelector('.searchbtn');
  const registerFormEl = document.getElementById('register-form');
  const openModalBtn = document.getElementById('open-modal-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const editBtn = document.getElementById('edit-btn');
  const delModalBtn = document.getElementById('del-modal-btn');
  const saveBtn = document.getElementById('save-btn');
  const nameInput = document.getElementById('member-name');
  const addressInput = document.getElementById('member-address');
  const emailInput = document.getElementById('member-email');
  const ageInput = document.getElementById('member-age');
  const statusSelect = document.getElementById('member-status');
  const tierSelect = document.querySelector('.tiger');
  const errorEl = document.getElementById('form-error');
  const toastEl = document.getElementById('toast');
  const submitBtn = registerFormEl.querySelector('button[type="submit"]');
  let isViewingMember = false;
  let editingMemberIndex = null;
  let activeSearchTerm = '';

  const member = [];
  member[0] = {
    name: "홍길동",
    addr: "서울시 노원구",
    email: "aaaab@naver.com",
    age: 20,
    tiger: "vip",
    status: "온라인",
  };

  saveBtn.addEventListener('click', () => {
    isViewingMember = false;
    editingMemberIndex = null;
    registerFormEl.reset();
    nameInput.readOnly = false;
    addressInput.readOnly = false;
    emailInput.readOnly = false;
    ageInput.readOnly = false;
    tierSelect.disabled = false;
    statusSelect.disabled = false;
    editBtn.classList.add('hidden');
    delModalBtn.classList.add('hidden');
    submitBtn.classList.remove('hidden');
    submitBtn.textContent = '등록';
    registerFormEl.style.display = '';
    registerFormEl.classList.add('is-open');
  });

  closeModalBtn.addEventListener('click', () => {
    registerFormEl.style.display = 'none';
    registerFormEl.classList.remove('is-open');
  });

  editBtn.addEventListener('click', () => {
    if (editingMemberIndex === null) return;

    isViewingMember = false;
    nameInput.readOnly = false;
    addressInput.readOnly = false;
    emailInput.readOnly = false;
    ageInput.readOnly = false;
    tierSelect.disabled = false;
    statusSelect.disabled = false;
    editBtn.classList.add('hidden');
    delModalBtn.classList.add('hidden');
    submitBtn.textContent = '수정 완료';
    submitBtn.classList.remove('hidden');
  });

  const Creator = (event) => {
    event.preventDefault();
    if (isViewingMember) return;

    const updatedMember = {
      name: nameInput.value.trim(),
      addr: addressInput.value.trim(),
      email: emailInput.value.trim(),
      age: ageInput.valueAsNumber,
      tiger: tierSelect.value,
      status: statusSelect.value,
    };

    if (editingMemberIndex !== null) {
      Update(updatedMember);
      return;
    }

    member.push(updatedMember);
    List();
    registerFormEl.reset();
    registerFormEl.classList.remove('is-open');
    errorEl.textContent = '';
    toastEl.textContent = '회원이 등록되었습니다.';
    toastEl.classList.remove('hidden');
    window.setTimeout(() => toastEl.classList.add('hidden'), 2000);
  };

  registerFormEl.addEventListener('submit', Creator);

  const List = () => {
    memberListEl.replaceChildren();

    const searchTerm = activeSearchTerm.trim().toLocaleLowerCase();
    const visibleMembers = member
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => (
        !searchTerm || item.tiger.toLocaleLowerCase() === searchTerm
      ));

    visibleMembers.forEach(({ item, index }) => {
      const row = document.createElement('div');
      row.className = 'table-row';

      [index + 1, item.name, item.addr, item.email, item.age, item.tiger, item.status]
        .forEach((value, cellIndex) => {
          if (cellIndex === 1) {
            const nameButton = document.createElement('button');
            nameButton.type = 'button';
            nameButton.className = 'member-name-button';
            nameButton.textContent = value;
            nameButton.addEventListener('click', () => Read(index));
            row.append(nameButton);
            return;
          }

          const cell = document.createElement('span');
          cell.textContent = value;
          if (cellIndex === 3) cell.className = 'email-cell';
          if (cellIndex === 6) cell.className = 'status-cell';
          row.append(cell);
        });

      memberListEl.append(row);
    });
  };

  searchButton.addEventListener('click', () => {
    activeSearchTerm = searchInput.value;
    List();
  });

  List();

  const Read = (index) => {
    const selectedMember = member[index];
    if (!selectedMember) return;

    editingMemberIndex = index;
    isViewingMember = true;
    nameInput.value = selectedMember.name;
    addressInput.value = selectedMember.addr;
    emailInput.value = selectedMember.email;
    ageInput.value = selectedMember.age;
    tierSelect.value = selectedMember.tiger;
    statusSelect.value = selectedMember.status;
    nameInput.readOnly = true;
    addressInput.readOnly = true;
    emailInput.readOnly = true;
    ageInput.readOnly = true;
    tierSelect.disabled = true;
    statusSelect.disabled = true;
    editBtn.classList.remove('hidden');
    delModalBtn.classList.remove('hidden');
    submitBtn.classList.add('hidden');
    submitBtn.textContent = '등록';
    registerFormEl.style.display = '';
    registerFormEl.classList.add('is-open');
  };

  const Update = (updatedMember) => {
    member[editingMemberIndex] = updatedMember;
    editingMemberIndex = null;
    List();
    registerFormEl.reset();
    registerFormEl.classList.remove('is-open');
    toastEl.textContent = '회원 정보가 수정되었습니다.';
    toastEl.classList.remove('hidden');
    window.setTimeout(() => toastEl.classList.add('hidden'), 2000);
  };

  const Delete = () => {
    if (editingMemberIndex === null) return;

    member.splice(editingMemberIndex, 1);
    editingMemberIndex = null;
    isViewingMember = false;
    List();
    registerFormEl.reset();
    registerFormEl.style.display = 'none';
    registerFormEl.classList.remove('is-open');
    editBtn.classList.add('hidden');
    delModalBtn.classList.add('hidden');
    toastEl.textContent = '회원 정보가 삭제되었습니다.';
    toastEl.classList.remove('hidden');
    window.setTimeout(() => toastEl.classList.add('hidden'), 2000);
  };

  delModalBtn.addEventListener('click', Delete);