import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function PaintingShow() {
  const [painting, setPainting] = useState({});
  const params = useParams();

  const handleShowPainting = () => {
    axios.get(`/paintings/${params.id}.json`).then((response) => {
      setPainting(response.data);
      console.log(painting);
    });
  };

  useEffect(handleShowPainting, []);

  return (
    <section className="py-5 bg-light">
      <Link className="text-dark ms-5" to="/gallery">
        {" "}
        {/* LEFT ARROW ICON */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-arrow-left-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg>
      </Link>
      <div className="text-center">
        <h1 className="fw-bolder display-4">{painting.description}</h1>
      </div>
      <div className="container px-4 px-lg-5 mt-5">
        <div className="card h-100">
          <div className="card-body p-4"></div>
          <div className="pb-5">
            <div className="portfolio-modal" id="portfolioModal1" tabIndex="-1" role="dialog" aria-hidden="true">
              <div className="modal-content">
                <div className="close-modal"></div>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <div className="modal-body">
                        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                          <div className="carousel-inner">
                            {painting.images &&
                              painting.images.map((image, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                  <img
                                    className="img-fluid d-block mx-auto custom-height"
                                    src={image.url}
                                    alt={`Image ${index + 1}`}
                                  />
                                </div>
                              ))}
                          </div>
                          {/* <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleDark"
                            data-bs-slide="prev"
                          >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                          </button> */}
                          {/* <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleDark"
                            data-bs-slide="next"
                          >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div className="text-center">
              <a className="btn btn-outline-dark mt-auto" href="/contact">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
