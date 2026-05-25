export const buildResumePrompt = (
  resumeText: string,
  nlpData: any
) => {
  return `
You are an expert ATS resume analyzer and senior technical recruiter.

Analyze the following resume professionally.

Resume:
${resumeText}
Extracted Skills:
${JSON.stringify(nlpData.skills)}
Entities:
${JSON.stringify(nlpData.entities)}


Instructions:
- ATS score should be realistic between 0-100.
- Evaluate technical skills, projects, architecture knowledge, deployment, scalability, and resume quality.
- Give professional analysis.
- Keep suggestions concise and useful.
- Return ONLY valid JSON.
- Do not include markdown.

Required JSON format:

{
  "atsScore": number,
  "strengths": [""],
  "weaknesses": [""],
  "missingSkills": [""],
  "suggestions": [""],
  "interviewQuestions": [""]
}
`;
};