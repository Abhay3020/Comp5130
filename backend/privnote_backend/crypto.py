# import os
# from cryptography.fernet import Fernet

# # Load the Fernet key from environment variable
# def load_key():
#     key = os.getenv('FERNET_KEY')
#     if key is None:
#         raise ValueError("FERNET_KEY environment variable not set")
#     return key.encode()  # Make sure the key is encoded as bytes

# # Encrypt the note content
# def encrypt_message(message):
#     key = load_key()
#     fernet = Fernet(key)
#     encrypted_message = fernet.encrypt(message.encode())
#     return encrypted_message

# # Decrypt the note content
# def decrypt_message(encrypted_message):
#     key = load_key()
#     fernet = Fernet(key)
#     decrypted_message = fernet.decrypt(encrypted_message).decode()
#     return decrypted_message
from cryptography.fernet import Fernet
import os

# Define the key file path
KEY_FILE_PATH = "secret.key"

# Generate and save a new key if it doesn't exist
def generate_key():
    # Check if the key file already exists
    if not os.path.exists(KEY_FILE_PATH):
        key = Fernet.generate_key()  # Generate a new Fernet key
        with open(KEY_FILE_PATH, "wb") as key_file:
            key_file.write(key)
        print("A new key has been generated and saved.")
    else:
        print("Key already exists.")

# Load the key from the file
def load_key():
    # Ensure the key file exists before loading
    if os.path.exists(KEY_FILE_PATH):
        with open(KEY_FILE_PATH, "rb") as key_file:
            return key_file.read()
    else:
        raise FileNotFoundError(f"Key file '{KEY_FILE_PATH}' not found. Run the script to generate a key.")

# Encrypt a message
def encrypt_message(message):
    key = load_key()  # Load the Fernet key
    fernet = Fernet(key)
    encrypted_message = fernet.encrypt(message.encode())  # Encrypt the message (input is string)
    return encrypted_message

# Decrypt a message
def decrypt_message(encrypted_message):
    key = load_key()  # Load the Fernet key
    fernet = Fernet(key)
    try:
        decrypted_message = fernet.decrypt(encrypted_message).decode()  # Decrypt and convert back to string
        return decrypted_message
    except Exception as e:
        return f"Error: Could not decrypt this note. {str(e)}"

# Ensure key is generated or loaded
generate_key()  # Generate key if it doesn't exist
key = load_key()  # Load the key for use

# Example usage:
if __name__ == "__main__":
    # Encrypt a message
    original_message = "This is a secret note."
    encrypted = encrypt_message(original_message)
    print(f"Encrypted: {encrypted}")

    # Decrypt the message
    decrypted = decrypt_message(encrypted)
    print(f"Decrypted: {decrypted}")

