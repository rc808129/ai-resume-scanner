import sys
import json

from resume_parser import extract_text
from nlp_processor import process_resume

pdf_path = sys.argv[1]

resume_text = extract_text(pdf_path)

processed_data = process_resume(resume_text)

result = {
    "resumeText": resume_text,
    "nlpData": processed_data
}

print(json.dumps(result))