from core.config.database import engine
from core.config.database import Base
from core.models import post, user, relations


if __name__ == "__main__":
    #   Verificar la conexión a la base de datos
    try:
        print(engine)
    except Exception as e:
        print(f"Error en la conexión a la base de datos: {str(e)}")

    # resetdb
    print("Resetting database")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    print("Database reset")
