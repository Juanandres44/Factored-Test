import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash
import database as _database

class Employee(_database.Base):
    __tablename__ = "employees"
    id = _sql.Column(_sql.Integer, primary_key=True, index =True)
    email = _sql.Column(_sql.String, unique=True, index=True)
    hashed_password = _sql.Column(_sql.String)
    name = _sql.Column(_sql.String, index =True)
    avatar = _sql.Column(_sql.String, index=True)
    position = _sql.Column(_sql.String, index=True)
    skills = _orm.relationship("Skill", back_populates="employee")

    def verify_passwd(self, password: str):
        return _hash.bcrypt.verify(password, self.hashed_password)

class Skill(_database.Base):
    __tablename__ = "skills"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    name = _sql.Column(_sql.String)
    employee_id = _sql.Column(_sql.Integer, _sql.ForeignKey("employees.id"))
    employee = _orm.relationship("Employee", back_populates="skills")

