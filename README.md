# socialmomern
Local Verion of Social Mo App created by Mohsin Rehman which is deployed on
https://socialmo.herokuapp.com/

To run it you will need a MongoDB account and VScode

Copy the github repository link of the project by pressing code and copying the link
Open VS-Code
Select clone git repository
paste link into the search bar
Select folder location
open project
open terminal by navigating to the top of your screen and selecting terminal, then selecting new terminal
Then navigate back to terminal at the op of your screen and select split terminal
In the first terminal write "cd client"
Then write "npm install"
In the second terminal write "cd server"
Then write "npm install"
Go back to the first terminal and write "npm start"
and repeat the same for the second
after you created your MongoDB account and database
you will select your database and click on the connect option
then select the option "Connect Your application"
Set the driver to node.js and version to the specfications shown in the image below
<img width="572" alt="image" src="https://user-images.githubusercontent.com/58042011/212520508-d357923f-cb7c-4012-8195-11ff02901015.png">
there is a link you want to copy that will be shown in the section in the img below (Mine has been removed for security purposes)
<img width="606" alt="image" src="https://user-images.githubusercontent.com/58042011/212520571-b898326c-ab2c-486b-8035-6651a6828197.png">
copy this link and then go to the .env file in your server folder
in the .env file located in the server folder you will now want to paste that link into the empty string next to MONGO_URL ='enter string here'
if you havent already replace the <username>:<Password> sections to actually be you username and password (ensure there are no <> remaining) in the MONGO_URL
after this is complete your app should be working
