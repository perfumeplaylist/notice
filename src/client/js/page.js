const fakeDocument = document.createDocumentFragment();
const pageContainer = document.querySelector(".page__cotainer");
const noticeContainer = document.querySelector(".notice_container");
const baseCount = 3;

function paintNotice(notice) {
  noticeContainer.innerText = "";
  const ul = document.createElement("ul");
  for (let i = 0; i < notice.length; i++) {
    const li = document.createElement("li");
    const componentLi = document.createElement("li");
    const a = document.createElement("a");
    const span = document.createElement("span");
    const small = document.createElement("small");
    a.href = `/notice/${notice[i]._id}`;
    a.innerText = `${notice[i].title}`;
    componentLi.appendChild(a);
    span.innerText = `
    ${notice[i].description}
    ${notice[i].meta.views}`;
    componentLi.appendChild(span);
    small.innerText = `${notice[i].createAt}`;
    componentLi.appendChild(small);
    li.appendChild(componentLi);
    ul.appendChild(li);
  }
  fakeDocument.appendChild(ul);
  noticeContainer.appendChild(fakeDocument);
}

async function handlePageContainer(e) {
  clicked = true;
  const target = e.target.innerText.slice(0, 1);
  const response = await (
    await fetch(`/api/notice/page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ target, baseCount }),
    })
  ).json();
  console.log(response.targetNotice);
  paintNotice(response.targetNotice);
}

async function getNotice() {
  const response = await (
    await fetch(`/api/notice/page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ target: "1", baseCount }),
    })
  ).json();
  paintNotice(response.targetNotice);
}

function paintCount(totalCount) {
  for (let i = 1; i <= totalCount; i++) {
    const a = document.createElement("a");
    a.style.cursor = "pointer";
    a.innerText = `${i >= totalCount ? `${i}` : `${i}|`}`;
    fakeDocument.appendChild(a);
  }
  pageContainer.appendChild(fakeDocument);
}

async function getTotalCount() {
  const response = await (
    await fetch("/api/notice/count", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ baseCount }),
    })
  ).json();
  if (response) {
    const totalCount = Math.ceil(response);
    paintCount(totalCount);
  } else {
    return;
  }
}

function init() {
  getTotalCount();
  getNotice();
  pageContainer.addEventListener("click", handlePageContainer);
}

init();
