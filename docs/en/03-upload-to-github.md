# 03. First upload to GitHub and prepare to deploy to Zeabur

![GitHub upload chapter art](../../assets/chapters/chapter-03-github.webp)
This chapter is placed before Zeabur.

**[Core of this chapter] First upload the local project to the GitHub repository, because Zeabur usually pulls code from GitHub for deployment. **

You can understand the relationship between the three as:

```text
Your computer: where you write code and test
GitHub: a cloud warehouse for storing code
Zeabur: Take code from GitHub and run it into a website
```

> 💡 **Why do this#  **
> Zeabur does not read files directly from your computer desktop. It usually connects to your GitHub repository, and then redeploys it every time you update the repository. GitHub is like a "project transfer station" here, and Zeabur is like "the person who starts and runs the projects in the transfer station."

### Step 1: Confirm you already have a GitHub account

**【Core of this step】You need a GitHub account to save the project code. **

Next are the specific execution steps:

1. Open the GitHub official website.
2. If you are already logged in, continue to the next step.
3. If you don’t have an account yet, register one.
4. Remember your GitHub username, it will be used for the warehouse address later.

> 💡 **Why do this#  **
> GitHub is a code repository platform commonly used by programmers. The warehouse can be understood as "a cloud folder dedicated to a project", which stores every important modification.

### Step 2: Create a new repository on GitHub

**【Core of this step】Create a repo specifically to store website code. **

Next are the specific execution steps:

1. Open GitHub.
2. Click `+` in the upper right corner.
3. Select `New repository`.
4. Fill in the project name in `Repository name`, for example:

```text
paid-quiz-site
```

5. `Description` can be written first:

```text
A paid quiz website built with Codex.
```

6. Visibility can select `Public` or `Private`.
7. If you don’t have a local project yet, you can check `Add a README file`.
8. If you already have a local project, it is recommended not to check README first to avoid conflicts with local files.
9. Click `Create repository`.

> 💡 **Why do this#  **
> Repo is the abbreviation of repository, which means warehouse. One repo corresponds to one project. Your website code, documentation, and deployment configuration will all be placed in this warehouse.

### Step 3: Check first not to upload the secret

**[Core of this step] Before uploading for the first time, confirm that the key, order, and background data will not be pushed to GitHub. **

Don't upload this content:

- `.env`
-`.env.payment.local`
-Paddle API key
- Paddle webhook secret
-Admin token
- Real order information
- Payment platform backend screen
-`node_modules`
-`dist`
- log file

The project root directory should have `.gitignore`. It is recommended to include at least:

```text
.env
.env.*
*.local
node_modules
dist
.logs
tmp-*
*.log
```You can ask Codex to check for you:

```text
Please check if this project is suitable for upload to GitHub.

Requirements:
1. .gitignore must exclude .env, .env.*, *.local, node_modules, dist, logs, and temporary files.
2. Scan the project to confirm that there is no Paddle API key, webhook secret, or admin token.
3. If you find a secret, please tell me the file path and suggest me to revoke or replace the corresponding key.
4. Don't delete my business code.
```

> 💡 **Why do this#  **
> GitHub is suitable for saving code, not suitable for saving keys. API keys are like backend keys. Once they enter a public repository or commit history, they should be considered exposed and need to be regenerated later.

### Step 4: Confirm that Git has been installed on this machine

**[Core of this step] Git is a tool for submitting local projects to GitHub. **

Execute in terminal:```bash
git --version
```If you see something like:

```text
git version 2.x.x
```Description has been installed.

If the system prompts that `git` cannot be found, please install Git before continuing.

> 💡 **Why do this#  **
> Git is a "version recording tool". It will record which files you have changed and can also push native code to GitHub. GitHub is a cloud platform, and Git is the tool you use to communicate with GitHub locally.

### Step 5: Initialize Git in the project root directory

**【Core of this step】If your project is not a Git warehouse yet, make it a Git warehouse first. **

