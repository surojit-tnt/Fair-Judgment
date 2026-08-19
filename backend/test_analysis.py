from uploads.pdf_extractor import extract_text_from_pdf
from services.gemini_service import analyze_judgment
import glob
import os


# Find a PDF inside the uploads folder
pdf_files = glob.glob("uploads/*.pdf")

if not pdf_files:
    print("❌ No PDF found inside the uploads folder.")
    exit()

pdf_path = pdf_files[0]

print(f"Using PDF: {pdf_path}")

# Step 1: Extract text from PDF
text = extract_text_from_pdf(pdf_path)

print("\n===== PDF EXTRACTION =====")
print(text)

# Check whether text was extracted
if not text.strip():
    print("\n❌ No text was extracted from the PDF.")
    exit()

print("\n✅ PDF extraction is working!")
print(f"Extracted characters: {len(text)}")


# Step 2: Send extracted text to Gemini
print("\n===== SENDING TO GEMINI =====")

analysis = analyze_judgment(text)

print("\n===== GEMINI ANALYSIS =====")
print(analysis)