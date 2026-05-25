import { Request, Response } from "express";
import path from "path";
import { buildJobMatchPrompt } from "../prompts/jobMatch.prompt";

import { parseResume } from "../services/python.service";
import groq from "../services/groq.service";
import { buildResumePrompt } from "../prompts/resume.prompt";

export const uploadResume = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required",
      });
    }

    const filePath = path.join(req.file.path);

    // Step 1 → Parse Resume
    const parsedData = await parseResume(filePath);

    const resumeText =
  parsedData.resumeText;
  const nlpData =
  parsedData.nlpData;

    // Step 2 → Prompt Engineering
    const prompt = buildResumePrompt(resumeText,
       nlpData);

    // Step 3 → OpenAI Analysis
  const completion = await groq.chat.completions.create({
  messages: [
    {
      role: "user",
      content: prompt,
    },
  ],

  model: "llama-3.3-70b-versatile"
});

const response =
  completion.choices[0].message.content || "{}";

 const cleanResponse = response
  ?.replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const parsedResponse = JSON.parse(
  cleanResponse
);


    // Final Response
    return res.status(200).json({
      success: true,
      extractedResumeText: resumeText,
      analysis: parsedResponse,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Resume analysis failed",
      error,
    });
  }
};




export const matchResumeWithJob = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required",
      });
    }

    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        message: "Job description is required",
      });
    }

    const filePath = path.join(req.file.path);

    // Resume Parsing
  const parsedData = await parseResume(filePath);

  const nlpData =
  parsedData.nlpData;

  const resumeText =
  parsedData.resumeText;

    // Prompt
    const prompt = buildJobMatchPrompt(
      resumeText,
      jobDescription
    );

    // AI Analysis
    const completion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        model: "llama-3.3-70b-versatile",
      });

    const response =
      completion.choices[0].message.content || "{}";

    const cleanResponse = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedResponse = JSON.parse(
      cleanResponse
    );

  return res.status(200).json({
  success: true,

  extractedResumeText: resumeText,

  nlpData,

  analysis: parsedResponse,
});
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Job match analysis failed",
      error,
    });
  }
};