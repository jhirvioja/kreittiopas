// Imports

const { ApolloServer, gql } = require('apollo-server')
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Here you should refer to your locally saved Google Cloud Project credentials (.json)
// Not obviously gitted

const serviceAccount = require('./credentials.json');

// This initializes the Firebase app and passes credentials to it

initializeApp({
  credential: cert(serviceAccount)
});

// Connection to Firestore

const db = getFirestore();
const docRef = db.collection('posts');

// Couple of async functions to control crud operations

async function addData(data) {
  await docRef.doc(data.slug).set(data);
  console.log("Postauksen lisäys onnistui!")
}

async function editData(data) {
  await docRef.doc(data.slug).set(data);
  console.log("Postauksen mutatointi onnistui!")
}

async function deleteData(data) {
  await docRef.doc(data.slug).delete();
  console.log("Postauksen poistaminen onnistui!")
}

// Couple of functions with callbacks to fetch data from Firestore

const fetchAllDocuments = (callback) => {
  docRef
    .get()
    .then((post) => {
         const posts = [];
         post.docs.forEach(post => {
             posts.push(post.data())
         });
    return callback(posts);
  })
  .catch(e => console.log(e));
}

const fetchAllDocumentsAndOrderBy = (callback) => {
  docRef
    .orderBy('date', 'desc')
    .get()
    .then((post) => {
         const posts = [];
         post.docs.forEach(post => {
             posts.push(post.data())
         });
    return callback(posts);
  })
  .catch(e => console.log(e));
}

const fetchVisibleDocumentsAndOrderBy = (callback) => {
  docRef
    .orderBy('date', 'desc')
    .where('visibility', '==', 'true')
    .get()
    .then((post) => {
         const posts = [];
         post.docs.forEach(post => {
             posts.push(post.data())
         });
    return callback(posts);
  })
  .catch(e => console.log(e));
}

// Couple of helper functions to slice posts according to arguments given by the frontend feed

function visiblePostSlicer(args, posts) {
  const postsSliced = posts.slice(args.offset, args.limit);
  return postsSliced
}

function postSlicer(args, posts) {
  const postsSliced = posts.slice(args.offset, args.limit);
  return postsSliced
}

// This is all GraphQL stuff

const typeDefs = gql`
  type Post {
    id: ID!
    author_id: Int!
    imgsrc: String!
    date: String!
    title: String!
    slug: String!
    desc: String!
    content: String!
    type: String!
    genres: [String!]!
    artist: String!
    likes: Int!
    visibility: String
    dateDeleted: String
  }

  enum YesNo {
    YES
    NO
  }

  type Query {
    posts: [Post]
    postCount: Int!
    visiblePostCount: Int!
    getAllPosts(limit: Int, offset: Int): [Post]
    findPost(slug: String!): Post
    getVisiblePosts(visibility: YesNo, limit: Int, offset: Int): [Post!]!
  }

  type Mutation {
    editPost(
      slug: String!
      title: String!
      desc: String!
      content: String!
      type: String!
    ): Post
    removeVisibility(
      slug: String!
    ): Post
    addVisibility(
      slug: String!
    ): Post
    removePost(
      slug: String!
    ): Post
    addPost(
      id: Int
      author_id: Int
      imgsrc: String!
      date: String
      title: String!
      slug: String!
      desc: String!
      content: String!
      type: String!
      genres: [String]
      artist: String
      likes: Int
      visibility: String
    ): Post
  }
`

const resolvers = {
  Query: {
    posts: () => {
      return new Promise ((resolve) => {
        fetchAllDocumentsAndOrderBy((posts) => {
          resolve(posts);
      });
    })
    },
    postCount: () => {
      return new Promise ((resolve) => {
        fetchAllDocumentsAndOrderBy((posts) => {
          resolve(posts.length);
      });
    })
    },
    visiblePostCount: () => {
      return new Promise ((resolve) => {
        fetchVisibleDocumentsAndOrderBy((posts) => {
          resolve(posts.filter(post => post.visibility === "true").length);
      });
    })
    },
    getAllPosts: (root, args) => {
      return new Promise ((resolve) => {
        fetchAllDocumentsAndOrderBy((posts) => {
          resolve(postSlicer(args, posts));
        });
      })
    },
    findPost: (root, args) => {
      return new Promise ((resolve) => {
        fetchAllDocuments((posts) => {
          resolve(posts.find(p => p.slug === args.slug));
      });
    })
    },
    getVisiblePosts: (root, args) => {
      return new Promise ((resolve) => {
        fetchVisibleDocumentsAndOrderBy((posts) => {
          resolve(visiblePostSlicer(args, posts));
        });
      })
    }
  },
  Mutation: {
    editPost: (root, args) => {
      return new Promise ((resolve) => {
        fetchAllDocuments((posts) => {
          const post = posts.find(p => p.slug === args.slug);
          if (!post) {
            return null
          }
          const updatedPost = { ...post, slug: args.slug, title: args.title, desc: args.desc, content: args.content, type: args.type }
          resolve(editData(updatedPost));
        });
      })
    },
    removeVisibility: (root, args) => {
      return new Promise ((resolve) => {
        fetchAllDocuments((posts) => {
        const post = posts.find(p => p.slug === args.slug)
        if (!post) {
          return null
        }
        const visibilityUpdatedPost = { ...post, visibility: null }
        resolve(editData(visibilityUpdatedPost));
        });
      })
    },
    addVisibility: (root, args) => {
      return new Promise ((resolve) => {
        fetchAllDocuments((posts) => {
        const post = posts.find(p => p.slug === args.slug)
        if (!post) {
          return null
        }
        const visibilityUpdatedPost = { ...post, visibility: "true" }
        resolve(editData(visibilityUpdatedPost));
        });
      })
    },
    removePost: (root, args) => {
      return new Promise ((resolve) => {
        fetchAllDocuments((posts) => {
        const post = posts.find(p => p.slug === args.slug)
        if (!post) {
          return null
        }
        resolve(deleteData(post));
        });
      })
    },
    addPost: (root, args) => {
      return new Promise ((resolve) => {
        fetchAllDocuments((posts) => {
          const date = new Date();
          const dateCreated = date.toISOString();
          const post = {
            id: Math.max(...posts.map(p => p.id)) + 1,
            author_id: 1,
            imgsrc: args.imgsrc,
            date: dateCreated,
            title: args.title,
            slug: args.slug,
            desc: args.desc,
            content: args.content,
            type: args.type,
            genres: ["notavailable"],
            artist: "notavailable",
            likes: 0,
            visibility: "true"
          }
          resolve(addData(post));
        })
      })
    }
  }
}

// Lastly we start the server locally

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})