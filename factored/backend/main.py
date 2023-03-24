import fastapi as _fastapi
import fastapi.security as _security

import sqlalchemy.orm as _orm

import services as _services, schemas as _schemas

app = _fastapi.FastAPI()

@app.post("/api/employees")
async def create_employee(employee: _schemas.EmployeeCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    db_employee = await _services.get_employee_by_email(employee.email, db)
    if db_employee:
        raise _fastapi.HTTPException(status_code= 400, detail="Email already in use")

    return await _services.create_employee(employee,db)

