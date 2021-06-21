const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
var io = require("./socket").init(server);

var compression = require("compression");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
var bodyParser = require("body-parser");
var hpp = require("hpp");
require("dotenv").config();
const morgan = require("morgan");
var jwt = require("jsonwebtoken");
const connectDB = require("./models/index");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const captinRoutes = require("./routes/captinRoutes");
const adminRoutes = require("./routes/adminRoutes");
const subAdminRoutes = require("./routes/cpadminRoutes");

// stablish the connection with the dataBase
connectDB();

const Order = require("./models/Order");
const Session = require("./models/sessions");
const Message = require("./models/Messages");

// REAL TIME PART
io.on("connection", (socket) => {
  // console.log(socket.handshake.query['userId']);
  console.log("connection ");
  console.log(socket.id);
  console.log("//////////////////////");
  socket.on("send_message", (msg) => {
    console.log("message: " + msg);
    userSocket.broadcast.emit("receive_message", data);
  });
});



var captins = io.of("/captins");

captins.on("connection", async (socket) => {
  console.log("new captin connected ");
  console.log(socket.handshake.query["captinPhone"]);
  const userPhone = socket.handshake.query["captinPhone"];
  try {
    const session = await new Session({
      captinPhone: userPhone,
      userSocketIo: socket.id,
    })
      .save()
      .then(() => {
        console.log("Session created ");
      });
  } catch (error) {
    console.log(error);
    return;
  }
  socket.on("arrivetopointofsell", async function (data) {
    console.log(data);


  })
  socket.on("disconnect", async function () {
    console.log("captin sockect id on disconnection" + socket.id);
    const deleteSession = await Session.deleteOne({ userSocketIo: socket.id })
      .then(() => {
        console.log("session terminated");
      })
      .catch((err) => {
        console.log("err" + err);
      });
  });
});

io.of("/users").on("connection", async (socket) => {
  console.log(socket.handshake.query["userId"]);

  const userPhone = socket.handshake.query["userId"];

  try {
    const session = await new Session({
      userPhone: userPhone,
      userSocketIo: socket.id,
    })
      .save()
      .then(() => {
        console.log("Session created ");
      });
  } catch (error) {
    console.log(error);
    return;
  }

  socket.on("newOrder", async function (data) {
    console.log("new order event ");
    console.log(data);
    try {
      const order = await new Order({
        user_Phone: data.user_Phone,
        sell_point_id: data.sell_point_id,
        products_id: data.products_id,
        destination_long: data.destination_long,
        destination_lat: data.destination_lat,
        origin_long: data.origin_long,
        origin_lat: data.origin_lat,
        fee: data.fee,
        payment: data.payment,
        paid: data.paid,
        distance: data.distance,
      })
        .save()
        .then((result) => {
          console.log("Order created ");
          captins.emit("newrequsetdriver", {
            order_id: result._id,
            user_Phone: data.user_Phone,
            sell_point_id: data.sell_point_id,
            products_id: data.products_id,
            destination_long: data.destination_long,
            destination_lat: data.destination_lat,
            origin_long: data.origin_long,
            origin_lat: data.origin_lat,
            fee: data.fee,
            payment: data.payment,
            paid: data.paid,
            distance: data.distance,
          });
          io.of("/users").to(socket.id).emit("searchingfordriver", {
            order_id: result._id,
            user_Phone: data.userPhone,
            sell_point_id: data.sell_point_id,
            products_id: data.products_id,
            destination_long: data.destination_long,
            destination_lat: data.destination_lat,
            origin_long: data.origin_long,
            origin_lat: data.origin_lat,
            fee: data.fee,
            payment: data.payment,
            paid: data.paid,
            distance: data.distance,
          });
        });
    } catch (error) {
      console.log(error);
      return;
    }
  });

  socket.on("messagetocaptin", async function (data) {
    console.log("message to captin event");
    console.log(data);
    try {
      const message = await new Message({
        senderPhone: data.userphone,
        receiverPhone: data.captinphone,
        content: data.content,
        type: data.type,
        orderId:data.orderId
      }).save()
        .then(async(result) => {
          if (data.type == 1) {
            theToFind = 'captinPhone'
          } else if (data.type == 2) {
            theToFind = 'userPhone'
          } else {
            console.log("the typ is not 1 or 2 ");
          }

          const sessiondata = await Session.find({ theToFind: data.captinphone }).sort({ 'createdAt': -1 }).limit(1);
          if (sessiondata !== null) {
            const socket_id = sessiondata.userSocketIo;
            console.log("session data" + sessiondata);
            console.log("from captin io");
            // console.log(user_socket_id);
            // console.log(socket_id );
            console.log("message captin socket id " + socket_id);

            io.of("/captin").to(socket_id).emit("messagefromuser", {
              userPhone:data.userphone,
              orderId:data.orderId,
              content:data.content
            });
          }
        });
    } catch (error) {
      console.log(error);
      return;
    }

  })


  socket.on("disconnect", async function () {
    console.log("user sockect id on disconnection" + socket.id);
    const deleteSession = await Session.deleteOne({ userSocketIo: socket.id })
      .then(() => {
        console.log("session terminated");
      })
      .catch((err) => {
        console.log("err" + err);
      });
  });
  console.log("users name space connection ");
  console.log(socket.id);

});
// END OF REAL TIME PART

//APPLICATION MIDDLEWARES

// https://www.npmjs.com/package/compression

// For a high-traffic website in production, the best way to put compression in place is to implement it at a reverse proxy level (see Use a reverse proxy). In that case, you do not need to use compression middleware. For details on enabling gzip compression in Nginx, see Module ngx_http_gzip_module in the Nginx documentation.
app.use(compression());

// Allow Cross-Origin requests
// var corsOptions = {
//     origin: "http://localhost:3000"
// };
app.use(cors());

// Limit request from the same API
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: "Too Many Request from this IP, please try again in an hour",
});
app.use("/api", limiter);
app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  );
  next();
});
// Set security HTTP headers
app.use(helmet());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public/uploads/", express.static(__dirname + "/public/uploads/"));
// Prevent parameter pollution
app.use(hpp());

// HTTP request logger middleware for node.js
app.use(morgan("tiny"));

app.use(express.static(__dirname + "/build"));

// END OF APPLICATION MIDDLEWARES
// User routes
app.use("/user", userRoutes);
// Captin Routes
app.use("/captin", captinRoutes);
// Admin Routes
app.use("/admin", adminRoutes);
// Sub Admin Routes
app.use("/cpAdmin", subAdminRoutes);

// app.use("/test", async (req, res) => {
//   const socketID = await Order.find({ 'user_Phone': req.body.uf }).sort({ 'createdAt': -1 }).limit(1)
//   console.log(socketID);
// })


app.get("/*", function (req, res) {

  res.sendFile(path.join(__dirname + "/build/index.html"));
});

server.listen(process.env.PORT || 4000, () =>
  console.log(`server is running ${process.env.PORT} `)
);
