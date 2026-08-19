import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=GEMINI_API_KEY)

def analyze_judgment(text: str):

    prompt = f"""
You are an AI assistant helping analyze Indian court judgments.

Analyze the following judgment carefully.

Provide:

1. Case title
2. Court
3. Case number
4. Parties involved
5. Important facts
6. Main legal issues
7. Arguments made by the parties
8. Relevant laws or sections mentioned
9. Court's reasoning
10. Final decision/judgment
11. Important takeaways

Do not invent information.
If something is not present in the judgment, say "Not mentioned".

JUDGMENT TEXT:
{text}
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    return response.text