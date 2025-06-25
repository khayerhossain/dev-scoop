const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const admin = require("firebase-admin");

const decoded=Buffer.from(process.env.FB_SERVICE_KEY, 'base64').toString('utf8');
const serviceAccount =JSON.parse(decoded);


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@assingmentcluster.z8xrirp.mongodb.net/?retryWrites=true&w=majority&appName=AssingmentCluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db, usersDataCollection, blogsDataCollection, subscribersCollection, wishlistCollection;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('DevScoop');
    usersDataCollection = db.collection('UsersData');
    blogsDataCollection = db.collection('BlogsData');
    subscribersCollection = db.collection('SubscribersData');
    wishlistCollection = db.collection('WishlistData');
    commentsCollection = db.collection('CommentsData');
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;
  console.log('AUTH HEADER EXISTS', !!authHeader)
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).send({ message: 'unauthorized access' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: 'unauthorized access' });
  }
};

const verifyTokenEmail=async (req, res, next)=>{
  if(req.query.email !==req.decoded.email){
    return res.status(403).send({message:'forbidden access'})
  }
  next();
}

app.get('/', (req, res) => {
  res.send('Hello World! I am Khayer Hossain');
});

app.post('/users', async (req, res) => {
  const user = req.body;
  const result = await usersDataCollection.insertOne(user);
  res.send(result);
});

app.get('/blogsdata', async (req, res) => {
  const result = await blogsDataCollection.find().limit(6).toArray();
  res.send(result);
});

app.post('/blogsdata', async (req, res) => {
  const blog = req.body;
  const result = await blogsDataCollection.insertOne(blog);
  res.send(result);
});

app.get('/allblogsdata', async (req, res) => {
  const result = await blogsDataCollection.find().toArray();
  res.send(result);
});

app.post('/subscribers', async (req, res) => {
  const subscriber = req.body;
  const result = await subscribersCollection.insertOne(subscriber);
  res.send(result);
});

app.post('/wishlist', verifyFirebaseToken, async (req, res) => {
  const {_id, ...wishlistItem} = req.body;
  wishlistItem.userEmail = req.decoded.email; 

  try {
    const result = await wishlistCollection.insertOne(wishlistItem);
    res.send(result);
  } catch (error) {
    console.error("Error inserting wishlist item:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.get('/wishlist', verifyFirebaseToken, async (req, res) => {
  const userEmail = req.decoded.email;
  const result = await wishlistCollection.find({ userEmail }).toArray();
  res.send(result);
});

app.delete('/wishlist/:id', verifyFirebaseToken, async (req, res) => {
  const id = req.params.id;
  console.log('ID', id)
  const userEmail = req.decoded.email;
  console.log('USER EMAIL', userEmail)

  const item = await wishlistCollection.findOne({ _id: new ObjectId(id) });

  if (!item) return res.status(404).send({ message: 'Item not found' });

  // Check if the item belongs to the logged-in user
  if (item.userEmail !== userEmail) {
    return res.status(403).send({ message: 'Forbidden: Not your item' });
  }

  const result = await wishlistCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
});

// GET single blog by id
app.get('/blog/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const blog = await blogsDataCollection.findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    res.send(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});


// PUT /blogsdata/:id — update a blog
app.put('/blogsdata/:id', verifyFirebaseToken, async (req, res) => {
  const id = req.params.id;
  const updatedBlog = req.body;

  try {
    // Find and update the blog by _id
    const result = await blogsDataCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedBlog }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Blog not found" });
    }

    res.send(result); // send the update result (modifiedCount etc)
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// comments save to database
app.post('/comments', async (req, res) => {
  const { blogId, text, createdAt } = req.body;
  const result = await commentsCollection.insertOne({ blogId, text, createdAt });
  res.send({ _id: result.insertedId, blogId, text, createdAt });
});
// comments save to database
app.post('/comments', async (req, res) => {
  try {
    const { blogId, text, createdAt, userEmail, userPhotoURL } = req.body;

    // Simple validation (optional)
    if (!blogId || !text || !userEmail) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const commentDoc = { blogId, text, createdAt, userEmail, userPhotoURL };
    const result = await commentsCollection.insertOne(commentDoc);

    // Send back saved comment with its new _id
    res.send({ _id: result.insertedId, ...commentDoc });
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// comments get from database
app.get('/comments/:blogId', async (req, res) => {
  try {
    const blogId = req.params.blogId;

    // Find all comments for this blogId, including userEmail and userPhotoURL
    const comments = await commentsCollection.find({ blogId }).toArray();

    res.send(comments);
  } catch (error) {
    console.error("Error getting comments:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});


connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
}).catch(err => {
  console.error("Failed to start server:", err);
});
