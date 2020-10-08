const output = document.getElementById('output');

function getData() {
  const itemsToGenerate = 20;
  const url = 'https://jsonplaceholder.typicode.com/photos';
  fetch(`${url}?&_limit=${itemsToGenerate}`)
    .then((response) => response.json())
    .then((results) => addDataToDOM(results))
    .catch(function(error) {
      console.log(error);
      });
}

function addDataToDOM(results) {
  const gallery = results
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((result) =>
      `
    <div class="gallery col-5 d-flex flex-column align-items-center">
      <img src="${result.url}">
      <div>${result.title}</div>
    </div>
    `
    ).join('');
    output.innerHTML += gallery;
}

getData();

window.addEventListener('scroll', () => {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    getData();
  }
})