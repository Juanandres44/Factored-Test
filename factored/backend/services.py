import database as _database, schemas as _schemas, models as _models
import passlib.hash as _hash

import sqlalchemy.orm as _orm

def create_database():
    return _database.Base.metadata.create_all(bind=_database.engine)

def get_db():
    db = _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_employee_by_email(email: str, db: _orm.Session):
    return db.query(_models.Employee).filter(_models.Employee.email == email).first()    

async def create_employee(employee: _schemas.EmployeeCreate, db: _orm.Session):
    user_obj = _models.Employee(email=employee.email, hashed_password=_hash.bcrypt.hash(employee.hashed_password)
    )
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj
