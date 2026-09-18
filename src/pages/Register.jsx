function Register() {
  return (
    <div>
      <h1>Create Account</h1>

      <form>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <select>
          <option>General Viewer</option>
          <option>Team Manager</option>
          <option>Tournament Organizer</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;