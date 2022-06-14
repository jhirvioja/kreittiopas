# Apollo Server for Kreittiopas website

This Apollo Server uses GraphQL to do some basic CRUD operations for the Kreittiopas website admin panel. Database resides in Firestore. It is not optimized in the sense that it polls the backend a lot and returns all of the posts, but it works fine for my use case (50k requests is the daily free limit quota at Firestore and every next 100k requests cost peanuts, basically).

I mixed async/await, promises and callbacks as a learning experience.

Probably a basic SQL server would have been fine, as you can get the amount of documents via simple query vs. with Firestore noSQL such query is not even possible (number of documents in a collection actually goes through the whole collection). Though then you would have to host a SQL server, so the cons and pros might offset.

Also if I would do it again, I would probably do a simple Python API backend. This stuff got kinda messy with JavaScript fast.

## index.js file

Includes Apollo Server, which is meant to run in Google Cloud Functions, Node 14 runtime (16 probably works fine too). Remember to include needed package.json stuff, "apollo-server-cloud-functions" ("3.x"), "firebase-admin" and "graphql". If you pass the NODE_ENV development variable, you can poll stuff via the Apollo Server GUI, which is neat but probably not wise for production to expose it.

## local_dev_index.js file

Includes Apollo Server, which is meant to run locally in your computer. Node 16 should work. You should put your Google project auth credentials as a json file to the same folder where you are running the file, and then modify the path in the constant serviceAccount.

## Usage

For Google Cloud Functions: just add the index.js and package.json. Entry point is "handler". As all of the products (Cloud Run for frontend, database is Firestore) are inside the same project they should have no problem connecting. Sufficient permissions can be given outside the code in Cloud Console anyways if it does not work.

Locally: `npm install`, `npm run dev`
