const base_url = "https://api.football-data.org/v2/";
const endPointTeams = `${base_url}competitions/2021/teams`
const fetchData = (url) => {
  return fetch(url, {
    method: "GET",
    headers: {
      'X-Auth-Token': `1396defe7209402db85bb1ea78433a9d`
    }
  })
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getArticles() {
  if ("caches" in window) {
    caches.match(endPointTeams).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var articlesHTML = "";
          data.teams.forEach(function (article) {
            articlesHTML += `
                              <div class="card">
                              <a href="./article.html?id=${article.id}">
                                <div class="card-image waves-effect waves-block waves-light">
                                  <img src="${article.crestUrl}" />
                                </div>
                              </a>
                              <div class="card-content">
                                <span class="card-title truncate">${article.name}</span>
                                <p>${article.address}</p>
                              </div>
                            </div>
                          `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
        });
      }
    });
  }

  fetchData(endPointTeams)
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var articlesHTML = "";
      data.teams.forEach(function (article) {
        articlesHTML += `
              <div class="card">
                <a href="./article.html?id=${article.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${article.crestUrl}" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${article.name}</span>
                  <p>${article.address}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}

function getArticleById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            var articleHTML = `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl}" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.name}</span>
                <p>${data.website} </p>
              </div>
            </div>
          `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = articleHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetchData(base_url + "teams/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        // console.log(data);
        // Menyusun komponen card artikel secara dinamis
        var articleHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${data.crestUrl}" />
            </div>
            <div class="card-content">
                      <span class="card-title truncate">${data.name}</span>
                      <p>Klub dengan nama ${data.name} ini didirikan pada tahun ${data.founded}, Adapun keterangan lengkap tentang klub ini adalah sebagai berikut :</p>
                      <br>
                      <p>Nama Club : ${data.name} </p>
                      <p>Tahun Berdiri : ${data.founded} </p>
                      <p>Warna Seragam : ${data.clubColors} </p>
                      <p>Nama Stadiun : ${data.venue} </p>
                      <p>Nama Club : ${data.name} </p>
                      <p>Alamat : ${data.address} </p>
                    </div>
              <p>${data.website} </p>
            </div>
          </div>
        `;
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = articleHTML;
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getSavedArticles() {
  getAll().then(function (articles) {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    var articlesHTML = "";
    articles.forEach(function (article) {

      articlesHTML += `
                  <div class="card">
                    <a href="./article.html?id=${article.id}&saved=true">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${article.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content">
                    <a class="btn-floating halfway-fab waves-effect waves-light red" id="deleted" onclick="deletedTeam(${article.id})"><i class="material-icons">delete</i></a>
                      <span class="card-title truncate">${article.name}</span>

                      <p>Klub dengan nama ${article.name} ini didirikan pada tahun ${article.founded}, Adapun keterangan lengkap tentang klub ini adalah sebagai berikut :</p>
                      <br>
                      <p>Nama Club : ${article.name} </p>
                      <p>Tahun Berdiri : ${article.founded} </p>
                      <p>Warna Seragam : ${article.clubColors} </p>
                      <p>Nama Stadiun : ${article.venue} </p>
                      <p>Nama Club : ${article.name} </p>
                      <p>Alamat : ${article.address} </p>
                    
                    </div>
                  </div>
                `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  getById(idParam).then(function (article) {
    articleHTML = '';
    var articleHTML = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img src="${article.crestUrl}" />
      </div>
      <div class="card-content">
        <span class="card-title">${article.name}</span>
        <p>${article.website}</p>
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = articleHTML;
  });
}