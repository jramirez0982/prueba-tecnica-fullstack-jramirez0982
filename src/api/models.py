from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Date, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship, validates
import datetime
from typing import List


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    created_at: Mapped[datetime.date] = mapped_column(Date, nullable=False)

    #RELACIONES
    ordenes_usuario: Mapped[List["Order"]] = relationship(foreign_keys="Order.usuario_id", back_populates="user")
    
    def __str__(self):
        return f'{self.name}'


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "created_at": self.created_at,
            "ordenes_usuario": self.ordenes_usuario
        }


class Order(db.Model):
    __tablename__ = "order"
    id_order: Mapped[int] = mapped_column(primary_key=True)
    product_name: Mapped[str] = mapped_column(String(80), nullable=False)
    amount: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False) 

    #RELACIONES
    user: Mapped["User"] = relationship(foreign_keys=[usuario_id], back_populates="ordenes_usuario")

    @validates('amount')
    def validate_amount_positive(self, key, amount):
        #Valida que la cantidad (amount) sea siempre mayor que cero.
        if amount is None or amount <= 0:
            # Lanza un error si la cantidad es cero o negativa
            raise ValueError("La cantidad (amount) debe ser un número entero positivo mayor que cero.")
        
        # Debe retornar el valor si la validación es exitosa
        return amount


    def __str__(self):
        return f'{self.product_name}'

    def serialize(self):
        return{
            "id_order": self.id_order,
            "product_name": self.product_name,
            "amount": self.amount,
            "created_at": self.created_at,
            "usuario_id": self.usuario_id,
            "user": self.user
        }