import { useRef , useState} from "react";


function HomePage() {
  const [feedbackItem, setFeedbackItem] =useState([]);

  const emailInputRef=useRef();
  const feedbackInputRef=useRef();

  function onSubmitHandler(event){
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody={email:enteredEmail,text:enteredFeedback};

    fetch('/api/feedback',{
      method : 'POST',
      body : JSON.stringify(reqBody),
      headers :{
        'Content-type' : 'application/json'
      }
    }).then((response)=>response.json())
    .then((data)=>console.log(data));
  }

  function onLoadFeedback() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) =>{
        setFeedbackItem(data.feedback)
      });
  }

  return (

    <div>
      <h1>The Home Page</h1>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="email" >Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef}/>
        </div>
        <div>
          <label htmlFor="feedback" >Your Feedback</label>
          <textarea  id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send FeedBack</button>
      </form>
      <hr/>
        <button onClick={onLoadFeedback}>Load Feedback</button>
        <ul>
          {feedbackItem.map((item)=><li key={item.id}>{item.text}</li>)}
        </ul>
    </div>
  );
}

export default HomePage;
