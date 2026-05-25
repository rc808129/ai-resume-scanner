import nltk
import spacy

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# nltk.download("punkt")
# nltk.download("punkt_tab")
# nltk.download("stopwords")

nlp = spacy.load("en_core_web_sm")

skills_db = [
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "TypeScript",
    "Python",
    "Docker",
    "AWS",
    "Redux",
    "JWT",
    "Mongoose",
]

def process_resume(text):

    # Lowercase
    text = text.lower()

    # Tokenization
    words = word_tokenize(text)

    # Remove stopwords
    stop_words = set(stopwords.words("english"))

    filtered_words = [
        word for word in words
        if word.isalnum() and word not in stop_words
    ]

    clean_text = " ".join(filtered_words)

    # spaCy processing
    doc = nlp(clean_text)

    extracted_skills = []

    for skill in skills_db:
        if skill.lower() in clean_text:
            extracted_skills.append(skill)

    entities = []

    for ent in doc.ents:
        entities.append({
            "text": ent.text,
            "label": ent.label_
        })

    return {
        "cleanText": clean_text,
        "skills": extracted_skills,
        "entities": entities
    }