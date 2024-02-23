import { extractFeedback, buildFeedbackPath } from "./feedback";

function handler(req,res){

    const feedbackId= req.query.feedbackId;
    const filePath= buildFeedbackPath();
    const data = extractFeedback(filePath);
    const selectedFeedbackItem= data.find(feedback=>(feedback.id === feedbackId));

    res.status(200).json({feedback:selectedFeedbackItem});
}

export default handler;