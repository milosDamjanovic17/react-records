import React, { useEffect, useState } from "react";
import RecordModel from "../../models/Record";
import SpinnerLoading from "../../Utils/SpinnerLoading";
import SearchRecord from "./components/SearchRecord";
import Pagination from "../../Utils/Pagination";

const SearchBooksPage = () => {
  const [records, setRecords] = useState<RecordModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [totalRecordsAmount, setTotalRecordsAmount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");
  const [searchUrl, setSearchUrl] = useState("");

  useEffect(() => {
    async function fetchRecords() {
      const baseUrl: string = "http://localhost:8080/api/records";

      let renderUrl = "";
      if (searchUrl === "") {
        renderUrl = `${baseUrl}?page=${currentPage - 1}&size=${recordsPerPage}`;
      } else {
        renderUrl = baseUrl + searchUrl;
      }

      const response = await fetch(renderUrl);

      if (!response.ok) {
        throw new Error("Whoops! Something went wrong...");
      }

      const responseJson = await response.json();

      const responseData = responseJson._embedded.records;

      setTotalRecordsAmount(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages);

      const loadedRecords: RecordModel[] = [];

      for (const key in responseData) {
        loadedRecords.push({
          id: responseData[key].id,
          title: responseData[key].title,
          artist: responseData[key].artist,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          genre: responseData[key].genre,
          img: responseData[key].img,
        });
      }

      setRecords(loadedRecords);
      setIsLoading(false);
    }

    fetchRecords().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    <div className="container m-5">
      <p>{httpError}</p>
    </div>;
  }

  const searchHandleChange = () => {
    if (search === "") {
      setSearchUrl("");
    } else {
      setSearchUrl(
        `/search/findByTitleContaining?title=${search}&page=0&size=${recordsPerPage}`
      );
    }
  };

  const indexOfLastRecord: number = currentPage * recordsPerPage;
  const indexOfFirstBook: number = indexOfLastRecord - recordsPerPage;

  let lastItem =
    recordsPerPage * currentPage <= totalRecordsAmount
      ? recordsPerPage * currentPage
      : totalRecordsAmount;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search records here"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-outline-success"
                onClick={() => searchHandleChange()}
              >
                Search
              </button>
            </div>
          </div>
          <div className="col-4">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle mt-1"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a href="#" className="dropdown-item">
                    All Genres
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    House
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    Trance
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    HipHop/R&B
                  </a>
                </li>
                <li>
                  <a href="#" className="dropdown-item">
                    D&B
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {totalRecordsAmount > 0 ? (
            <>
              <div className="mt-3">
                <h5>Number of records: ({totalRecordsAmount})</h5>
              </div>
              <p>
                {indexOfFirstBook + 1} to {lastItem} of {totalRecordsAmount}{" "}
                records:
              </p>
              {records.map((rec) => (
                <SearchRecord record={rec} key={rec.id} />
              ))}
            </>
          ) : (
            <div className="m-5">
              <h3>
               Can't find the record you are looking for?
              </h3>
              <a
                href="#"
                type="button"
                className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
              >
                Records Services
              </a>
            </div>
          )}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBooksPage;
