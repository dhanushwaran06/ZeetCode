import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProblemsPage.css";
import { backendUrl } from "../../constants.js";

const ProblemsPage = () => {
  const { pid } = useParams();
  const cleanId = pid.substring(1);
  const [problem, setProblem] = useState(null);
  const [submission, setSubmission] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`${backendUrl}/problem/${cleanId}`);
        if (!response.ok) {
          throw new Error("Problem not found");
        }
        const json = await response.json();
        setProblem(json.problem);
      } catch (error) {
        console.error("Error fetching problem:", error);
      }
    };
    fetchProblem();
  }, [cleanId]);

  const handleKey = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const { selectionStart, selectionEnd, value } = event.target;
      const newValue =
        value.substring(0, selectionStart) +
        "\t" +
        value.substring(selectionEnd);
      event.target.value = newValue;
      event.target.selectionStart = event.target.selectionEnd =
        selectionStart + 1;
    }
    setSubmission(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${backendUrl}/submission`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemId: cleanId,
          submission: submission,
        }),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error("Error submitting code:", error);
    }
  };

  return (
    <div>
      {problem ? (
        <div id="problempage" className="flex-row">
          <div className="ques">
            <h1>{problem.title}</h1>
            <h5>Description</h5>
            <p>{problem.description}</p>
            <code>Input: {problem.exampleIn}</code>
            <code>Output: {problem.exampleOut}</code>
          </div>
          <div className="code">
            <h1>Code Here</h1>
            <div className="code-form">
              <textarea
                onChange={(e) => setSubmission(e.target.value)}
                value={submission}
                onKeyDown={(event) => handleKey(event)}
                placeholder="Enter your code here..."></textarea>
              <button type="submit" id="submit" onClick={handleSubmit}>
                Submit Code
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>The requested problem doesn't exist.</div>
      )}
    </div>
  );
};

export default ProblemsPage;
