import React from "react";
import { useState, useEffect } from "react";
import supabase from "../config/SupabaseClient";
import ReactPaginate from "react-paginate";

const HomeSearch = ({ searchQuery }) => {
  const [searchedData, setSearchedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 7;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Number(startIndex) + Number(itemsPerPage);
  console.log(searchQuery);
  let paginatedData;
  let cumulativeCount = currentPage * itemsPerPage;

  if (searchedData) {
    paginatedData = searchedData.slice(startIndex, endIndex);
  }

  const noResults = paginatedData && paginatedData.length === 0;

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    const fetchSearchData = async () => {
      const { data, error } = await supabase
        .from("BlogDetails")
        .select()
        .ilike("BlogContent", `%${searchQuery}%`);

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setSearchedData(data);
      }
    };
    fetchSearchData();
  }, [searchQuery]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Searched Value</th>
          </tr>
        </thead>
        <tbody>
          {noResults ? (
            <tr>
              <td colSpan="2">No data found.</td>
            </tr>
          ) : (
            paginatedData &&
            paginatedData.map((d, i) => (
              <tr key={i}>
                <td>{cumulativeCount + i + 1}</td>
                <td>
                  <span>{d.BlogContent}</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {searchedData && searchedData.length > itemsPerPage && (
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={Math.ceil((searchedData.length || 0) / itemsPerPage)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination pagination-container"}
          pageClassName={"pagination page-number"}
          pageLinkClassName={"search-pagination"}
          previousClassName={"search-pagination previous"}
          previousLinkClassName={"pagination"}
          nextClassName={"search-pagination next"}
          nextLinkClassName={"search-pagination"}
          activeClassName={"active"}
          breakClassName={"pagination break-item"}
          breakLinkClassName={"search-pagination"}
        />
      )}
    </div>
  );
};

export default HomeSearch;
