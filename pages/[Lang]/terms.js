import htmlParser from "@/helpers/parse";
import axios from "axios";

const Terms = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // const parsedDataEng = htmlParser(data[0].content);
  // const parsedDataAr = htmlParser(data[0].content_ar);
  return (
    <div className="Terms padding_all">
      <div className="container">
        <div
          className="En_terms"
          dangerouslySetInnerHTML={{ __html: data[0].content }}
        />

        <hr />
        <div className="Ar_terms">
          <div
            className="En_terms"
            dangerouslySetInnerHTML={{ __html: data[0].content_ar }}
          />

          {/* {parsedDataAr.map((items) => (
            <>
              <h2 className="title">{items.title}</h2>
              <ol>
                {items?.values.map((points) => (
                  <li key={items.title}>{points}</li>
                ))}
              </ol>
            </>
          ))} */}
        </div>
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
