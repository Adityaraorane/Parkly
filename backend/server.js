import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cors from 'cors';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const app = express();
const port = 5000;
const mongoURI = 'mongodb://localhost:27017/parkly';

app.use(cors());
app.use(express.json());

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: 'adityaraoranezoom@gmail.com', 
        pass: 'exzm lwxb wunp knuy'          
    }
});

const sendOTPEmail = async (userEmail, otp) => {
    const mailOptions = {
      from: 'adityaraoranezoom@gmail.com',
      to: userEmail,
      subject: 'Your OTP for Login',
      text: `Your OTP for login is: ${otp}`
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('OTP email sent to:', userEmail);
    } catch (error) {
      console.error('Error sending OTP email:', error);
    }
  };
  
  const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
  };

const sendSecondEmail = async (userEmail) => {
    const mailOptions = {
      from: 'adityaraoranezoom@gmail.com',
      to: userEmail,
      subject: 'Important Update from Parkly',
      text: `Hello,
  
We are excited to inform you about some new features we've added to Parkly to make your parking experience even better:

New Features:
  - You can now book parking spots more easily with our streamlined booking process.
  - Enjoy discounts on your next booking! Use the code "PARKLY10" at checkout for 10% off.
  - Pinpoint parking locations using our improved map feature, allowing you to select the most convenient spot.
  - View real-time availability updates for parking spots so you can plan ahead and avoid last-minute hassles.

Stay Secure: Beware of Increasing Scams Related to OTP and Password
  - Never share your One-Time Password (OTP) or login details with anyone. Parkly will never ask for your OTP.
  - Always use a strong password that includes a combination of letters, numbers, and special characters.
  - If you receive an OTP or password reset request that you didn’t initiate, please change your password immediately.
  - Avoid using the same password across multiple websites.
  - Be cautious of phishing emails and messages that look suspicious or ask for personal information.

We are committed to your security and want to ensure that your Parkly experience is safe and enjoyable.

For more security tips or if you suspect any fraudulent activity, please contact our support team immediately.

  Stay tuned for more updates!

Stay safe, and happy parking!

Best regards,
Parkly Support Team
  
`
    };
  
    await transporter.sendMail(mailOptions);
  };

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    surname: String,
    dob: String,
    mobile: String,
    country: String,
    state: String,
    city: String,
    address: String,
    email: String,
    password: String,
    otp: String,  
    otpExpires: Date 
});

const User = mongoose.model('User', userSchema);

const parkingSchema = new mongoose.Schema({
    mainAddress: String,
    landmark: String,
    pincode: String,
    type: String,
    availableSpots: Number,
    price: Number,
    description: String,
    availableDate: Date,
    startTime: String,
    endTime: String
});

const Parking = mongoose.model('Parking', parkingSchema);

app.post('/login', async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }
  
      const otp = generateOTP();
      user.otp = otp;
      user.otpExpires = Date.now() + 5 * 60 * 1000; 
      await user.save();
  
      await sendOTPEmail(email, otp);
      await sendSecondEmail(email);
  
      return res.status(200).json({ success: true, message: 'OTP sent to your email' });
  
    } catch (error) {
      console.error("Error during OTP generation:", error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  
  app.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }
  
      if (user.otp === otp && user.otpExpires > Date.now()) {
        return res.status(200).json({ success: true, message: 'OTP verified, login successful' });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid or expired OTP' });
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  });

app.post('/register', async (req, res) => {
    const { firstName, lastName, surname, dob, mobile, country, state, city, address, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ firstName, lastName, surname, dob, mobile, country, state, city, address, email, password: hashedPassword });
        await newUser.save();
        res.status(200).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

app.post('/list-parking', async (req, res) => {
    const { mainAddress, landmark, pincode, type, availableSpots, price, description, availableDate, startTime, endTime } = req.body;

    try {
        const newParking = new Parking({ mainAddress, landmark, pincode, type, availableSpots, price, description, availableDate, startTime, endTime });
        await newParking.save();
        res.status(200).send('Parking space listed successfully');
    } catch (error) {
        console.error("Error listing parking space:", error);
        res.status(500).send('Error listing parking space');
    }
});

app.post('/find-parking', async (req, res) => {
    const { location, pincode, date } = req.body;

    try {
        const results = await Parking.find({
            pincode,
            availableDate: date,
            availableSpots: { $gt: 0 } 
        });
        res.status(200).json(results);
    } catch (error) {
        console.error("Error finding parking spots:", error);
        res.status(500).send('Error finding parking spots');
    }
});

const bookingSchema = new mongoose.Schema({
    location: String,
    pincode: String,
    date: Date,
    time: String,
    duration: Number,
    spotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Parking' },
    price: Number,
    totalAmount: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);


app.post('/book-parking', async (req, res) => {
    const { location, pincode, date, time, duration, spotId, price, totalAmount } = req.body;
  
    const booking = new Booking({
      location,
      pincode,
      date,
      time,
      duration,
      spotId,
      price,
      totalAmount,
    });
  
    try {
      await booking.save();
      res.status(201).json({ message: 'Booking successful', booking });
    } catch (error) {
      res.status(500).json({ message: 'Error creating booking', error });
    }
  });
  
  app.get('/my-bookings', async (req, res) => {
    try {
      const bookings = await Booking.find(); 
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
