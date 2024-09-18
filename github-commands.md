# Common Git Commands

- `git branch`
    - Lists all local branches in your repository.

- `git checkout -b <your-branch-name>`
    - Creates a new branch and switches to it.
    - Example:
      ```bash
      git checkout -b dev
      ```

- `git status`
    - Shows the current state of your working directory and staging area. It lists which files are staged, which are not, and if there are any untracked files.

- `git add <file-name>`
    - Stages the specified file, marking it for the next commit.
    - To stage all changes in the repository:
      ```bash
      git add .
      ```

- `git commit -m "Your commit message"`
    - Records the staged changes to the repository with a descriptive commit message.

- `git push origin <branch-name>`
    - Pushes your committed changes to the remote repository (e.g., GitHub) on the specified branch.
    - Example:
      ```bash
      git push origin dev
      ```

- `git pull`
    - Fetches changes from the remote repository and merges them into the current branch.

- `git merge <branch-name>`
    - Merges the specified branch into the current branch. This is useful when combining changes from different branches.
    - Example:
      ```bash
      git merge feature-branch
      ```

- `git checkout <branch-name>`
    - Switches to the specified branch.
    - Example:
      ```bash
      git checkout main
      ```

- `git log`
    - Displays a list of recent commits, showing the commit message, author, and hash.

- `git reset --hard`
    - Resets the working directory and index to the most recent commit. All uncommitted changes will be discarded.

- `git stash`
    - Temporarily saves uncommitted changes in a stash. You can apply them later with `git stash apply`.

- `git stash apply`
    - Applies the most recent stash of changes to the working directory.

- `git rebase <branch-name>`
    - Moves or combines commits from one branch onto another, useful for maintaining a clean commit history.

- `git remote -v`
    - Lists the remote repositories configured for your local repository, including their URLs.

- `git diff`
    - Shows the changes between your working directory and the last commit. Use this to check what has been modified before committing.

- `git rm <file-name>`
    - Removes a file from the staging area and working directory.
    - Example:
      ```bash
      git rm unwanted-file.txt
      ```

- `git clone <repository-url>`
    - Clones a remote repository (e.g., from GitHub) to your local machine.

- `git push --force`
    - Force pushes changes to the remote repository, overwriting its history. **Use with caution** as it may rewrite commit history on shared branches.

### Changing the Most Recent Commit Message

To change the most recent commit message, follow these steps:

1. **Amend the last commit:**
   ```bash
   git commit --amend

This command opens your default text editor where you can edit the commit message.

2. **Save the new message in the text editor and close the editor.**

3. **Push the updated commit to the remote repository:**

    ```bash
    git push --force

***Warning: Force pushing rewrites history on the remote repository, so be careful when using it, especially if others are working on the same branch.***