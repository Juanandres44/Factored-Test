import pydantic as _pydantic

class _EmployeeBase(_pydantic.BaseModel):
    email:str
    name: str
    avatar:str
    position:str

class EmployeeCreate(_EmployeeBase):
    hashed_password: str

    class Config:
        orm_mode = True

class Employee(_EmployeeBase):
    id: int
    
    class Config: 
        orm_mode = True

class _SkillBase(_pydantic.BaseModel):
    name: str

class SkillCreate(_SkillBase):
    pass

class Skill(_SkillBase):
    id: int
    employee_id: int 

    class Config:
        orm_mode = True