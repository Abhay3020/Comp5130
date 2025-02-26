# PrivNote

This project is a Django-based backend for a private note-taking application. It provides functionalities to store and manage self-destructing private notes securely.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abhay3020/Comp5130.git
   cd Comp5130-week-13/privnote_backend
   ```

2. **Create a virtual environment and activate it:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

## Usage
- The backend exposes APIs to create, retrieve, and delete private notes.
- Ensure `key.py` contains necessary secret keys and configurations.
- The backend may rely on Redis (`dump.rdb`) for temporary data storage.

## Project Structure
```
privnote_backend/
│── manage.py        # Django project management script
│── db.sqlite3       # SQLite database file
│── key.py           # Configuration file (ensure it's not exposed publicly)
│── notes/           # Django app handling note functionalities
```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.
