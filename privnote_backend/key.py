from cryptography.fernet import Fernet
key = b'cxdoN2CB3ODCSxVji34vRD1t0fSRuCokkleBCmK5-yQ='
fernet = Fernet(key)

# Test encryption
original_content = "This is a test note"
encrypted_content = fernet.encrypt(original_content.encode()).decode()
print(f"Encrypted content: {encrypted_content}")

# Test decryption
decrypted_content = fernet.decrypt(encrypted_content.encode()).decode()
print(f"Decrypted content: {decrypted_content}")
