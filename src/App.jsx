import { useState, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    dob: "",
    gender: "Male",
    occupation: "",
    company: "",
    bio: "",
    website: "",
    social: "",
    interests: "",
    newsletter: false,
  });

  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({ password: "", phone: "" });

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [formData]);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (name === "password" && !validatePassword(newValue)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number.",
      }));
    } else if (name === "password") {
      setErrors((prev) => ({ ...prev, password: "" }));
    }

    if (name === "phone" && !validatePhone(newValue)) {
      setErrors((prev) => ({
        ...prev,
        phone:
          "Phone number must be 10-15 digits and can optionally start with '+'.",
      }));
    } else if (name === "phone") {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.password || errors.phone) {
      alert("Please fix the errors before submitting the form.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        setFormData({
          username: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          country: "",
          dob: "",
          gender: "Male",
          occupation: "",
          company: "",
          bio: "",
          website: "",
          social: "",
          interests: "",
          newsletter: false,
        });
        fetchUsers();
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5 font-sans">
      <h1 className="text-center text-3xl text-gray-800 font-bold mb-4 mt-4">
        Registration Form
      </h1>
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg ">
        <div>
          <label className="font-bold mb-1 hidden">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Username"
            className="w-full p-2 mb-2 rounded border shadow-sm"
          />
        </div>
        <div>
          <label className="font-bold mb-1 hidden">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full p-2 mb-2 rounded border shadow-sm"
          />
        </div>
        <div>
          <label className="font-bold mb-1 hidden">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full p-2 mb-2 rounded border shadow-sm"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mb-2">{errors.password}</p>
          )}
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="font-bold mb-1 hidden">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="First Name"
              className="w-full p-2 mb-2 rounded border shadow-sm"
            />
          </div>
          <div className="flex-1">
            <label className="font-bold mb-1 hidden">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Last Name"
              className="w-full p-2 mb-2 rounded border shadow-sm"
            />
          </div>
        </div>
        <div>
          <label className="font-bold mb-1 hidden">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Phone"
            className="w-full p-2 mb-2 rounded border shadow-sm"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mb-2">{errors.phone}</p>
          )}
        </div>
        <div>
          <label className="font-bold mb-1 hidden">Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Address"
            className="w-full p-2 mb-2 rounded border shadow-sm"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="font-bold mb-1 hidden">City:</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 mb-2 rounded border shadow-sm"
            />
          </div>
          <div className="flex-1">
            <label className="font-bold mb-1 hidden">State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              placeholder="State"
              className="w-full p-2 mb-2 rounded border shadow-sm"
            />
          </div>
          <div className="flex-1">
            <label className="font-bold mb-1 hidden">ZIP Code:</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
              placeholder="ZIP Code"
              className="w-full p-2 mb-2 rounded border shadow-sm"
            />
          </div>
        </div>
        <div>
          <label className="font-bold mb-1 hidden">Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            placeholder="Country"
            className="w-full p-2 mb-2 rounded border shadow-sm"
          />
        </div>
        <div>
          <label className="font-bold mb-1 hidden ">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            placeholder="MM/DD/YYYY"
            onChange={handleChange}
            required
            className="w-full p-2 mb-2 rounded border shadow-sm placeholder-pink-60"
          />
        </div>
        <div className="mt-1 mb-3">
          <label className="font-semibold text-xl mb-1 block text-gray-600">
            Gender:
          </label>
          <div className="flex gap-4">
            <label className="flex items-center text-gray-500 hover:text-gray-700 text-lg">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                required
                className="mr-1"
              />{" "}
              Male
            </label>
            <label className="flex items-center text-gray-500 hover:text-gray-700 text-lg">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                required
                className="mr-1"
              />{" "}
              Female
            </label>
            <label className="flex items-center text-gray-500 hover:text-gray-700 text-lg">
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
                required
                className="mr-1"
              />{" "}
              Other
            </label>
          </div>
        </div>
        <div>
          <label className="font-bold mb-1 hidden">Occupation:</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
            placeholder="Occupation"
            className="w-full p-2 mb-2 rounded border shadow-sm"
          />
        </div>
        <div>
          <label className="font-bold mb-1 hidden">Company:</label>
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full p-2 mb-2 rounded border shadow-sm"
          />
        </div>
        <div>
          <label className="font-bold mb-1 hidden">Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
            placeholder="Bio"
            className="w-full p-2 mb-2 rounded border shadow-sm h-24 resize-none overflow-hidden"
          />
        </div>
        <div>
          <label className="font-bold mb-1 hidden">Website:</label>
          <input
            type="url"
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
            required
            className="w-full p-2 mb-2 rounded border shadow-sm"
          />
        </div>
        <div>
          <label className="font-bold mb-1 hidden">Social Media Link:</label>
          <input
            type="url"
            name="social"
            placeholder="Social Media Link"
            value={formData.social}
            onChange={handleChange}
            required
            className="w-full p-2 mb-2 rounded border shadow-sm"
          />
        </div>
        <div>
          <label className="font-bold mb-1 hidden">Interests:</label>
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder="Interests"
            required
            className="w-full p-2 mb-2 rounded border shadow-sm"
          />
        </div>
        <div className="mb-5">
          <label className="flex items-center text-gray-500 hover:text-gray-700 text-lg">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="mr-2"
              required
            />
            Subscribe to newsletter
          </label>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-lg w-full text-xl"
        >
          Register
        </button>
      </form>

      <hr className="my-8 border-t shadow-sm" />

      <h2 className="text-center text-2xl font-semibold mb-3 text-gray-800">
        Registered Users
      </h2>
      {users.length > 0 ? (
        users.map((user) => (
          <div
            key={user.id}
            className="border shadow-sm rounded-lg py-4 px-7 mb-5 bg-gray-100"
          >
            <h3 className="text-gray-700 font-semibold text-lg">
              User ID: <span className="text-gray-500">{user.id}</span>
            </h3>
            <p className="text-gray-700 font-semibold text-lg">
              Username: <span className="text-gray-500">{user.username}</span>
            </p>
            <p className="text-gray-700 font-semibold text-lg">
              Email: <span className="text-gray-500">{user.email}</span>
            </p>
            <p className="text-gray-700 font-semibold text-lg">
              First Name:{" "}
              <span className="text-gray-500">{user.firstname}</span>
            </p>
            <p className="text-gray-700 font-semibold text-lg">
              Last Name: <span className="text-gray-500">{user.lastname}</span>
            </p>
            <p className="text-gray-700 font-semibold text-lg">
              Phone: <span className="text-gray-500">{user.phone}</span>
            </p>
            <p className="text-gray-700 font-semibold text-lg">
              Address: <span className="text-gray-500">{user.address}</span>
            </p>
            <p className="text-gray-700 font-semibold text-lg">
              City: <span className="text-gray-500">{user.city}</span>
            </p>
            <p className="text-gray-700 font-semibold text-lg">
              State: <span className="text-gray-500">{user.state}</span>
            </p>
            <p className="text-gray-700 font-semibold text-lg">
              ZIP Code: <span className="text-gray-500">{user.zip}</span>
            </p>
            <p className="text-gray-700 font-semibold text-lg">
              Country: <span className="text-gray-500">{user.country}</span>
            </p>
            <p className="text-gray-700 font-semibold text-lg">
              Date of Birth: <span className="text-gray-500">{user.dob}</span>
            </p>
            <p className="text-gray-700 font-semibold text-lg">
              Gender: <span className="text-gray-500">{user.gender}</span>
            </p>
            <p className="text-gray-700 font-semibold text-lg">
              Occupation:{" "}
              <span className="text-gray-500">{user.occupation}</span>
            </p>
            <p className="text-gray-700 font-semibold text-lg">
              Company: <span className="text-gray-500">{user.company}</span>
            </p>
            <p className="text-gray-700 font-semibold text-lg">
              Bio: <span className="text-gray-500">{user.bio}</span>
            </p>
            <p className="text-gray-700 text-lg font-semibold">
              Website:{" "}
              <a
                href={user.website}
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {user.website}
              </a>
            </p>
            <p className="text-gray-700 text-lg font-semibold">
              Social Media:{" "}
              <a
                href={user.social}
                target="_blank"
                className="text-blue-500"
                rel="noopener noreferrer"
              >
                {user.social}
              </a>
            </p>
            <p className="text-gray-700 font-semibold text-lg">
              Interests: <span className="text-gray-500">{user.interests}</span>
            </p>
            <p className="text-gray-700 font-semibold text-lg">
              Subscribed to Newsletter:{" "}
              <span className="text-gray-500">
                {user.newsletter ? "Yes" : "No"}
              </span>
            </p>
          </div>
        ))
      ) : (
        <p className="text-center">No users found</p>
      )}
    </div>
  );
}

export default App;