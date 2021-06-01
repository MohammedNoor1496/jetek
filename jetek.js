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
const { sendVeriSms } = require("./services/sms");

// stablish the connection with the dataBase
connectDB();

const Order = require("./models/Order");
const Session = require("./models/sessions");

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

io.of("/captins").on("connection", async (socket) => {
  console.log("new captin connected ");
});

io.of("/users").on("connection", async (socket) => {
  console.log(socket.handshake.query["userId"]);

  const userPhone = socket.handshake.query["userId"];

  try {
    const session = await new Session({
      userPohne: userPhone,
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
      })
        .save()
        .then(() => {
          console.log("Order created ");
          io.of("/captins").emit("newRequsetDriver", {
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
          io.to(socket.id).emit("searchingfordriver", {
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

  socket.on("disconnect", function (socket) {
    console.log(socket.id);
  });
  console.log("users name space connection ");
  console.log(socket.id);
  socket.on("newClient", (data) => {
    console.log(data.userPhone);
    // console.log(socket.id);

    // start Session
  });
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

// Set security HTTP headers
app.use(helmet());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public/uploads/",express.static(__dirname + '/public/uploads/'));
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

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

server.listen(process.env.PORT || 4000, () =>
  console.log(`server is running ${process.env.PORT} `)
);
