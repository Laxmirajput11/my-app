import React, { useState } from "react";
import { Container, Form, Button, Table, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [institutionName, setInstitutionName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editInstitutionName, setEditInstitutionName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");

  // Student form states
  const [studentName, setStudentName] = useState("");
  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      institutionName,
      email,
      password,
    };
    setData([...data, newData]);
    setInstitutionName("");
    setEmail("");
    setPassword("");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditInstitutionName(data[index].institutionName);
    setEditEmail(data[index].email);
    setEditPassword(data[index].password);
    setShowEditModal(true);
  };

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  const handleSaveChanges = () => {
    const updatedData = data.map((item, index) =>
      index === editIndex
        ? {
            institutionName: editInstitutionName,
            email: editEmail,
            password: editPassword,
          }
        : item
    );
    setData(updatedData);
    setShowEditModal(false);
  };

  const handleAddStudent = () => {
    // Implement functionality to handle adding student details
    console.log({
      studentName,
      year,
      course,
      studentEmail,
    });
    setShowStudentModal(false);
  };

  return (
    <Container className="app-container">
      <h1 className="text-center mb-4">Institution Management System</h1>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="formInstitutionName" className="form-group">
          <Form.Label>Institution Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter institution name"
            value={institutionName}
            onChange={(e) => setInstitutionName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="form-group">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="form-group">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
      {data.length > 0 && (
        <Table striped bordered hover className="custom-table">
  <thead>
    <tr>
      <th>Institution Name</th>
      <th>Email</th>
      <th>Password</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item, index) => (
      <tr key={index}>
        <td>{item.institutionName}</td>
        <td>{item.email}</td>
        <td>{item.password}</td>
        <td>
          <Button
            variant="warning"
            className="btn-edit me-2"
            onClick={() => handleEdit(index)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="btn-delete me-2"
            onClick={() => handleDelete(index)}
          >
            Delete
          </Button>
          <Button
            variant="info"
            className="btn-student"
            onClick={() => setShowStudentModal(true)}
          >
            Students
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>
      )}
      {/* Edit Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="editInstitutionName">
            <Form.Label>Institution Name</Form.Label>
            <Form.Control
              type="text"
              value={editInstitutionName}
              onChange={(e) => setEditInstitutionName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="editEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="editPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Student Modal */}
      <Modal
        show={showStudentModal}
        onHide={() => setShowStudentModal(false)}
        size="lg"
        className="student-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="studentName">
              <Form.Label className="form-label">Student Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter student name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="year">
              <Form.Label className="form-label">Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="course">
              <Form.Label className="form-label">Course</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="studentEmail">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn-cancel"
            onClick={() => setShowStudentModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddStudent}>
            Add Student
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <Modal
        show={showStudentModal}
        onHide={() => setShowStudentModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="studentName" className="student-form-group">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter student name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="student-form-control"
              />
            </Form.Group>
            <Form.Group controlId="year" className="student-form-group">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="student-form-control"
              />
            </Form.Group>
            <Form.Group controlId="course" className="student-form-group">
              <Form.Label>Course</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="student-form-control"
              />
            </Form.Group>
            <Form.Group controlId="studentEmail" className="student-form-group">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                className="student-form-control"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn-close"
            onClick={() => setShowStudentModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleAddStudent}>
            Add Student
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Container>
  );
};

export default App;
