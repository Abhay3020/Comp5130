import pymongo

url = 'mongodb://localhost:27017/'
client = pymongo.MongoClient(url)

db = client['demo']  # or whatever the database name is
