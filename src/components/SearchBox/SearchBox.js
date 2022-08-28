import { Fragment } from "react";
import './SearchBox.css'

const SearchBox = ({placeholder = 'Search...', value = '', onChange = null }) => {
  return (
    <Fragment>
      <div className="container">
        <input placeholder={placeholder} onChange={onChange} value={value} className="js-search" type="text" />
        <i className="fa fa-search"></i>
      </div>
    </Fragment>
  );
};

export default SearchBox;
