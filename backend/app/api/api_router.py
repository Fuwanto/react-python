from api.endpoints import users


def configure_api_router(app):
    app.include_router(users.router)
