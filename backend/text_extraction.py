from uploads.pdf_extractor import extract_text_from_pdf


pdf_path = "uploads/High_Court_Judgement_Sample.pdf"

text = extract_text_from_pdf(pdf_path)

print(text)