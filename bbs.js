const tableBody = document.querySelector('#table-body');
const statusMessage = document.querySelector('#status-message');
const topSaveButton = document.querySelector('#top-save-btn');
const formPanel = document.querySelector('#form-panel');
const postForm = document.querySelector('#post-form');
const titleInput = document.querySelector('#post-title');
const contentInput = document.querySelector('#post-content');
const dateInput = document.querySelector('#post-date');
const titleError = document.querySelector('#title-error');
const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('.searchbtn');
const detailPanel = document.querySelector('#detail-panel');
const detailTitle = document.querySelector('#detail-title');
const detailContent = document.querySelector('#detail-content');
const detailDate = document.querySelector('#detail-date');
const detailViews = document.querySelector('#detail-views');
const deletePostButton = document.querySelector('#delete-post-btn');
let storageReady = true;
let bbs = [];
let selectedPostIndex = null;
let activeSearchTerm = '';

topSaveButton.onclick = function() {
  formPanel.style.display = 'block';
}

document.querySelector('.close-form-btn1').onclick = function() {
  formPanel.style.display = 'none';
}

document.querySelector('.close-detail-btn2').onclick = function() {
  detailPanel.style.display = 'none';
}

function insert(){
  if (!titleInput.value.trim() || !contentInput.value.trim()) {
    alert('제목과 내용을 모두 입력해 주세요.');
    return;
  }

  const post = [
    titleInput.value,
    contentInput.value,
    dateInput.value,
    0
  ];

  bbs.push(post);
  titleInput.value = '';
  contentInput.value = '';
  dateInput.value = '';
  formPanel.style.display = 'none';
  list();
}

document.querySelector('.insert').addEventListener('click', insert);

function list(){
  tableBody.replaceChildren();

  const searchTerm = activeSearchTerm.trim().toLocaleLowerCase();
  const visiblePosts = bbs
    .map(function(post, index) {
      return { post: post, index: index };
    })
    .filter(function(item) {
      return item.post[0].toLocaleLowerCase().includes(searchTerm);
    });

  if (visiblePosts.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.textContent = bbs.length === 0
      ? '등록된 글이 없습니다.'
      : '검색 결과가 없습니다.';
    tableBody.appendChild(emptyState);
    return;
  }

  visiblePosts.forEach(function(item, index) {
    const post = item.post;
    const row = document.createElement('div');
    row.className = 'table-row-btn';

    const columns = [
      index + 1,
      post[0],
      post[2],
      post[3]
    ];
    const classNames = ['row-index', 'row-title', 'row-date', 'row-views'];

    columns.forEach(function(value, columnIndex) {
      const cell = document.createElement('span');
      cell.className = classNames[columnIndex];
      cell.textContent = value;
      row.appendChild(cell);
    });

    row.addEventListener('click', function() {
      detail(item.index);
    });

    tableBody.appendChild(row);
  });
}
list();

searchButton.addEventListener('click', function() {
  activeSearchTerm = searchInput.value;
  list();
});

function detail(index){
  const post = bbs[index];
  if (!post) {
    return;
  }

  selectedPostIndex = index;
  post[3] += 1;
  detailTitle.textContent = post[0];
  detailContent.textContent = post[1];
  detailDate.textContent = post[2];
  detailViews.textContent = post[3];
  formPanel.style.display = 'none';
  detailPanel.classList.remove('hidden');
  detailPanel.style.display = 'block';
  list();
}

function del(){
  if (selectedPostIndex === null) {
    return;
  }

  bbs.splice(selectedPostIndex, 1);
  selectedPostIndex = null;
  detailPanel.style.display = 'none';
  list();
}

deletePostButton.addEventListener('click', del);