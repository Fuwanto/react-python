from api.endpoints import users, posts


def configure_api_router(app):
    app.include_router(users.router)
    app.include_router(posts.router)
