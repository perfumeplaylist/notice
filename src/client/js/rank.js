const selected = document.querySelector("#rank-select");
const noticeContainer = document.querySelector(".notice_container");
const fakeDocument = document.createDocumentFragment();

function paintNotice(notice) {
  console.log(notice.length);
  for (let i = 0; i < notice.length; i++) {
    const li = document.createElement("li");
    const title = document.createElement("a");
    const des = document.createElement("small");
    const views = document.createElement("small");
    const date = document.createElement("small");
    const hr = document.createElement("hr");
    title.href = `${notice[i]._id}`;
    title.innerText = `${notice[i].title}`;
    des.innerText = `description : ${notice[i].description}`;
    views.innerText = `views : ${notice[i].meta.views}`;
    date.innerText = `date : ${notice[i].createAt}`;
    li.appendChild(title);
    li.appendChild(des);
    li.appendChild(views);
    li.appendChild(date);
    li.appendChild(hr);
    fakeDocument.append(li);
  }
  noticeContainer.append(fakeDocument);
}

async function handleSelected() {
  const value = selected.options[selected.selectedIndex].value;
  const response = await fetch(`/api/notice/rank/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value }),
  });
  if (response.status === 301) {
    const noticeContainer = await response.json();
    paintNotice(noticeContainer.notice);
  } else {
    return;
  }
}

function init() {
  selected.addEventListener("input", handleSelected);
}

init();
