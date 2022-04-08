from fastapi import FastAPI, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles

from core import models
from core.virustotal import check_on_virustotal
from db import Session, get_db, crud, schemas

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """load the home page"""
    return RedirectResponse('/index.html', status_code=status.HTTP_302_FOUND)


@app.post("/api/check", response_model=schemas.Item)
async def check_item(request: models.CheckRequest, db: Session = Depends(get_db)):
    """check the incoming request on virus total and save data on db"""
    result = await check_on_virustotal(request.target)
    item_created = crud.create_item(db, schemas.ItemCreate(target=request.target, **result))
    return item_created


@app.get("/api/items", response_model=list[schemas.Item])
async def items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """list all the request item saved on the database up to limit"""
    item_list = crud.get_items(db, skip=skip, limit=limit)
    return item_list


# mount the front end website in production
app.mount("/", StaticFiles(directory="frontend/build"), name="static")
