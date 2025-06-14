import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div class="container my-5">
        <footer class="text-center text-lg-start text-color">
          <div class="container-fluid p-4 pb-0">
            <section class="">
              <div class="row">
                <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase custom-bg-text">
                    Travel Planner
                  </h5>

                  <p>
                    Welcome to our event management system website, where every
                    detail meets perfection. Let's turn your vision into an
                    unforgettable experience!
                  </p>
                </div>

                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color-second">About us</h5>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="https://www.instagram.com/jaydudhale/" class="text-color">
                        Jay Dudhale
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/logophile/" class="text-color">
                         Ashwini Khedkar
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/fit_abhi.1010/" class="text-color">
                        Abhishek Pandarkar
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/muddu_1313/" class="text-color">
                        Muddasar Shaikh
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-color-second">Contact us</h5>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a href="mailto:jaydudhale@gmail.com" class="text-color">
                        jaydudhale@gmail.com
                      </a>
                    </li>
                    <li>
                      <a href="mailto:ashwinikhedkar8080@gmail.com" class="text-color">
                        ashwinikhedkar8080@gmail.com
                      </a>
                    </li>
                    <li>
                      <a href="mailto:abhishekpandarkar10@gmail.com" class="text-color">
                        abhishekpandarkar10@gmail.com
                      </a>
                    </li>
                    <li>
                      <a href="mailto:muddasarshaikh07786@gmail.com" class="text-color">
                        muddasarshaikh07786@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>

               

                
              </div>
            </section>

            <hr class="mb-4" />

            <section class="">
              <p class="d-flex justify-content-center align-items-center">
                <span class="me-3 custom-bg-text">Login from here</span>
                <Link to="/user/login" class="active">
                  <button
                    type="button"
                    class="btn btn-outline-light btn-rounded bg-color custom-bg-text"
                  >
                    Log in
                  </button>
                </Link>
              </p>
            </section>

            <hr class="mb-4" />
          </div>

          <div class="text-center">
            © 2025 Copyright:
            <a class="text-color-3" href="#">
              tourandtravels.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
