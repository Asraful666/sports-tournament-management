import { useState } from "react";

function Matches() {
  const tournaments = [
    { id: 1, name: "SIU Football Championship 2026" },
    { id: 2, name: "Inter Department Cricket Cup" },
    { id: 3, name: "University Basketball League" },
  ];

  const teams = [
    { id: 1, name: "CSE Warriors" },
    { id: 2, name: "EEE Titans" },
    { id: 3, name: "BBA Strikers" },
    { id: 4, name: "Civil United" },
  ];

  const venues = [
    { id: 1, name: "SIU Main Ground" },
    { id: 2, name: "University Indoor Hall" },
    { id: 3, name: "City Sports Complex" },
  ];

  const referees = [
    { id: 1, name: "Abdul Karim" },
    { id: 2, name: "Rahim Ahmed" },
    { id: 3, name: "Sakib Hasan" },
  ];

  const [matches, setMatches] = useState([
    {
      id: 1,
      tournamentId: 1,
      homeTeamId: 1,
      awayTeamId: 2,
      venueId: 1,
      refereeId: 1,
      matchDate: "2026-09-20",
      matchTime: "04:00 PM",
      round: "Group Stage",
      createdAt: "2026-08-20",
    },
    {
      id: 2,
      tournamentId: 1,
      homeTeamId: 3,
      awayTeamId: 4,
      venueId: 3,
      refereeId: 2,
      matchDate: "2026-09-22",
      matchTime: "03:30 PM",
      round: "Group Stage",
      createdAt: "2026-08-21",
    },
    {
      id: 3,
      tournamentId: 2,
      homeTeamId: 1,
      awayTeamId: 3,
      venueId: 2,
      refereeId: 3,
      matchDate: "2026-09-25",
      matchTime: "05:00 PM",
      round: "Semi Final",
      createdAt: "2026-08-22",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [tournamentFilter, setTournamentFilter] =
    useState("all");
  const [roundFilter, setRoundFilter] =
    useState("all");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingMatch, setEditingMatch] =
    useState(null);

  const [formData, setFormData] = useState({
    tournamentId: "",
    homeTeamId: "",
    awayTeamId: "",
    venueId: "",
    refereeId: "",
    matchDate: "",
    matchTime: "",
    round: "",
  });

  const getTournamentName = (id) => {
    const tournament = tournaments.find(
      (item) => item.id === Number(id)
    );

    return tournament
      ? tournament.name
      : "Unknown Tournament";
  };

  const getTeamName = (id) => {
    const team = teams.find(
      (item) => item.id === Number(id)
    );

    return team ? team.name : "Unknown Team";
  };

  const getVenueName = (id) => {
    const venue = venues.find(
      (item) => item.id === Number(id)
    );

    return venue ? venue.name : "Unknown Venue";
  };

  const getRefereeName = (id) => {
    const referee = referees.find(
      (item) => item.id === Number(id)
    );

    return referee
      ? referee.name
      : "Unknown Referee";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditingMatch(null);

    setFormData({
      tournamentId: "",
      homeTeamId: "",
      awayTeamId: "",
      venueId: "",
      refereeId: "",
      matchDate: "",
      matchTime: "",
      round: "",
    });

    setIsModalOpen(true);
  };

  const openEditModal = (match) => {
    setEditingMatch(match);

    setFormData({
      tournamentId: match.tournamentId,
      homeTeamId: match.homeTeamId,
      awayTeamId: match.awayTeamId,
      venueId: match.venueId,
      refereeId: match.refereeId,
      matchDate: match.matchDate,
      matchTime: match.matchTime,
      round: match.round,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMatch(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.tournamentId ||
      !formData.homeTeamId ||
      !formData.awayTeamId ||
      !formData.venueId ||
      !formData.refereeId ||
      !formData.matchDate ||
      !formData.matchTime ||
      !formData.round
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (
      Number(formData.homeTeamId) ===
      Number(formData.awayTeamId)
    ) {
      alert(
        "Home team and away team cannot be the same."
      );
      return;
    }

    if (editingMatch) {
      setMatches((previous) =>
        previous.map((match) =>
          match.id === editingMatch.id
            ? {
                ...match,
                tournamentId: Number(
                  formData.tournamentId
                ),
                homeTeamId: Number(
                  formData.homeTeamId
                ),
                awayTeamId: Number(
                  formData.awayTeamId
                ),
                venueId: Number(
                  formData.venueId
                ),
                refereeId: Number(
                  formData.refereeId
                ),
                matchDate:
                  formData.matchDate,
                matchTime:
                  formData.matchTime,
                round: formData.round,
              }
            : match
        )
      );

      alert("Fixture updated successfully!");
    } else {
      const newMatch = {
        id: Date.now(),
        tournamentId: Number(
          formData.tournamentId
        ),
        homeTeamId: Number(
          formData.homeTeamId
        ),
        awayTeamId: Number(
          formData.awayTeamId
        ),
        venueId: Number(formData.venueId),
        refereeId: Number(
          formData.refereeId
        ),
        matchDate: formData.matchDate,
        matchTime: formData.matchTime,
        round: formData.round,
        createdAt: new Date()
          .toISOString()
          .split("T")[0],
      };

      setMatches((previous) => [
        ...previous,
        newMatch,
      ]);

      alert("Fixture created successfully!");
    }

    closeModal();
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this fixture?"
    );

    if (!confirmed) return;

    setMatches((previous) =>
      previous.filter(
        (match) => match.id !== id
      )
    );
  };

  const filteredMatches = matches.filter(
    (match) => {
      const search = searchTerm
        .toLowerCase()
        .trim();

      const homeTeam = getTeamName(
        match.homeTeamId
      ).toLowerCase();

      const awayTeam = getTeamName(
        match.awayTeamId
      ).toLowerCase();

      const venue = getVenueName(
        match.venueId
      ).toLowerCase();

      const matchesSearch =
        homeTeam.includes(search) ||
        awayTeam.includes(search) ||
        venue.includes(search);

      const matchesTournament =
        tournamentFilter === "all" ||
        match.tournamentId ===
          Number(tournamentFilter);

      const matchesRound =
        roundFilter === "all" ||
        match.round === roundFilter;

      return (
        matchesSearch &&
        matchesTournament &&
        matchesRound
      );
    }
  );

  const totalMatches = matches.length;

  const groupStageMatches = matches.filter(
    (match) => match.round === "Group Stage"
  ).length;

  const knockoutMatches = matches.filter(
    (match) =>
      match.round === "Semi Final" ||
      match.round === "Final"
  ).length;

  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">

        <div>
          <h1>Match / Fixture Management</h1>

          <p>
            Create and manage tournament
            fixtures.
          </p>
        </div>

        {/* ONLY ONE CREATE FIXTURE BUTTON */}
        <button
          className="primary-btn"
          onClick={openAddModal}
        >
          + Create Fixture
        </button>

      </div>

      {/* SUMMARY */}
      <div className="summary-grid">

        <div className="summary-card">
          <div className="summary-icon">
            🏟️
          </div>

          <div>
            <h3>{totalMatches}</h3>
            <p>Total Matches</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            📋
          </div>

          <div>
            <h3>{groupStageMatches}</h3>
            <p>Group Stage</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            🏆
          </div>

          <div>
            <h3>{knockoutMatches}</h3>
            <p>Knockout Matches</p>
          </div>
        </div>

      </div>

      {/* SEARCH + FILTERS */}
      <div className="toolbar">

        <input
          type="text"
          className="search-input"
          placeholder="Search team or venue..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <select
          value={tournamentFilter}
          onChange={(e) =>
            setTournamentFilter(
              e.target.value
            )
          }
          style={{
            padding: "12px 15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "15px",
            background: "white",
            outline: "none",
          }}
        >
          <option value="all">
            All Tournaments
          </option>

          {tournaments.map((tournament) => (
            <option
              key={tournament.id}
              value={tournament.id}
            >
              {tournament.name}
            </option>
          ))}
        </select>

        <select
          value={roundFilter}
          onChange={(e) =>
            setRoundFilter(e.target.value)
          }
          style={{
            padding: "12px 15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "15px",
            background: "white",
            outline: "none",
          }}
        >
          <option value="all">
            All Rounds
          </option>

          <option value="Group Stage">
            Group Stage
          </option>

          <option value="Quarter Final">
            Quarter Final
          </option>

          <option value="Semi Final">
            Semi Final
          </option>

          <option value="Final">
            Final
          </option>
        </select>

      </div>

      {/* MATCH TABLE */}
      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>#</th>
              <th>Tournament</th>
              <th>Match</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Time</th>
              <th>Round</th>
              <th>Referee</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredMatches.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="empty-message"
                >
                  No matches found.
                </td>
              </tr>
            ) : (
              filteredMatches.map(
                (match, index) => (
                  <tr key={match.id}>

                    <td>{index + 1}</td>

                    <td>
                      {getTournamentName(
                        match.tournamentId
                      )}
                    </td>

                    <td>
                      <strong>
                        {getTeamName(
                          match.homeTeamId
                        )}
                      </strong>

                      <span> vs </span>

                      <strong>
                        {getTeamName(
                          match.awayTeamId
                        )}
                      </strong>
                    </td>

                    <td>
                      {getVenueName(
                        match.venueId
                      )}
                    </td>

                    <td>
                      {match.matchDate}
                    </td>

                    <td>
                      {match.matchTime}
                    </td>

                    <td>
                      {match.round}
                    </td>

                    <td>
                      {getRefereeName(
                        match.refereeId
                      )}
                    </td>

                    <td>
                      <div className="action-buttons">

                        <button
                          className="edit-btn"
                          onClick={() =>
                            openEditModal(
                              match
                            )
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              match.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                )
              )
            )}

          </tbody>

        </table>

      </div>

      {/* ADD / EDIT FIXTURE MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">

          <div className="modal match-modal">

            <div className="modal-header">

              <div>
                <h2>
                  {editingMatch
                    ? "Edit Fixture"
                    : "Create Fixture"}
                </h2>

                <p>
                  {editingMatch
                    ? "Update fixture information."
                    : "Create a new tournament fixture."}
                </p>
              </div>

              <button
                className="close-btn"
                onClick={closeModal}
              >
                ×
              </button>

            </div>

            <form
              className="match-form"
              onSubmit={handleSubmit}
            >

              <div className="form-group">

                <label>Tournament</label>

                <select
                  name="tournamentId"
                  value={
                    formData.tournamentId
                  }
                  onChange={handleChange}
                >
                  <option value="">
                    Select Tournament
                  </option>

                  {tournaments.map(
                    (tournament) => (
                      <option
                        key={tournament.id}
                        value={tournament.id}
                      >
                        {tournament.name}
                      </option>
                    )
                  )}

                </select>

              </div>

              <div className="form-group">

                <label>Home Team</label>

                <select
                  name="homeTeamId"
                  value={
                    formData.homeTeamId
                  }
                  onChange={handleChange}
                >
                  <option value="">
                    Select Home Team
                  </option>

                  {teams.map((team) => (
                    <option
                      key={team.id}
                      value={team.id}
                    >
                      {team.name}
                    </option>
                  ))}

                </select>

              </div>

              <div className="form-group">

                <label>Away Team</label>

                <select
                  name="awayTeamId"
                  value={
                    formData.awayTeamId
                  }
                  onChange={handleChange}
                >
                  <option value="">
                    Select Away Team
                  </option>

                  {teams.map((team) => (
                    <option
                      key={team.id}
                      value={team.id}
                    >
                      {team.name}
                    </option>
                  ))}

                </select>

              </div>

              <div className="form-group">

                <label>Venue</label>

                <select
                  name="venueId"
                  value={formData.venueId}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Venue
                  </option>

                  {venues.map((venue) => (
                    <option
                      key={venue.id}
                      value={venue.id}
                    >
                      {venue.name}
                    </option>
                  ))}

                </select>

              </div>

              <div className="form-group">

                <label>Referee</label>

                <select
                  name="refereeId"
                  value={
                    formData.refereeId
                  }
                  onChange={handleChange}
                >
                  <option value="">
                    Select Referee
                  </option>

                  {referees.map(
                    (referee) => (
                      <option
                        key={referee.id}
                        value={referee.id}
                      >
                        {referee.name}
                      </option>
                    )
                  )}

                </select>

              </div>

              <div className="form-group">

                <label>Match Date</label>

                <input
                  type="date"
                  name="matchDate"
                  value={
                    formData.matchDate
                  }
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>Match Time</label>

                <input
                  type="text"
                  name="matchTime"
                  placeholder="Example: 04:00 PM"
                  value={
                    formData.matchTime
                  }
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label>Round</label>

                <select
                  name="round"
                  value={formData.round}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Round
                  </option>

                  <option value="Group Stage">
                    Group Stage
                  </option>

                  <option value="Quarter Final">
                    Quarter Final
                  </option>

                  <option value="Semi Final">
                    Semi Final
                  </option>

                  <option value="Final">
                    Final
                  </option>

                </select>

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-btn"
                >
                  {editingMatch
                    ? "Update Fixture"
                    : "Create Fixture"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Matches;