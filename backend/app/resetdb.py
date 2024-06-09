from core.config.database import engine
from core.config.database import Base
from core.models.user import User
from core.models.category import Category
from core.models.post import Post
from core.models.comment import Comment
from core.models.like import Like


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
