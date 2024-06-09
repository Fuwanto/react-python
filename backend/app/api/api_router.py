from api.endpoints import users, posts, stats


def configure_api_router(app):
    app.include_router(users.router)
    app.include_router(posts.router)
    app.include_router(stats.router)
