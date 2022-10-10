const UserModel = require("./../../models/v1/User.Model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../utils/jwt");

exports.signup = async (req, res, next) => {
  try {
    const user = req.body;
    const result = await UserModel.create(user);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * 1. Check if Email and password are given
 * 2. Load user with email
 * 3. if not user send res
 * 4. compare password
 * 5. if password not correct send res
 * 6. check if user is active
 * 7. if not active send res
 * 8. generate token
 * 9. remove password from user response
 * 10. send user and token
 */

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Check if Email and password are given
    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    // 2. Load user with email
    /**
     * যেহেতু UserModel এ আমরা select: false দিয়েছি password এর জন্য তাই normally এটা দেখাবে না কিন্তু আমরা এখানে token generate করার সময় দেখাতে চাই তাই আমরা এখানে select করে নিচ্ছি
     */
    const user = await UserModel.findOne({ email }).select("+password");

    // 3. if not user send res
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // 4. compare password
    const isPasswordCorrect = user.comparePassword(password, user.password);

    // 5. if password not correct send res
    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }

    // 6. check if user is active
    // 7. if not active send res
    if (user.status !== "active") {
      throw new Error("User is not active");
    }

    // 8. generate token
    const token = generateToken(user);

    // 9. remove password from user response
    /**
     * 9.1 : প্রথমে আমরা rest-operator এর সাহায্যে password বাদে user-variable এ বাকি যা আছে সে সব জিনিস rest নামক variaboe এ রাখবো।
     * 9.2 : এক্ষেত্রে পূরবে যেহেতু already password নামক variable use করা হয়েগেছে তাই password এর নামে edit করে pwd নামে রাখবো।
     * 9.3 : এবার console করলে দেখা যাবে যে rest-variable এর ভিতরে mongoose generated অনেক extra information আছে। এগুলো আমরা বাদ দিবো user.toObject() method এর মাধ্যমে।
     *  */
    const { password: pwd, ...rest } = user.toObject();
    /** alternative way to remove password from user
     * alt1: user.password = undefined;
     * alt2: delete user.password;
     * alt3: delete user["password"];
     *  */

    //  10. send user and token
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: rest,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const userInfo = req.user; // here req.user = {email:kdjflkd,password:#####,iat:12345678,exp:12345678} recieved from auth middleware verifyJWT
    
    const user = await UserModel.findOne({ email: userInfo.email });
    res.status(200).json({
      success: true,
      message: "User details",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
