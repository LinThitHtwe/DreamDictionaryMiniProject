import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../config/SupabaseClient";
import ReactPaginate from "react-paginate";

const DreamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const backBtnClick = () => {
    navigate("/");
  };
  return (
    <div className="dream-detail">
      <div className="dream-detail-card">
        <div className="dream-detail">
          <table className="table table-hover table-bordered table-striped text-dark font-weight-light">
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
                    <td>{cumulativeCount + i + 1}</td>
                    <td>
                      <span>{d.BlogContent}</span>
                    </td>
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
            containerClassName={"pagination pagination-container"}
            pageClassName={"pagination page-number"}
            pageLinkClassName={"pagination"}
            previousClassName={"pagination previous"}
            previousLinkClassName={"pagination"}
            nextClassName={"pagination next"}
            nextLinkClassName={"pagination"}
            activeClassName={"active"}
            breakClassName={"pagination break-item"}
            breakLinkClassName={"pagination"}
          />
        </div>
      </div>
      <div className="backbutton-container">
        <button type="button" class="btn btn-secondary" onClick={backBtnClick}>
          Back
        </button>
      </div>
    </div>
  );
};

export default DreamDetail;
