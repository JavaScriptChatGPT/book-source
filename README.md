# Running Each Project

In each project, there will be an explanation on how to install the project. Usually telling you to go to the root of the project and install the packages with npm like so:

```bash
npm install <package-name>
```

While this is true for new projects, this isn't necesary for any of the projects in the directory. This is because they all contain `package.json` files. running the `npm install <packages-names>` command installs the packages while also creating the `package.json`. If the `package.json` is already present, then all that's needed to do is run `npm install` and all the packages will be installed.

Usally tutorials tell their readers to run `npm install <package-name>` instead of providing the `package.json` file because installing the package name easier for already existing projects, since it will install the most recent version of the package to the project. So, even though it's not necesary since we already have the `package.json` file, I will instruct the user to install each of the packages anyway, just so that the intructions are the same if they're adding to an existing project.

# Notes

The minimum supported version of node for this project is Node 18. Although all the code was tested on Node 20.

For consistency sake, all questions were made to chatgpt-4o.
