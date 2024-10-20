# HeptaWheels

## 1. Project Structure

-   **Front-end**: `/client/`
-   **Back-end**: `/server/`

## 2. Clone Repository

Before you start, clone the repository from GitHub using the CLI tool in your code editor. Assuming you are using VSCode:

i. In VSCode, open a new terminal. Ensure that you are in the right directory.  
ii. Type this in the command line to clone the repository:

```bash
git clone https://github.com/vinang0701/HeptaWheels.git
```

At this point, you should have all the files downloaded.

## 3. Install

Please install all the dependencies using the following instructions:

i. In your command line, go into your client directory: cd client
ii. Type: npm install. It should download all the dependencies requires using package.json. You should see a folder called "node_module" installed.
iii. Next, change to the server directory:

```bash
cd ..
cd server
```

iv. Now you will be creating a virtual environment with the following commands:
Mac/Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

```bash
Windows:
python3 -m venv venv
./venv/Scripts/activate
```

v. Install the dependencies with requirements.txt
Mac/Linux:

```bash
pip3 install -r requirements.txt
```

```bash
Windows: pip install -r requirements.txt
```