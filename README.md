# HeptaWheels
This is a used car marketplace where people connect to buy or sell cars. This project consists of 4 different user profiles: User Admin, Used Car Agent, Seller and Buyer

## Pre-requisites
nodejs v21.7.1

python 3.x

mongodb atlas account with IP address added

## 1. Project Structure

-   **Front-end**: `/client/`
-   **Back-end**: `/server/`

## 2. Clone Repository

Before you start, clone the repository from GitHub using the CLI tool in your code editor. Assuming you are using VSCode:

#### 1. In VSCode, open a new terminal. Ensure that you are in the right directory.
#### 2. Type this in the command line to clone the repository:

```bash
git clone https://github.com/vinang0701/HeptaWheels.git
```

At this point, you should have all the files downloaded.

## 3. Install

Please install all the dependencies using the following instructions:

Open up two terminals, one will be for the front-end, the other for the back-end.

#### 1. In one terminal, go to the client directory.
```bash
cd client
```

#### 2. Type: npm install. It should download all the dependencies requires using package.json. You should see a folder called "node_module" installed.
```bash
npm install
```

#### 3. Next, in another terminal, go to the server directory:

```bash
cd server
```

#### 4. Now you will be creating a virtual environment with the following commands:

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

#### 5. Install the dependencies with requirements.txt:

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
Always remember to have two terminals open. You will need to run both the front-end server and back-end server at the same time.

To run the front-end server:

#### 1. Ensure you are in the client directory.
#### 2. In one terminal, type:

```bash
npm run dev
```

To run the back-end server:

#### 1. In a separate terminal, ensure you are in the server directory and you have activated the virtual environment with:

**Mac/Linux:**

```bash
source venv/bin/activate
```

**Windows:**

```bash
./venv/Scripts/activate
```

#### 2. Run the back-end server with:

Mac/Linx:

```bash
python3 app.py
```

Windows:

```bash
python app.py
```

## Troubleshoot
- If you get npm unknown command, ensure you have nodejs installed.
- To test if you are connected to the database via the backend, test in your browser
    http://127.0.0.1:8080/test-db-connection

    You should get a response with all the collection names from mongodb. If not, add your ip address in the Network Access tab in MongoDB Atlas website, assuming you have the rights to the project.