Execute in the project root directory:```bash
git status
```If you see the file status, it means it is already a Git repository.

If you see something like:

```text
fatal: not a git repository
```Just execute:```bash
git init
```Then execute:```bash
git status
```

> 💡 **Why do this#  **
> `git init` is like putting a "change log" in the project folder. From this moment on, Git knows to track this project.

### Step 6: Add the file to the first commit

**【Core of this step】Save the current project status as a commit. **

implement:```bash
git add .
git commit -m "Initial paid quiz website"
```If Git prompts you to set your name and email address, follow the prompts it gives, for example:```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```Then execute it again:```bash
git commit -m "Initial paid quiz website"
```

> 💡 **Why do this#  **
> Commit can be understood as an "archive". Instead of dumping your files loosely on GitHub, you save a specific version locally and then push that version.

### Step 7: Connect to GitHub remote repository

**[Core of this step] Tell local Git: which GitHub repository this project should be pushed to. **

After GitHub builds the warehouse, it will give you an address, which usually looks like this:

```text
https://github.com/yourusername/yourwarehousename.git
```Execute in terminal:```bash
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
```If it prompts `origin already exists`, it means there is already a remote address. You can view:```bash
git remote -v
```If the address is wrong, you can change it to:```bash
git remote set-url origin https://github.com/你的用户名/你的仓库名.git
```

> 💡 **Why do this#  **
> `origin` is the nickname of the local Git for the remote warehouse. You tell Git: From now on, when I say push to origin, I mean push to this GitHub repository.

### Step 8: Push to GitHub

**【Core of this step】Upload the local commit to GitHub. **

implement:```bash
git push -u origin main
```The first time you push, GitHub may ask you to log in or authorize.

After successful push:

1. Open the GitHub repository page.
2. Refresh the web page.
3. Confirm that you can see your project file.
4. Confirm that README is displayed normally.
5. Confirm that `.env` and `.env.payment.local` do not appear in the warehouse.

> 💡 **Why do this#  **
> `git push` is "upload the local archive to the cloud warehouse". Zeabur will then read the code on GitHub instead of the folder on your computer.

### Step 9: Use three steps to update every time you make changes.

**[Core of this step] After modifying the website in the future, use the three steps of add, commit, and push to synchronize it to GitHub. **

Execute after each change:```bash
git status
git add .
git commit -m "Describe what changed"
git push
```The submission message can be more specific, for example:```bash
git commit -m "Add Paddle webhook unlock flow"
```or:```bash
git commit -m "Improve unpaid report preview"
```

> 💡 **Why do this#  **
> Zeabur typically monitors GitHub repositories for changes. After you push the new commit, Zeabur knows that the online service needs to be redeployed.

### Step 10: Upload and then enter Zeabur

**【Core of this step】Confirm that the GitHub warehouse already has code, and then go to Zeabur to select this warehouse for deployment. **

Before proceeding to the next chapter, please confirm:

1. The GitHub warehouse page can be opened.
2. README can be displayed.
3. The main code files have been uploaded.
4. `.env`, `.local` and API key are not uploaded.
5. You know the warehouse address, for example:

```text
https://github.com/yourusername/paid-quiz-site
```This warehouse will be selected in Zeabur in the next chapter.

> 💡 **Why do this#  **
> Zeabur's deployment entry is usually "Select a GitHub repo". If the repository doesn't have the code yet, Zeabur has nothing to deploy to.

### Completion criteria for this chapter

**【Core of this Chapter】You need to be able to see the complete project on GitHub and confirm that no keys are leaked. **

After completion, please confirm item by item:

1. The GitHub repository has been created.
2. The native project is already `git commit`.
3. The native project has been `git push`.
4. Project files can be seen on the GitHub page.
5. `.env` is not uploaded.
6. `.env.payment.local` is not uploaded.
7. API key, webhook secret, and admin token do not appear in the warehouse.
8. You are ready to go to Zeabur and select this repository for deployment.