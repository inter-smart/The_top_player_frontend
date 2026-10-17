import axios from "axios";

const Terms = ({ data, Lang }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="Terms padding_all">
      <div className="container">
        <div
          className={Lang === "ar" ? "Ar_terms" : "En_terms"}
          dir={Lang === "ar" ? "rtl" : "ltr"}
          dangerouslySetInnerHTML={{
            __html: Lang === "en" ? data[0].content : data[0].content_ar,
          }}
        />
      </div>
    </div>
  );
};

export default Terms;

export async function getServerSideProps({ req, params }) {
  try {
    const { data } = await axios.get(`${process.env.customKey}/terms`);
    return {
      props: {
        data,
        Lang: params.Lang,
      },
    };
  } catch (error) {
    //console.log(error.message);
    return {
      props: {
        error: error.message,
      },
    };
  }
}
