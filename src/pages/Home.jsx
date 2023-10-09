import React, { useEffect, useState } from "react";
import supabase from "../config/SupabaseClient";
import DreamCard from "../components/DreamCard";

const Home = () => {
  const [dreamTitles, setDreamTitles] = useState(null);

  useEffect(() => {
    const fetchDreamTitles = async () => {
      const { data, error } = await supabase.from("BlogHeaders").select();

      if (error) {
        console.log(error);
      }
      if (data) {
        //console.log(data);
        setDreamTitles(data);
      }
    };

    fetchDreamTitles();
  }, []);
  return (
    <div>
      {dreamTitles && (
        <div className="container">
          <div className="row">
            {dreamTitles.map((dreamTitle) => (
              <div className="col-md-4" key={dreamTitle.id}>
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
