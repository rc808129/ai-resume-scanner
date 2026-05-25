export const buildJobMatchPrompt = (
  resumeText: string,
  jobDescription: string
) => {
  return `
You are an expert ATS system and technical recruiter.

Analyze the resume against the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

Instructions:
- Give realistic ATS match score between 0-100
- Find matching skills
- Find missing skills
- Give resume improvement suggestions
- Generate likely interview questions
- Return ONLY valid JSON

Required JSON format:

{
  "matchScore": number,
  "matchingSkills": [""],
  "missingSkills": [""],
  "resumeImprovements": [""],
  "atsSuggestions": [""],
  "interviewQuestions": [""]
}
`;
};