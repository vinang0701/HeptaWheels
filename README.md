# HeptaWheels

## 1. Project Structure

-   **Front-end**: `/client/`
-   **Back-end**: `/server/`

## 2. Clone Repository

Before you start, clone the repository from GitHub using the CLI tool in your code editor. Assuming you are using VSCode:

1. In VSCode, open a new terminal. Ensure that you are in the right directory.
2. Type this in the command line to clone the repository:

```bash
git clone https://github.com/vinang0701/HeptaWheels.git
```

At this point, you should have all the files downloaded.

## 3. Install

Please install all the dependencies using the following instructions:

1. In your command line, go into your client directory: cd client

2. Type: npm install. It should download all the dependencies requires using package.json. You should see a folder called "node_module" installed.

3. Next, change to the server directory:

```bash
cd ..
cd server
```

4. Now you will be creating a virtual environment with the following commands:

**Mac/Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows:**

```bash
python3 -m venv venv
./venv/Scripts/activate
```

5. Install the dependencies with requirements.txt:

**Mac/Linux:**

```bash
pip3 install -r requirements.txt
```

**Windows:**

```bash
 pip install -r requirements.txt
```

## 4. Run

Now you should have all the dependencies required to properly run your development environment.
You will need to run both the front-end server and back-end server at the same time.

To run the front-end server:

1. Ensure you are in the client directory.
2. In one terminal, type:

```bash
npm run dev
```

To run the back-end server:

1. Ensure you are in the server directory and you have activated the virtual environment.
2. Open a separate terminal and type:

Mac/Linx:

```bash
python3 app.py
```

Windows:

```bash
python app.py
```
