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
          </div>
        </div>
        <div className="rightItem">
          <div className="dream-box">
            {dreamTitles &&
              dreamTitles.map((dreamTitle) => (
                <div key={dreamTitle.id}>
                  <DreamCard dreamTitle={dreamTitle} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
