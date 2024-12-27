# About WSB-CW8-Group-Project
> Application used for real-time ZTM bus tracking, created during cooperative programming class. Each bus is shown its current location and movement direction.

### You can clone this project to your device by pasting in the line below into the terminal:

```bash
git clone git@github.com:WSB-CW8/Co-Development-Task.git
```


## To build and run the application, you'll need:
* [IntelliJ Idea](https://www.jetbrains.com/idea/) - chosen due to group's familiarity with the tool
    * Java SDK (recommended version 17) - [installable via IntelliJ Idea](https://www.jetbrains.com/help/idea/sdk.html#change-project-sdk)
* [Docker / Docker Desktop](https://www.docker.com/) - chosen due to ease of application environment setup
    * Docker Compose

## Before building
### Load the IntelliJ Idea project from this repository
1. In IntelliJ Idea go to **File** >> **New** >> **Project from Version Control...**
2. Make sure **Git** is selected in **Version Control** combo box.
3. Paste the repository address from the line below into the **URL** entry.

    ```
    git@github.com:WSB-CW8/Co-Development-Task.git
    ```
4. Choose the folder you want to keep the project in and confirm with **Clone**.

### Set up project root
1. Once the project is loaded in, click with <u>right mouse button</u> on your **main project folder** in the **file explorer panel <u>on the left</u>** and choose **Open Module Settings**.
2. Make sure you're in **Sources** tab, inside the **Modules** section, in **the navigator <u>on the left side</u> of the window**.
3. Remove the entry named like your main project folder from **the panel on the <u>right side</u> of the window** by clicking **x** on the entry.
4. Now that it's removed, choose **Add Content Root** and select the folder inside the previous root folder. Either **api**, if you're focused on the backend of the application, or **fe**, if you want to take a look at its frontend.
5. Confirm with **Apply** and **OK**.

### _API only_
### Install and set up Java SDK dependency
> To run the backend, you'll need Java SDK.
Preferred version of SDK is **semeru-17**

1. To get it done, we have to, once again, go to **Module Settings**, by <u>right-clicking</u> on our newly changed **root project folder** and choosing **Open Module Settings**.
2. Similarly to what was mentioned above, make sure you're in **Dependencies** tab, inside the **Modules** section, in **the navigator <u>on the left side</u> of the window**.
3. Then in **Module SDK** combo box choose **semeru-17** if it's available. If not, follow the steps below:
    1. Select <b>Download JDK...</b>
    2. Once a new window pops up, in <b>Version</b> box select <b>17</b>, then in <b>Vendor</b> box choose <b>IBM Semeru</b>.
    3. Confirm with <b>Download</b>
    4. Once that's done, the downloaded version of SDK should appear in <b>Module SDK</b> list, ready to be selected.
4. You can now **Apply** changes and move onto the next step.
### Set up installed Java SDK for the project
1. While having **Module Settings** window still opened, make sure you're in the **Project** section.
2. From the **SDK** list, select the same SDK you've selected, during the previous step of the setup.
3. Click **Apply** to keep the changes and close the window with **OK**.

### Link Gradle Project
1. Make sure the **src** folder is unwrapped and the **settings.gradle** file is visible
2. Click with <u>right mouse button</u> on **settings.gradle** file and select **Link Gradle Project**.
3. Once the **Gradle** panel shows up on the <u>right side</u> of the window, click on **api** entry unless it's already selected. Then from that panel, select **Download Sources** (<i>4th icon from the left</i>) and wait for dependencies to be downloaded. If you encounter errors during this step, [check the steps above](#install-and-set-up-java-sdk-dependency), involving **Module Settings**.

## Build and run
> Before building containers for frontend or backend, make sure either Docker container server or Docker Desktop app is currently running.

### _API:_
### Build using Docker Compose
```bash
docker compose build
```

### Run backend container using Docker Compose

```bash
docker compose up
```
### _Frontend:_
### Build using Docker
You may want to replace "localhost:8080" with your API address and port of choice, but make sure there is no slash at the end.
Container name can also be changed to your liking.
The command below assumes your work directory is **fe**.
```bash
docker build -t fe:devel --build-arg API_URL=http://localhost:8080 .
```

### Run frontend container

Replace container name with the one you used for the build in the previous step.
You can also change the port for your host machine.
```bash
docker run -p 80:80 fe:devel
```

# You're good to go! ;)
> At this point you should be able to connect to the built web application
