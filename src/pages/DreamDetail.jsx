import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../config/SupabaseClient";
import ReactPaginate from "react-paginate";

const DreamDetail = () => {
  const { id } = useParams();
  const [dreamDetails, setDreamDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPending, setIsPending] = useState(true);
  const itemsPerPage = 8;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Number(startIndex) + Number(itemsPerPage);
  let paginatedData;
  let cumulativeCount = currentPage * itemsPerPage;
  if (dreamDetails) {
    paginatedData = dreamDetails.slice(startIndex, endIndex);
  }

  useEffect(() => {
    const fetchDreamDetails = async () => {
      const { data, error } = await supabase
        .from("BlogDetails")
        .select()
        .eq("BlogId", id);

      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        setDreamDetails(data);
        setIsPending(false);
      }
    };
    fetchDreamDetails();
  }, [id]);
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  return (
    <div class="card sm">
      <div className="card-body">
        <h5 class="card-title">Card title</h5>
        <table className="table table-hover table-bordered table-striped">
          <thead>
            <tr>
              <th>No.</th>
              <th>Questions</th>
            </tr>
          </thead>
          <tbody>
            {isPending && <td>Loading</td>}

            {paginatedData &&
              paginatedData.map((d, i) => (
                <tr key={d.id}>
                  <th>{cumulativeCount + i + 1}</th>
                  <th>
                    <span>{d.BlogContent}</span>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil((dreamDetails?.length || 0) / itemsPerPage)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
          breakClassName={"page-item disabled"}
          breakLinkClassName={"page-link"}
        />

        <button type="button" class="btn btn-secondary">
          Back
        </button>
      </div>
    </div>
  );
};

export default DreamDetail;
