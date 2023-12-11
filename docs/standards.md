# Coding standards

* As far as possible, code committed to this repository should adhere to Airbnb's [JavaScript style guide](https://github.com/airbnb/javascript), as recommended by the [official React documentation](https://legacy.reactjs.org/docs/how-to-contribute.html#style-guide).
* Additional guideline: minimize the use of comments, code segments should be self-explanatory.

## Git commits

* Commits messages should follow the [Conventional Commits](https://www.conventionalcommits.org/en/) format.
    * i.e., commits would follow the format
    ```
    <type>[optional scope]: <description>

    [optional body]

    [optional footer(s)]
    ```
* `<type>` must be one of the following (based on the [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type)):
    * **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
    * **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).
    * **docs**: Documentation only changes.
    * **feat**: A new feature.
    * **fix**: A bug fix.
    * **perf**: A code change that improves performance.
    * **refactor**: A code change that neither fixes a bug nor adds a feature.
    * **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
    * **test**: Adding missing tests or correcting existing tests.
