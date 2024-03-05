
Here's a demo as a web app but it's not responsive (yet) so it wont work on phones
https://65d82688cf87969a7ce21213--enchanting-crumble-827d5c.netlify.app/

Electron app that uses react/typescript/flowbite/tailwind to merge and split multiple pdfs.

The way it works is that you can add pdfs to the app and they show up in the sidebar as buttons with modals, when you click on the pdf button it displays a modal with its pages and you can select specific pages to add to the new pdf you want to create.

The pdf pages in the app are all displayed as images but when the new pdf is created from the selected pages, it uses the original pdf files and the indexes to create the pdf. 


Learned a lot about passing around and managing state in react while working on this. There're probably way better ways to do what I did here but I learned a lot at least. In the future I might add more features because right now this app isn't very useful except for niche cases

To do:
1. improve the design/ui
2. add more features
3. make it responsive so i can have both a website and a desktop app
4. refactor the code to make it easier to add more features 
