// DEPENDENCIES
const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");

const Patient = require("../models/patient");
const STRINGS = require("../utils/constants");

// DATA
const first_name = "John";
const last_name = "Doe";
const full_name = `${first_name} ${last_name}`;

const app = express();

// MIDDLEWARE
app.use(express.json());

// API
const apiRoutes = require("../routes/index.js");

app.use("/api", apiRoutes);

// Mock the database connection
beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${STRINGS.EHR_DB}`;
  await mongoose.connect(url, {});
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("Patient API", () => {
  let patientId;

  it(`should create new patient ${full_name}`, async () => {
    const res = await request(app).post("/api/patients").send({
      name: full_name,
      age: 30,
      DOB: "9/22/1998",
      address: "123 Main St",
      phone: "555-555-5555",
      email: "john.doe@example.com",
      medicalHistory: "No known allergies",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    patientId = res.body._id;
  });

  it("should get all patients", async () => {
    const res = await request(app).get("/api/patients");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should get a single patient by ID", async () => {
    const res = await request(app).get(`/api/patients/${patientId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", patientId);
  });

  it("should update (change name) a patient by ID", async () => {
    const res = await request(app).put(`/api/patients/${patientId}`).send({
      name: "Jane Doe",
      age: 31,
      address: "456 Main St",
      phone: "555-555-5556",
      email: "jane.doe@example.com",
      medicalHistory: "No known allergies",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Jane Doe");
  });

  it("should delete a patient by ID", async () => {
    const res = await request(app).delete(`/api/patients/${patientId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Patient deleted");
  });
});
