import React, { useEffect, useState } from "react";
import supabase from "../config/SupabaseClient";
import DreamCard from "../components/DreamCard";

const Home = () => {
  const [dreamTitles, setDreamTitles] = useState(null);
  const [isPending, setIsPending] = useState(true);
  useEffect(() => {
    const fetchDreamTitles = async () => {
      const { data, error } = await supabase.from("BlogHeaders").select();

      if (error) {
        console.log(error);
      }
      if (data) {
        setDreamTitles(data);
        setIsPending(false);
      }
    };

    fetchDreamTitles();
  }, []);
  return (
    <div>
      {dreamTitles && (
        <div className="container">
          {isPending && <p>Loading</p>}
          <div className="row">
            {dreamTitles.map((dreamTitle) => (
              <div
                className="col-md-2 mb-4 mt-4 text-center font-weight-light "
                key={dreamTitle.id}
              >
                <DreamCard dreamTitle={dreamTitle} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
