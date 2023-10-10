import React, { useEffect, useState } from "react";
import supabase from "../config/SupabaseClient";
import DreamCard from "../components/DreamCard";
import HomeSearch from "../components/HomeSearch";

const Home = () => {
  const [dreamTitles, setDreamTitles] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="main">
      <div className="border-card">
        <div className="leftItem">
          <div className="info-box">
            <h3>Dream-Dictionary အိပ်မက်အဘိဓာန် </h3>
            <br />
            <p>
              အက္ခရာ အစဉ်လိုက် (က မှ အ ထိ) အိပ်မက် နိမိတ်များ ၊
              အိမ်မက်အမျိုးမျိုးနှင့်အသားလှုပ်နိမိတ် ၊အိမ်မက်နှင့် ပါတ်သက်သော
              နိမိတ်များ ၊ အိပ်မက်အဘိဓာန် အိမ်မက်နိမိတ်အတွက်
              မသိသေးသောသူများအတွက် အိပ်မက်နှင့်ပတ်သက်သော နိမိတ်များ
              (အိမ်မက်အမျိုးမျိုးနှင့်အသားလှုပ်နိမိတ်)စာအုပ်မှကူးယူဖော်ပြပေးထားပါသည်
            </p>
            <input
              type="text"
              placeholder="Search Dreams"
              className="dream-detail-search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="rightItem">
          <div className="dream-box">
            {isPending && <p>Loading</p>}
            {searchQuery.length === 0 &&
              dreamTitles &&
              dreamTitles.map((dreamTitle) => (
                <div key={dreamTitle.id}>
                  <DreamCard dreamTitle={dreamTitle} />
                </div>
              ))}
            {searchQuery.length !== 0 && (
              <HomeSearch searchQuery={searchQuery} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
