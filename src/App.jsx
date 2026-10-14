import {useState} from 'react'

function App() {
  const [jobDescription, setJobDescription] = useState(' ')
 
  const [result, setResult] = useState("No analysis yet")
  
  const [resume, setResume] = useState(null)

  const [backendMessage, setBackendMessage] = useState("")
 
  function handleAnalysis() {
    if (resume === null) {
      setResult("Please upload a resume first.")
    }
   else if (jobDescription.trim() === "") {
      setResult("Please enter a job description first.")
    } else {
      setResult("Job description recieved! Ready for AI analysis.")
    }
  }
  async function checkBackend() {
    try {
      const response = await fetch("http://127.0.0.1:8000/")

      if (!response.ok) {
        throw new Error("Backend request failed")
        }
        const data = await response.json()
        setBackendMessage(data.message)
      } catch (error) {
        setBackendMessage("Could not connect to backend.")
        console.error(error)
      }
    }
  
  return (
    
    <main className="App">
    <h1>CareerForge AI</h1>

    <h2>AI-Powereed Career Development Platform</h2>

    <label htmlFor="resumeUpload">Upload Resume </label>
    <input type="file" id="resumeUpload" accept=".pdf,.doc,.docx" 
    onChange={(event) => setResume(event.target.files[0] || null)}
    />
    <h3>Job Description</h3>

    <textarea placeholder="Paste the Job description here" 
    rows="8" cols="50"
    value={jobDescription} 
    onChange={(event) => setJobDescription(event.target.value)}
    />
    <p>{resume ? `Selected File: ${resume.name}` : "No Resume selected"}</p>
    
    <p> Characters typeed: {jobDescription.length}</p>
   
    <br />
    <button onClick={handleAnalysis}> Analyze Resume</button>

    <h3>Results</h3>

    <p>{result}</p>

    <h3>Backend Connection</h3>

    <button onClick={checkBackend}>Test Backend</button>

    <p>{backendMessage}</p>
    </main>
  )
}

export default App