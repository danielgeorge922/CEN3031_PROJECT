from dotenv import load_dotenv
import os

load_dotenv()

ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Token expiration time in minutes
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
