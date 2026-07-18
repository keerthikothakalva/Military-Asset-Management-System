function NotFound() {
  return (
    <div className="page-container not-found-page">
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        The page you are looking for does not exist.
      </p>

      <a href="/dashboard" className="primary-button">
        Go to Dashboard
      </a>
    </div>
  );
}

export default NotFound;