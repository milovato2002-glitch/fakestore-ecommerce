import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { db, auth } from '../firebase/config';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { clearUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

export default function ProfilePage() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: '', address: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const docSnap = await getDoc(doc(db, 'users', user.uid));
      if (docSnap.exists()) setProfile(docSnap.data());
    };
    fetchProfile();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'users', user.uid), {
      name: profile.name,
      address: profile.address,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return;
    await deleteDoc(doc(db, 'users', user.uid));
    await deleteUser(auth.currentUser);
    dispatch(clearUser());
    navigate('/');
  };

  if (!user) return <div className="profile-page"><p>Please <a href="/login">login</a> to view your profile.</p></div>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>My Profile</h1>
        <form onSubmit={handleUpdate}>
          <label>Name</label>
          <input type="text" value={profile.name || ''} onChange={e => setProfile({ ...profile, name: e.target.value })} />
          <label>Email</label>
          <input type="email" value={user.email} disabled />
          <label>Address</label>
          <input type="text" value={profile.address || ''} onChange={e => setProfile({ ...profile, address: e.target.value })} placeholder="Your shipping address" />
          <button type="submit">Save Changes</button>
          {saved && <p className="saved-msg">Profile updated!</p>}
        </form>
        <button className="delete-btn" onClick={handleDeleteAccount}>Delete My Account</button>
      </div>
    </div>
  );
}
