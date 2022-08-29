import { Fragment, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import "./App.css";
import BarChart from "./components/BarChart/BarChart";
import CustomModal from "./components/Modal/Modal";
import Pagination from "./components/Pagination/Pagination";
import RepoCard from "./components/RepoCard/RepoCard";
import SearchBox from "./components/SearchBox/SearchBox";
import { fetchProfileData } from "./services";

const SORT_ITEMS = [
  {
    id: 0,
    label: "Stars",
    value: "stars",
  },
  {
    id: 1,
    label: "Watchers Count",
    value: "watchers_count",
  },
  {
    id: 2,
    label: "Score",
    value: "scores",
  },
  {
    id: 3,
    label: "Name",
    value: "name",
  },
  {
    id: 4,
    label: "Craeted At",
    value: "created",
  },
  {
    id: 5,
    label: "Updated At",
    value: "updated",
  },
];

function App() {
  const [searchText, setSearchText] = useState("");
  const [resultList, setResultList] = useState([]);
  const [sortType, setSortType] = useState({});
  const [sortOrder, setSortOrder] = useState("");
  const [isLoaded, setIsloaded] = useState({status : true});
  const [toggleChart, setToggleChart] = useState(false)
  const [paginate, setPaginate] = useState({
    pageCount: 1,
    totalRecords: 0,
  });

  const handleChangeSearch = (event) => {
    const { value } = event.target;
    setSearchText(value);
  };

  const onHandlePage = (count) => {
    setPaginate({ ...paginate, pageCount: count });
  };

  const fetchData = () => {
    if (searchText) {
      setIsloaded({status : false});
      fetchProfileData({
        name: searchText,
        sort: sortType.value,
        order: sortOrder,
        page: paginate.pageCount,
      }).then((result) => {
        if (result.items) {
          setResultList(result.items);
          setPaginate({ ...paginate, totalRecords: result.total_count });
          setIsloaded({status : true, error : false});
        } else {
          setIsloaded({status : true, error : true, msg : result.message});
        }
      })
    } else {
      setResultList([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 800);

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    if (resultList.length > 0) {
		fetchData()
	}
  }, [sortOrder, sortType, paginate.pageCount]);

  const handleCloseAlert = () => {
    setSearchText('')
    setSortType({})
    setSortOrder('')
    setIsloaded({status : true, error : false});
  }

  if (!isLoaded.status) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (isLoaded.error) {
    return (
      <Alert variant="danger" onClose={handleCloseAlert} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          {isLoaded.msg}
        </p>
      </Alert>
    );
  }

  return (
    <div className="App">
      <SearchBox value={searchText} onChange={handleChangeSearch} />
      <div className="d-flex justify-content-center mt-3">
        Sort by :-{" "}
        <div>
          {SORT_ITEMS.map((item) => (
            <button
              className="sortButton mr-1"
              key={item.id}
              onClick={() => setSortType(item)}
              style={{
                backgroundColor:
                  sortType.value === item.value
                    ? "rgb(134, 128, 212)"
                    : "rgb(226, 227, 229)",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button
          style={{
            backgroundColor:
              sortOrder === "asc" ? "rgb(134, 128, 212)" : "rgb(226, 227, 229)",
          }}
          className="sortButton mr-1"
          onClick={() => setSortOrder("asc")}
        >
          Ascending
        </button>
        <button
          style={{
            backgroundColor:
              sortOrder === "desc"
                ? "rgb(134, 128, 212)"
                : "rgb(226, 227, 229)",
          }}
          className="sortButton mr-1"
          onClick={() => setSortOrder("desc")}
        >
          Descending
        </button>
      </div>
	  {resultList.length > 0 && <div className="d-flex justify-content-end mt-2">
		<button onClick={() => setToggleChart(!toggleChart)}>Show Chart</button>
	  </div>}
      <div className="cardContainer">
        {resultList.length > 0 ? (
          <>
            {resultList.map((repo) => (
              <Fragment key={repo.id}>
                <RepoCard details={repo} />
              </Fragment>
            ))}
          </>
        ) : (
          <h3>No data found.</h3>
        )}
      </div>
      {resultList.length > 0 && (
        <Pagination
          currentPage={paginate.pageCount}
          totalCount={paginate.totalRecords}
          onHandlePage={onHandlePage}
        />
      )}
	  {toggleChart && <CustomModal heading='Language Chart' onHide={() => setToggleChart(!toggleChart)} show={toggleChart}>
	  <BarChart resultList={resultList} /></CustomModal>}
    </div>
  );
}

export default App;
