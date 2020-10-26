# [E-Mage (Electron + Image Compression + Magic)](https://emage.js.org/)

A cross-platform tool for losslessly image compression

> See the official [E-Mage website](https://emage.js.org/) for an introduction to E-Mage.

## How to compile and build

To compile and build, you require:

1. Node.js (version 12.19 tested and okay)
2. Either of the following:
    - Visual Studio 2015
    - Visual Studio 2017
    - Visual Studio 2019 (tested)
    - Microsoft Build Tools (compatible with said versions of Visual Studio)
3. Yarn 1.x (version 1.22.5 tested and okay)
4. Git (version 2.29.1 tested and okay)

Once the requirements are fulfilled:

1. Ensure that Git, Node.js and NPM can connect to the Internet. You may have to adjust your firewall.
2. Clone this repo, or download and extract it somewhere
3. Open a CLI shell and navigate to your repo folder (PowerShell 7.1 with `oh-my-posh` tested and okay)
4. Invoke yarn and ensure its error-free completion:

    `yarn`

5. Invoke the build script and ensure its error-free completion:

    `yarn build`

## Test the build

To test the build, issue the following command:

`yarn start`

You'll be returned to the prompt but the E-Mage window will appear.

## Start the build in debug mode

To start the build in debug mode:

1. Open two CLI shell windows and in both, navigate to the repo folder
2. In the first window, issue the following command:

    `yarn start-renderer-dev`
    This command won't return. You must terminate it when you no longer need it.

3. In the second window, issue the following command:

    `yarn start-main-dev`
    The E-Mage window should appear.

4. Feel free to close the window and repeat step 3 as needed, as long as you keep the first window intact.

Alternatively, in PowerShell 7, you can issue the following commands:

```PowerShell
Start-Process 'yarn' 'start-renderer-dev'
Start-Process 'yarn' 'start-main-dev'
```

## Contribute

New features, bug fixes and improvements are welcome! For questions and suggestions use the [issues](https://github.com/douglasjunior/emage/issues).

[<img src="http://i.imgur.com/xEO164Z.png" alt="Become a Patron!" width="200" />](https://www.patreon.com/douglasjunior)

[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=E32BUP77SVBA2)

## Licence

The MIT License (MIT)

Copyright © 2018 Douglas Nassif Roma Junior

See the full [licence file](https://github.com/douglasjunior/emage/blob/master/LICENSE).
