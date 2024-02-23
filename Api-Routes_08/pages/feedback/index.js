import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

function FeedbackPage(props) {

    const [feedbackEmail, setFeedbackEmail]=useState();

    function loaderEmail(id){
        fetch(`/api/${id}`).then(response=>response.json()).then(data=>{
            setFeedbackEmail(data.feedback);
        })

    }
  return (
    <Fragment>
    {feedbackEmail && <p> {feedbackEmail.email}</p>}
    <ul>
      {props.feedbackItem.map((item) => (
        <li key={item.id}>
          {item.text}
          <button onClick={loaderEmail.bind(null, item.id)}>Show Email</button>
        </li>
      ))}
    </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItem: data,
    },
  };
}

export default FeedbackPage;
