// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const language = require("@google-cloud/language");
const client = new language.LanguageServiceClient();
const express = require("express");
const app = express();
const db = admin.firestore();
const cors = require("cors")();

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const authenticate = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    res.status(403).send("Unauthorized");
    return;
  }
  const idToken = req.headers.authorization.split("Bearer ")[1];
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (e) {
    res.status(403).send("Unauthorized");
    return;
  }
};

app.use(cors);
app.use(authenticate);

app.get("/note/:noteId", async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const userId = req.user.user_id;
    const snapshot = await db
      .collection("notes")
      .doc(noteId)
      .get();
    if (!snapshot.data()) {
      return res.status(404).json({
        errorCode: 404,
        errorMessage: `note '${noteId}' not found`
      });
    }
    if (snapshot.data().owner !== userId) {
      return res.status(403).json({
        errorCode: 403,
        errorMessage: `Access denied`
      });
    }
    return res
      .set("Cache-Control", "private, max-age=300")
      .status(200)
      .json(snapshot.data());
  } catch (error) {
    return res.sendStatus(500);
  }
});

// returns every note of user
app.get("/notes", async (req, res) => {
  try {
    const userId = req.user.user_id;
    db.collection("notes")
      .where("owner", "==", userId)
      .get()
      .then(function(querySnapshot) {
        const notesOfUser = [];
        querySnapshot.forEach(function(doc) {
          // notesOfUser.push(doc.id);
          notesOfUser.push({ ...doc.data(), id: doc.id });
        });
        return res.status(200).json(notesOfUser);
      })
      .catch(function(error) {
        return res.sendStatus(500);
      });
  } catch (error) {
    return res.sendStatus(500);
  }
});

// create note
app.post("/note", authenticate, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const body = JSON.parse(req.body);
    const { type, title, body, color, deadline, tags, priority } = req.body;
    // "type":"string"|"int",
    // "title":"string",
    // "body": "string",
    // "color":"string",
    // "deadline":"date",
    // "tags":["string"],
    // "priority": "int"
    // return res.status(200).json(userId);
    // Add a new document with a generated id.
    const note = { type, title, body, color, deadline, tags, priority };
    // const tmp = {};
    // Object.assign(tmp, body, { owner: userId });

    db.collection("notes")
      .add(note)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        return res.sendStatus(201);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
        return res.sendStatus(500);
      });
  } catch (error) {
    return res.sendStatus(500);
  }
});

//removes note from DB
app.delete("/note/:noteId", authenticate, async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const userId = req.user.user_id;
    const snapshot = await db
      .collection("notes")
      .doc(noteId)
      .get();
    if (!snapshot.data()) {
      return res.status(404).json({
        errorCode: 404,
        errorMessage: `note '${noteId}' not found`
      });
    }
    if (snapshot.data().owner !== userId) {
      return res.status(403).json({
        errorCode: 403,
        errorMessage: `Access denied`
      });
    }
    db.collection("notes")
      .doc(noteId)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
        return res.sendStatus(200);
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
        return res.sendStatus(500);
      });
  } catch (error) {
    return res.sendStatus(500);
  }
});

////Update note by id, should update only given fields;
app.post("/note/:noteId", async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const body = JSON.parse(req.body);

    const userId = req.user.user_id;

    const snapshot = await db
      .collection("notes")
      .doc(noteId)
      .get();
    // return res.status(200).json(snapshot.data());

    if (!snapshot.data()) {
      return res.status(404).json({
        errorCode: 404,
        errorMessage: `note '${noteId}' not found`
      });
    }

    if (snapshot.data().owner !== userId) {
      return res.status(403).json({
        errorCode: 403,
        errorMessage: `Access denied`
      });
    }

    await db
      .collection("notes")
      .doc(noteId)
      .update(body)
      .then(function() {
        console.log("Document successfully updated!");
        return res.sendStatus(200);
      })
      .catch(function(error) {
        console.error("Error updating document: ", error);
        return res.sendStatus(500);
      });
  } catch (error) {
    return res.sendStatus(500);
  }
});

// Expose the API as a function
exports.api = functions.https.onRequest(app);

// Helper function to categorize a sentiment score as positive, negative, or neutral
const categorizeScore = score => {
  if (score > 0.25) {
    return "positive";
  } else if (score < -0.25) {
    return "negative";
  }
  return "neutral";
};
