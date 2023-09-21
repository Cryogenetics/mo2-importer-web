## mo2-importer

This is a simple tool to import mods into Mod Organizer 2.

I created this with the intention of providing a service to whoever needs something like this, as this allows quick and simple sharing of
mods just by exporting the mod list as a CSV (needs to contain the mod name and URL)

# Warnings 
1. I am not responsible for any damages through the use of this tool.
2. this program opens tabs in order to start downloads, meaning, a bunch of tabs can and will be opened (hopefully in the background as mo2 should handle the downloads)

# Live Version
can be found here https://importer.ghostin.me/

# Instuctions
1. Get your exported CSV (needs to contain Name and URL)
2. Go to [Nexus](https://nexusmods.com) and sign in to whatever account is logged in on Mod Organizer 2
   1. This is important, as MO2 requires the account that fetches the links to be the same as the one that is logged in.
   2. This follows your account settings on whether adult content can be downloaded or not, so set that if needed.
3. Open Dev Tools and go to Application
   1. Go to Cookies under Storage
   2. copy the value of sid_develop
![image](https://github.com/Cryogenetics/mo2-importer-web/assets/83240673/008b6ada-a873-4bad-8ecc-0ec00ebe78fb)
4. Paste this token into the tool.
   1. This token is passed into [this function] (https://github.com/Cryogenetics/mo2-importer-web/blob/main/functions/bypassCors/%5B%5Burl%5D%5D.js) if you'd like to see it's usage.
5. Upload your CSV
6. Scroll through the mods and select which versions and ones you want
   1. WARNING: I would recommend selecting 1 first, so you can get the popup that asks if you'll allow it to open downloads in MO2.
      Otherwise, it may spam open tabs.
7. Click the "Start downloading" button to start downloads for the selected mods. 

# TODO:

- [x] Make decent UI
- [ ] fix upload button to not look dumb
- [x] Create a way for users to supply token to download adult mods and skip 5-second timer on the download (ended up being
  forced for downloads to even work)
- [ ] Program qol logic
    - [ ] Automatically check file if there is only 1 cat (excluding old files) and only 1 file
    - [ ] Add button to prompt user to allow page to open all nxm:// links in mo2 before clicking start
- [ ] rewrite a lot of the dom parsing into CF functions (switched to cf pages last minute)
