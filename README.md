# About WSB-CW8-Group-Project
> Application used for real-time ZTM bus tracking, created during cooperative programming class. Each bus is shown it's current location and movement direction. Inactive buses waiting to start the course are shown in their respective stations.

### You can clone this project to your device by typing in the line below into the terminal:

```bash
git clone https://github.com/WSB-CW8/Co-Development-Task.git
```


## To build and run the application, you'll need:
* [InteliJ Idea](https://www.jetbrains.com/idea/) - chosen due to familiarity
    * Java SDK (recommended version 17) - [installable via InteliJ Idea](https://www.jetbrains.com/help/idea/sdk.html#change-project-sdk)
* [Docker / Docker Desktop](https://www.docker.com/) - chosen due to ease of application environment setup
    * Docker Compose

## Before building
### Load the InteliJ Idea project from this repository
1. In InteliJ Idea go to <b>File</b> >> <b>New</b> >> <b>Project from Version Control...</b>
2. Make sure <b>Git</b> is selected in <b>Version Control</b> combo box.
3. Paste the repository address from the line below into the <b>URL</b> entry.

    ```
    https://github.com/WSB-CW8/Co-Development-Task.git
    ```
4. Choose the folder you want to keep the project in and confirm with <b>Clone</b>.

### Set up project root
1. Once the project is loaded in, click with <u>right mouse button</u> on your <b>main project folder</b> in the <b>file explorer panel <u>on the left</u></b> and choose <b>Open Module Settings</b>.
2. Make sure you're in <b>Sources</b> tab, inside the <b>Modules</b> section, in <b>the navigator <u>on the left side</u> of the window</b>.
3. Remove the entry named like your main project folder from <b>the panel on the <u>right side</u> of the window</b> by clicking <b>x</b> on the entry.
4. Now that it's removed, choose <b>Add Content Root</b> and select the folder inside of the previous root folder. Either <b>api</b>, if you're focused on the backend of the application, or <b>fe</b>, if you want to take a look at it's frontend.
5. Confirm with <b>Apply</b> and <b>OK</b>.

### Install and set up Java SDK dependency
> To run the backend, you're gonna need Java SDK.
Preffered version of SDK is <b>semeru-17</b>

1. To get it done, we have to, once again, go to <b>Module Settings</b>, by <u>right-clicking</u> on our newly changed <b>root project folder</b> and choosing <b>Open Module Settings</b>.
2. Similarly to what was mentioned above, make sure you're in <b>Dependencies</b> tab, inside the <b>Modules</b> section, in <b>the navigator <u>on the left side</u> of the window</b>.
3. Then in <b>Module SDK</b> combo box choose <b>semeru-17</b> if it's available. If not, follow the steps below:
    <ol type=I>
    <li>Select <b>Download JDK...</b>.</li>
    <li>Once a new window pops up, in <b>Version</b> box select <b>17</b>, then in <b>Vendor</b> box choose <b>IBM Semeru</b>.</li>
    <li>Confirm with <b>Download</b></li>
    <li>Once that's done, the downloaded version of SDK should appear in <b>Module SDK</b> list, ready to be selected.</li>
    </ol>
4. You can now <b>Apply</b> changes and move onto the next step.
### Set up installed Java SDK for the project
1. While having <b>Module Settings</b> window still opened, make sure you're in the <b>Project</b> section.
2. From the <b>SDK</b> list, select the same SDK you've selected, during the previous step of the setup.
3. Click <b>Apply</b> to keep the changes and close the window with <b>OK</b>.
### <i>API only</i> - Link Gradle Project
1. Make sure the <b>src</b> folder is unwrapped and the <b>settings.gradle</b> file is visible
2. Click with <u>right mouse button</u> on <b>settings.gradle</b> file and select <b>Link Gradle Project</b>.
3. Once the <b>Gradle</b> panel shows up on the <u>right side</u> of the window, click on <b>api</b> entry unless it's already selected. Then from that panel, select <b>Download Sources</b> (<i>4th icon from the left</i>) and wait for dependencies to be downloaded. If you encounter errors during this step, [check the steps above](#install-and-set-up-java-sdk-dependency), involving <b>Module Settings</b>.

## Build and run
### Make sure either Docker container server or Docker Desktop app is currently running
### Build the project application into Docker container
```bash
docker compose build
```

### Run application container

```bash
docker compose up
```

# You're good to go! ;)
