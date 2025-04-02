const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Admin = require("../models/AdminModel");
const generateToken = require("../config/generateToken");

// Function to generate a unique adminID
const generateAdminID = async () => {
  let newID;
  let existingAdmin;
  do {
    newID = `ADM${Math.floor(Math.random() * 10000)}`;
    existingAdmin = await Admin.findOne({ adminID: newID });
  } while (existingAdmin);
  return newID;
};

// Helper function to format the admin data
const formatAdminData = (admin) => {
  return {
    adminID: admin.adminID,
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
    role: admin.role,
    department: admin.department,
    designation: admin.designation,
    dob: admin.dob,
    photo: admin.photo,
    createdAt: admin.createdAt,
    gender: admin.gender,
  };
};

//----------------------------------------------------------------------------------------------------
// Controller for creating a new admin
exports.createAdmin = async (req, res, next) => {
  const loggedInAdmin = req.admin; // Access logged-in admin's data
  console.log("Logged-in Admin:", loggedInAdmin, loggedInAdmin.name); // Add this line to log the admin data
  if (!loggedInAdmin) {
    return res.status(400).json({ message: "Logged-in admin not found" });
  }

  const {
    name,
    email,
    phone,
    designation,
    address,
    dob,
    gender,
    department,
    religion,
    category,
    bloodgroup,
    role,
    emergencyContact,
    joiningDate,
    experience,
    permissions,
    highestQualification,
    certifications,
    AADHARnumber,
    salary,
    bankDetails,
  } = req.body;
  const photo = req.file ? req.file.filename : null;

  // Use express-validator to check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if an admin already exists with the same email
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }

    // Generate a unique adminID
    const adminID = await generateAdminID();

    // Set a default password and hash it
    const defaultPassword = "admin123";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Create the new admin record
    const newAdmin = await Admin.create({
      name,
      email,
      phone,
      designation,
      address,
      dob,
      gender,
      department,
      religion,
      category,
      bloodgroup,
      role: role || "admin", // Default to 'admin' if no role provided
      adminID,
      password: hashedPassword,
      photo,
      emergencyContact: emergencyContact
        ? {
            name: emergencyContact.name || "",
            relation: emergencyContact.relation || "",
            phone: emergencyContact.phone || "",
          }
        : undefined,
      joiningDate: joiningDate ? new Date(joiningDate) : undefined,
      experience: experience || 0,
      permissions: permissions || [],
      highestQualification: highestQualification || "",
      certifications: certifications || [],
      AADHARnumber: AADHARnumber || "",
      salary: salary || 0,
      bankDetails: bankDetails
        ? {
            accountNumber: bankDetails.accountNumber || "",
            bankName: bankDetails.bankName || "",
            ifscCode: bankDetails.ifscCode || "",
          }
        : undefined,
      registeredBy: {
        adminID: loggedInAdmin.adminID, // Logged-in admin's ID
        name: loggedInAdmin.name, // Logged-in admin's name
      },
    });

    // Generate a JWT token for the newly created admin
    const token = generateToken(newAdmin._id, "admin");

    // Send the response back with the created admin's details
    res.status(201).json({
      message: "Admin created successfully",
      token,
      data: formatAdminData(newAdmin),
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    next(error); // Use a global error handler middleware
  }
};

//-----------------------------------------------------------------------------------------------
// Controller for logging in an admin
exports.loginAdmin = async (req, res) => {
  const { adminID, password } = req.body;

  try {
    // Find the admin by adminID
    const admin = await Admin.findOne({ adminID });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate a JWT token using the admin._id
    const token = generateToken(admin._id, admin.role);
    // Respond with success, including the token and all the admin data
    res.status(200).json({
      message: "Login successful",
      token,
      data: formatAdminData(admin),
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
