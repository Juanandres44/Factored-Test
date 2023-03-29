from fastapi import FastAPI, status, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import json

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Employee(BaseModel):
    name: str
    position: str
    avatar: str
    skills: list[str] = []
    skillValue: list[int] = []


# Load the JSON file
with open("employeeDB.json") as f:
    employees = json.load(f)["employees"]


@app.post("/employee/create/")
async def create_employee(employee: Employee, response: Response):
    try:
        with open("employeeDB.json", "r") as f:
            employees = json.load(f)
    except FileNotFoundError:
        employees = {"employees": []}
    
    employees["employees"].append(employee.dict())
    
    with open("employeeDB.json", "w") as f:
        json.dump(employees, f, indent=2)
    
    response.status_code = status.HTTP_201_CREATED
    return {"message": "Employee created successfully"}


@app.get("/employees/")
async def get_employees():
    return employees


@app.get("/employees/{employee_name}")
async def get_employee(employee_name: str):
    for employee in employees:
        if employee["name"] == employee_name:
            return employee
    raise HTTPException(status_code=404, detail=f"Employee '{employee_name}' not found")