![](https://img.shields.io/badge/Foundry-v12-informational)
![Latest Release Download Count](https://img.shields.io/github/downloads/xyzzy-co/rphaven-gst/latest/module.zip)
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Frphaven-gst&colorB=4aa94a)

# FoundryVTT Module

Allows GMs to ensure players have spent RPHaven Game Session tokens before starting sessions.  This is only useful for [RPHaven](https://rphaven.co.uk) games.

TODO: Hook up to the real API


# How to install

1. Grab the module.json url from the release's details page.

![image](https://user-images.githubusercontent.com/7644614/93409960-10c63800-f866-11ea-83f6-270cc5d10b71.png)

This `module.json` will only ever point at this release's `module.zip`, making it useful for sharing a specific version for compatibility purposes.

2. You can use the url `https://github.com/xyzzy-co/rphaven-gst/releases/latest/download/module.json` to refer to the manifest.

This is the url you want to use to install the module typically, as it will get updated automatically.

# TODO: How to List Your Releases on Package Admin

To request a package listing for your first release, go to the [Package Submission Form](https://foundryvtt.com/packages/submit) (accessible via a link at the bottom of the "[Systems and Modules](https://foundryvtt.com/packages/)" page on the Foundry website).

Fill in the form. "Package Name" must match the name in the module manifest.  Package Title will be the display name for the package.  Package URL should be your repo URL.
![image](https://user-images.githubusercontent.com/36359784/120664263-b49e5500-c482-11eb-9126-af7006389903.png)


One of the Foundry staff will typically get back to you with an approval or any further questions within a few days, and give you access to the package admin pages.

Once you have access to the [module admin page](https://foundryvtt.com/admin/packages/package/), you can release a new version by going into the page for your module, scrolling to the bottom, and filling in a new Package Version.

When listing a new version, Version should be the version number you set above, and the Manifest URL should be the manifest __for that specific version__ (do not use /latest/ here).
![image](https://user-images.githubusercontent.com/36359784/120664346-c4b63480-c482-11eb-9d8b-731b50d70939.png)

> ### :warning: Important :warning:
> 
> It is very important that you use the specific release manifest url, and not the `/latest` url here. For more details about why this is important and how Foundry Installs/Updates packages, read [this wiki article](https://foundryvtt.wiki/en/development/guides/releases-and-history).

Clicking "Save" in the bottom right will save the new version, which means that anyone installing your module from within Foundry will get that version, and a post will be generated in the #release-announcements channel on the official Foundry VTT Discord.

## Manifest details
In case the auto action thing doesn't work (it seems to), this is what the manifest should have in it.

```
  "url": "https://github.com/xyzzy-co/rphaven-gst/",
  "manifest": "https://github.com/xyzzy-co/rphaven-gst/releases/latest/download/module.json",
  "download": "https://github.com/xyzzy-co/rphaven-gst/releases/download/0.0.1/module.zip",
```
