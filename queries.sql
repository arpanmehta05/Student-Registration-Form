CREATE DATABASE bee;

\c bee;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    phone VARCHAR(15),
    address VARCHAR(255),
    city VARCHAR(50),
    state VARCHAR(50),
    zip VARCHAR(20),
    country VARCHAR(50),
    dob DATE,
    gender VARCHAR(10),
    occupation VARCHAR(50),
    company VARCHAR(100),
    bio TEXT,
    website VARCHAR(100),
    social VARCHAR(255),
    interests TEXT,
    newsletter BOOLEAN
);
