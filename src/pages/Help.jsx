// Simple help page explaining how to use the app
export default function Help() {
  return (
    <div className="content-page">
      <div className="content-shell">
        <div className="content-panel content-panel-medium help-panel">
          <div className="page-header">
            <p className="page-kicker">Support</p>
            <h1 className="page-title">Help</h1>
            <p className="page-text">
              A quick guide to using the Timeline app.
            </p>
          </div>

          <h4>How to use the app</h4>
          <p>
            Use the navigation bar to move between Dashboard, Add Event, Login,
            Register, and Help pages.
          </p>

          <h4>Create an account</h4>
          <p>
            Go to Register and enter your details. All fields are required.
          </p>

          <h4>Log in</h4>
          <p>
            Enter your email or username and password to access your events.
          </p>

          <h4>Add an event</h4>
          <p>
            Go to Add Event, fill in the details, and submit to save it to your dashboard.
          </p>

          <h4>Edit or delete an event</h4>
          <p>
            Use the buttons on each event card to update or remove it.
          </p>

          <h4>Tips</h4>
          <p>
            Keep event names clear and include useful details so you can quickly understand your schedule.
          </p>
        </div>
      </div>
    </div>
  );
}