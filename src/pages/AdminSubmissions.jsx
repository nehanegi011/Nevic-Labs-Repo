import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export default function AdminSubmissions() {
  const [session, setSession] = useState(undefined); // undefined = still checking, null = signed out
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');

  // Track auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // Load submissions once logged in
  useEffect(() => {
    if (!session) return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setLoadError('');
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (cancelled) return;
      if (error) setLoadError(error.message);
      else setSubmissions(data);
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [session]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError('Incorrect email or password.');
    setLoggingIn(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSubmissions([]);
  };

  // Still checking for an existing session on first load
  if (session === undefined) {
    return <div className="wrap section">Loading…</div>;
  }

  // Not logged in — show login form
  if (!session) {
    return (
      <div className="wrap section" style={{ maxWidth: 420 }}>
        <h2 style={{ marginBottom: 24 }}>Admin sign in</h2>
        <form onSubmit={handleLogin} style={{ display: 'grid', gap: 14 }}>
          <div>
            <label htmlFor="admin-email">Email</label>
            <input id="admin-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="admin-password">Password</label>
            <input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {loginError && <p style={{ color: '#B3261E', fontSize: 14 }}>{loginError}</p>}
          <button type="submit" className="btn btn-primary" disabled={loggingIn}>
            {loggingIn ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    );
  }

  // Logged in — show submissions
  return (
    <div className="wrap section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h2>Submissions</h2>
        <button className="btn btn-ghost" onClick={handleLogout}>Sign out</button>
      </div>

      {loading && <p>Loading submissions…</p>}
      {loadError && <p style={{ color: '#B3261E' }}>{loadError}</p>}

      {!loading && !loadError && submissions.length === 0 && (
        <p>No submissions yet.</p>
      )}

      {!loading && submissions.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--line)' }}>
                <th style={{ padding: '10px 8px' }}>Date</th>
                <th style={{ padding: '10px 8px' }}>Name</th>
                <th style={{ padding: '10px 8px' }}>Email</th>
                <th style={{ padding: '10px 8px' }}>Phone</th>
                <th style={{ padding: '10px 8px' }}>Clinic</th>
                <th style={{ padding: '10px 8px' }}>Role</th>
                <th style={{ padding: '10px 8px' }}>Message</th>
                <th style={{ padding: '10px 8px' }}>Attachment</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>
                    {new Date(row.created_at).toLocaleString()}
                  </td>
                  <td style={{ padding: '10px 8px' }}>{row.name}</td>
                  <td style={{ padding: '10px 8px' }}>{row.email}</td>
                  <td style={{ padding: '10px 8px' }}>{row.phone}</td>
                  <td style={{ padding: '10px 8px' }}>{row.clinic_name}</td>
                  <td style={{ padding: '10px 8px' }}>{row.role}</td>
                  <td style={{ padding: '10px 8px', maxWidth: 260 }}>{row.message}</td>
                  <td style={{ padding: '10px 8px' }}>
                    {row.attachment_url ? (
                      <a href={row.attachment_url} target="_blank" rel="noopener noreferrer">View PDF</a>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
