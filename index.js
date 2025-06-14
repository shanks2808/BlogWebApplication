import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Exploring the Future of Web Development",
    description: "Web development continues to evolve rapidly, with new technologies and trends shaping the future of the industry.",
    content:
      "Web development continues to evolve rapidly, with new technologies and trends shaping the future of the industry. From the rise of Jamstack architectures to the increasing popularity of serverless computing, developers have more tools than ever to build fast, secure, and scalable web applications. The focus is shifting towards improving user experiences and optimizing performance, ensuring that modern web apps meet the needs of an ever-growing audience.\n\n" +
      "In addition to technological advancements, there is a growing emphasis on accessibility and inclusive design. Developers are recognizing the importance of creating web applications that are usable by everyone, regardless of ability. Tools like Lighthouse and frameworks like React and Vue.js are making it easier for developers to build applications that are both powerful and accessible. The adoption of Progressive Web Apps (PWAs) also ensures a seamless user experience across all devices.\n\n" +
      "Looking ahead, web development will likely see increased integration of artificial intelligence and machine learning. Personalized user experiences, intelligent content recommendations, and advanced automation will become standard features of web applications. The future holds endless possibilities, and developers who stay adaptable and open to learning will continue to thrive in this dynamic industry.",
    author: "Sophia Carter",
    date: "Jul 18, 2023",
  },
  {
    id: 2,
    title: "The Power of Mindfulness in Everyday Life",
    description: "Mindfulness is a simple yet powerful practice that can transform the way we live, work, and interact with others.",
    content:
      "Mindfulness is a simple yet powerful practice that can transform the way we live, work, and interact with others. By paying attention to the present moment without judgment, we can cultivate greater self-awareness, reduce stress, and improve our overall well-being. Mindfulness practices like meditation, mindful breathing, and mindful eating help us stay grounded and focused in our daily lives.\n\n" +
      "Incorporating mindfulness into everyday routines doesn't require drastic changes. Small practices, such as taking a few deep breaths before a meeting or being fully present during conversations, can have a significant impact. These moments of mindfulness help break the cycle of automatic reactions and create space for thoughtful responses. Over time, these practices can lead to a calmer, more balanced life.\n\n" +
      "Moreover, mindfulness enhances our relationships by fostering empathy and compassion. By truly listening and being present with others, we build deeper connections and improve communication. In a fast-paced world where distractions are constant, mindfulness serves as a reminder to slow down and appreciate the present. Its benefits extend beyond the individual, creating more harmonious and understanding communities.",
    author: "Liam Rodriguez",
    date: "Sep 12, 2023",
  },
  {
    id: 3,
    title: "Understanding the Basics of Cloud Computing",
    description: "Cloud computing has revolutionized the way businesses operate, offering scalable, flexible, and cost-effective solutions.",
    content:
      "Cloud computing has revolutionized the way businesses operate, offering scalable, flexible, and cost-effective solutions. It allows organizations to store and access data and applications over the internet instead of relying on local servers or personal devices. This shift has significantly reduced infrastructure costs and increased efficiency, enabling businesses to innovate faster and respond to market demands more effectively.\n\n" +
      "There are three primary models of cloud computing: Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Each model provides different levels of control, flexibility, and management, catering to various business needs. Major providers like Amazon Web Services (AWS), Microsoft Azure, and Google Cloud offer robust cloud solutions, empowering businesses of all sizes to leverage the power of the cloud.\n\n" +
      "Security remains a top priority in cloud computing. Providers invest heavily in advanced security measures, including encryption, access controls, and threat detection, to ensure data protection. As businesses continue to migrate to the cloud, understanding its fundamentals, benefits, and best practices is essential for staying competitive in the digital era. The future of cloud computing promises even greater innovation, with emerging technologies like edge computing and hybrid cloud solutions shaping the landscape.",
    author: "Emma Johnson",
    date: "Oct 25, 2023",
  },
];


let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get('/posts', (req, res) => {
  res.json(posts)
});

//CHALLENGE 2: GET a specific post by id
app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const specificPost = posts.find((post) => post.id === id);
  if(!posts) return res.status(404).json({message: "Post not found"});
  res.json(specificPost);
});

//CHALLENGE 3: POST a new post
app.post('/posts', (req, res) => {
  const id = posts.length + 1;
  const date = new Date();
  const newPost = {
    id: id,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    author: req.body.author,
    date: date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})
  }
 
  posts.push(newPost);
  lastId = posts.length;
  console.log(lastId);
  res.json(posts);
});
//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = posts.findIndex((post) => post.id === id);
  const existingPost = posts[searchIndex];
  if(!existingPost) return res.status(404).json({message: 'Post not found'})

  const updatedPost = {
    id: id,
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    author: req.body.author,
    date: existingPost.date
  }

  posts[searchIndex] = updatedPost;
  res.json(posts);
});

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = posts.findIndex((post) => post.id === id);
  if(searchIndex === -1) return res.status(404).json({message: 'Post not found'})

  posts.splice(searchIndex, 1);
  res.json(posts);
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
