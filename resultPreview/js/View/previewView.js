class previewView {
  _parentEl = document.querySelector(".page-single > .container > .row");

  removeLoader() {
    document.querySelector(".wall").style.display = "none";
  }

  starRenderer() {
    const s = document.querySelectorAll(".s");
    s.forEach((star) => {
      star.addEventListener("click", function (e) {
        const numToHighlight = e.target.dataset.starnum;
        let i = 0;
        while (i !== Number(numToHighlight)) {
          s[i].classList.remove("ion-ios-star-outline");
          s[i].classList.add("ion-ios-star");
          i++;
        }
        while (i !== 9) {
          s[i].classList.remove("ion-ios-star");
          s[i].classList.add("ion-ios-star-outline");
          i++;
        }
      });
    });
  }

  homeBtnHandler() {
    document.querySelector(".home-btn").addEventListener("click", function () {
      window.location.href = "../searchPage/searchPage.html";
    });
  }

  redirectHandler(handler) {
    // For some reason this is not working
    // window.addEventListener("load", handler);

    handler();
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }

  render(data) {
    this._parentEl.insertAdjacentHTML("afterbegin", data);
  }

  _generateCast(data) {
    let html = "";
    for (const a of data.cast) {
      html = html.concat(`<div class="cast-it">
      <div class="cast-left">
        <img src="${
          a.profile_path
            ? `http://image.tmdb.org/t/p/w500${a.profile_path}`
            : "https://st.depositphotos.com/2101611/4338/v/600/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg"
        }"/>
        <a href="#">${a.name}</a>
      </div>
      <p>... ${a.character}</p>
    </div>`);
    }
    return html;
  }

  generateMarkup(data) {
    this._clear();

    const a = document.querySelector(".mv-single-hero");
    a.style.background = data.backdrop_path
      ? `url(http://image.tmdb.org/t/p/w500${data.backdrop_path}) no-repeat`
      : "url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ff2ca5d0-5633-4ef7-b22f-934c6516d5f0/d6iuhnh-22a84a73-8669-48aa-aaac-47e886276b7c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZmMmNhNWQwLTU2MzMtNGVmNy1iMjJmLTkzNGM2NTE2ZDVmMFwvZDZpdWhuaC0yMmE4NGE3My04NjY5LTQ4YWEtYWFhYy00N2U4ODYyNzZiN2MuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.83y3iXLNJn6uk9_jIAxi9ColGNJNEy9nrlhv9jh4yEU) no-repeat";

    return `
    <div class="col-md-4 col-sm-12 col-xs-12">
            <div class="movie-img sticky-sb">
              <img src="http://image.tmdb.org/t/p/w500/${
                data.poster_path
              }" alt="https://cdn.head-fi.org/assets/classifieds/hf-classifieds_no-image-available_2.jpg" />
              
            </div>
          </div>
          <div class="col-md-8 col-sm-12 col-xs-12">
            <div class="movie-single-ct main-content">
              <h1 class="bd-hd">
                ${data.name} <span>${data.release_date.slice(0, 4)}</span>
              </h1>
              
              <div class="movie-rate">
                <div class="rate">
                  <i class="ion-android-star"></i>
                  <p>
                    <span>${data.vote_average}</span> /10<br />
                    <span class="rv">${data.vote_count} Reviews</span>
                  </p>
                </div>
                <div class="rate-star">
                <p>Rate This Movie:</p>
                <i data-starNum="1" class="s ion-ios-star"></i>
                <i data-starNum="2" class="s ion-ios-star-outline"></i>
                <i data-starNum="3" class="s ion-ios-star-outline"></i>
                <i data-starNum="4" class="s ion-ios-star-outline"></i>
                <i data-starNum="5" class="s ion-ios-star-outline"></i>
                <i data-starNum="6" class="s ion-ios-star-outline"></i>
                <i data-starNum="7" class="s ion-ios-star-outline"></i>
                <i data-starNum="8" class="s ion-ios-star-outline"></i>
                <i data-starNum="9" class="s ion-ios-star-outline"></i>
              </div>
              </div>
              <div class="movie-tabs">
                <div class="tabs">
                  <ul class="tab-links tabs-mv">
                    <li class="active"><a href="#overview">Overview</a></li>
                  </ul>
                  <div class="tab-content">
                    <div id="overview" class="tab active">
                      <div class="row">
                        <div class="col-md-8 col-sm-12 col-xs-12">
                          <p>
                            ${data.overview}
                          </p>
                          <div class="title-hd-sm">
                            <h4>cast</h4>
                          </div>
                          <!-- movie cast -->
                          <div class="mvcast-item">
                            ${this._generateCast(data)}
                          

                          </div>
                        </div>
                        <div class="col-md-4 col-xs-12 col-sm-12 ihatecss">
                          <div class="sb-it">
                            <h6>Director:</h6>
                            <p><a href="#">${
                              data.director.name
                                ? data.director.name
                                : "Not found."
                            }</a></p>
                          </div>
                          <div class="sb-it">
                            <h6>Writers:</h6>
                            <p>
                              ${
                                data.writers.length !== 0
                                  ? data.writers.map(
                                      (person, i) =>
                                        `<a href="#">${
                                          i !== data.writers.length - 1 ||
                                          i !== 0
                                            ? " " + person.name
                                            : person.name
                                        }</a>`
                                    )
                                  : "None found."
                              }
                            </p>
                          </div>
                          <div class="sb-it">
                            <h6>Stars:</h6>
                            <p>
                            ${
                              data.stars.length !== 0
                                ? data.stars.map(
                                    (person, i) =>
                                      `<a href="#">${
                                        i !== data.stars.length - 1 || i !== 0
                                          ? " " + person.name
                                          : person.name
                                      }</a>`
                                  )
                                : "None found."
                            }
                            </p>
                          </div>
                          <div class="sb-it">
                            <h6>Genres:</h6>
                            <p>
                            ${
                              data.genres.length !== 0
                                ? data.genres.map(
                                    (person, i) =>
                                      `<a href="#">${
                                        i !== data.genres.length - 1 || i !== 0
                                          ? " " + person.name
                                          : person.name
                                      }</a>`
                                  )
                                : "None found."
                            }
                            </p>
                          </div>
                          <div class="sb-it">
                            <h6>Release Date:</h6>
                            <p>${
                              data.release_date
                                ? data.release_date
                                : "Not found."
                            }</p>
                          </div>
                          <div class="sb-it">
                            <h6>Run Time:</h6>
                            <p>${
                              data.runtime ? `${data.runtime} min` : "Not found"
                            }</p>
                          </div>
                          <div class="sb-it">
                            <h6>Age Rating:</h6>
                            <p>${
                              data.age_rating ? data.age_rating : "Not found."
                            }</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                      </div>
                    </div>
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
  }
}

export default new previewView();
