import os
import shutil
from uuid import uuid4

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException,
    Depends
)

from sqlalchemy.orm import Session

from .docsdb import get_db
from .models import Document


router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    # Check PDF
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    # Generate unique filename
    unique_filename = f"{uuid4()}_{file.filename}"

    file_path = os.path.join(
        UPLOAD_FOLDER,
        unique_filename
    )

    # Save PDF
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    # Save metadata in PostgreSQL
    document = Document(
        filename=file.filename,
        file_path=file_path
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return {
        "message": "PDF uploaded successfully",
        "document_id": document.id,
        "filename": document.filename,
        "file_path": document.file_path
    }


@router.get("/")
def get_documents(
    db: Session = Depends(get_db)
):

    documents = db.query(Document).all()

    return documents