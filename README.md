# Tweet Labeler

## Set up

Make sure you have node installed. You'll also need an account with Google to use Firebase.

### Create your project folder
Open up your terminal and navigate to the folder in which you want to create the project.

Clone this repository into a new folder with *git clone https://github.com/bigjmn/tweet-labeler-template.git <my-project-home>*

Open this folder with an IDE. In your IDE, open a terminal and confirm that you're in the root of your project folder.

### Create the Firebase project

Go to your Firebase console. You can do this by going to the [Firebase website](https://firebase.google.com/) and logging in with your Google account.

Click "Add project" and give your project a name and continue.

Keep Google analytics enabled and continue.

Use the dropdown to select your google account and click "Create Project." When it finishes creating your project, continue.

In the main section prompting you to add an app to your project, click the </> button to add a web app.

Give your app a name. Don't set up hosting (we'll do it in a minute.)

Ignore the 'npm install firebase' command.

Copy the firebaseConfig object in the center of the next block.

Go back to your local project folder. open the file src/firebase/config.js

Replace the firebaseConfig object with the one you just copied.

Go back to the firebase page and click Continue to console.

Refresh the page. You should see your new app under the project name.

Scroll down and click "Authentication"

Click "Get started"

In the Sign-in method section under native providers click Email/Password

Enable Email/Password with the first toggle and click Save.

Click the Users tab and the Add user button.

Enter your email and pick a password, then click add user.

Copy the User UID of your newly created user.

In your local project folder, go to .env.local and set the UID as your REACT_APP_ADMIN_ID. Also give your project a name.

**VERY IMPORTANT** - add your .env.local file to your .gitignore!

Go back to your Firebase project. In the menu on the left open Build and click Firestore Database.

Click Create database.

Keep the project in production mode and click Next.

Choose your region and click Enable.

### Firebase CLI
Go back to your local project folder. Open a terminal and install the firebase CLI globally with the command *npm install -g firebase-tools*.

If there's a permissions failure, try *sudo npm install -g firebase-tools* and enter your password.

use the command *firebase login* to connect to your firebase account.

Initialize the project locally with  *firebase init*

Select the Firestore and Hosting (not the GitHub one) options and hit enter.

Select "use and existing project" and navigate down to your project/app and hit enter.

Accept the default names for the Firestore rules and Firestore indexes files.

For your public directory, enter 'build' - this is the folder react will create automatically when you build your project.

Yes, you DO want to configure a single-page app.

Don't set up automatic builds with Github (unless you want to I guess.)

Firebase will make some configuration files for you. The most important one is
**firstore.rules**. This is how we configure who can read and write what to our database. So before we build and deploy, we actually have to look at how the app works.

## How the App works

When you set REACT_APP_ADMIN_ID as your user id, you made yourself the administrator. Everyone else who signs up will be a regular user. Anyone can sign up with an email and password. There's no email verification system. So anyone can sign up with fakeemailaddress@hotmail.com or something. The key is that you, as the administrator, are the only one who can make projects. And when you make a new project, you select the users you want out of the pool of all the users who have signed up. When you add data, the data is divided into batches which are then automatically distributed to the users in your current project (you can only have one "active" project at a time.) So someone could make fake accounts, but if they're not part of the project, all they'll ever see when they log in is a screen saying they have no batches to load.

When a user is part of a project, they can read (but not write) the batches they've been assigned, and write (but not read) to the "outbatches" collection. You as the admin need to be able to read and write to everything. Which brings us to

## Finishing the set up
In the firestore.rules file, replace "replace-with-admin-id" with your admin id (same one that's in your env.local file). Make sure you add firestore.rules to your gitignore.  

Install all the dependencies with *npm install*

Deploy the project with *firebase run deploy*
