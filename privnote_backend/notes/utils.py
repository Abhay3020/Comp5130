from cryptography.fernet import Fernet

# Encryption setup
# ENCRYPTION_KEY = Fernet.generate_key()
# cipher = Fernet(ENCRYPTION_KEY)

# def encrypt_content(content):
#     return cipher.encrypt(content.encode()).decode()

# def decrypt_content(encrypted_content):
#     return cipher.decrypt(encrypted_content.encode()).decode()

from cryptography.fernet import Fernet

# Pre-generated encryption key (securely store it in production)
SECRET_KEY = b'h3KI6SKZTFu_iPG92KlRs2bW0CsJkKnHhT87_QqAxnE='  # Replace with your key
cipher = Fernet(SECRET_KEY)

# Encrypt content
def encrypt_content(content):
    """
    Encrypt the provided content using Fernet encryption.
    """
    return cipher.encrypt(content.encode()).decode()

# Decrypt content
def decrypt_content(encrypted_content):
    """
    Decrypt the provided content using Fernet encryption.
    """
    try:
        return cipher.decrypt(encrypted_content.encode()).decode()
    except Exception as e:
        raise ValueError("Failed to decrypt content: " + str(e))
import bcrypt

# Verify password function
def verify_password(plaintext_password, hashed_password):
    """
    Verify a plaintext password against a hashed password using bcrypt.
    """
    if not plaintext_password or not hashed_password:
        return False
    return bcrypt.checkpw(plaintext_password.encode('utf-8'), hashed_password.encode('utf-8'))


# Hash password function
def hash_password(plaintext_password):
    """
    Hash a plaintext password using bcrypt.
    """
    return bcrypt.hashpw(plaintext_password.encode('utf-8'), bcrypt.gensalt()).decode()

